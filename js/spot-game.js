class SpotGame {
  constructor(canvas, badgeEl, winOverlayEl) {
    this.canvas     = canvas;
    this.ctx        = canvas.getContext('2d');
    this.badge      = badgeEl;
    this.winOverlay = winOverlayEl;
    this.overlayEmoji = winOverlayEl.querySelector('.overlay-emoji');
    this.overlayMsg   = winOverlayEl.querySelector('.overlay-msg');
    this.replayBtn    = winOverlayEl.querySelector('.spot-replay-btn');

    this.emojis      = [];
    this.particles   = [];
    this.target      = '';
    this.targetTotal = 0;
    this.found       = 0;
    this.round       = 0;
    this.active      = false;
    this.locked      = false;
    this.raf         = null;
    this._tick       = 0;

    this._resize = () => this._onResize();
    this._touch  = (e) => { e.preventDefault(); this._onTouch(e); };
    this._click  = (e) => this._onClick(e);
    this._replay = () => this._nextRound();
  }

  /* ── lifecycle ──────────────────────────────────────────────────────────── */

  start() {
    this.round = 0;
    this._onResize();
    window.addEventListener('resize', this._resize);
    this.canvas.addEventListener('touchstart', this._touch, { passive: false });
    this.canvas.addEventListener('click', this._click);
    this.replayBtn.removeEventListener('click', this._replay);
    this.replayBtn.addEventListener('click', this._replay);

    this._nextRound();
    this.active = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    this._loop();
  }

  stop() {
    this.active = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this._resize);
    this.canvas.removeEventListener('touchstart', this._touch);
    this.canvas.removeEventListener('click', this._click);
    this.replayBtn.removeEventListener('click', this._replay);
    this.emojis    = [];
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._hideOverlay();
  }

  /* ── round setup ────────────────────────────────────────────────────────── */

  _nextRound() {
    this._hideOverlay();
    this.round++;
    this.found     = 0;
    this.locked    = false;
    this.particles = [];
    this._setupRound();
  }

  _setupRound() {
    const pool = shuffle([...EMOJIS]);
    this.target      = pool[0];
    this.targetTotal = Math.min(2 + Math.floor((this.round + 1) / 2), 5);

    const distractorCount = this.targetTotal + 2 + Math.min(this.round - 1, 5);
    const distractors     = pool.slice(1, 1 + Math.min(distractorCount, 13));

    const all = [
      ...Array(this.targetTotal).fill(null).map(() => ({ emoji: this.target, isTarget: true })),
      ...distractors.map(e => ({ emoji: e, isTarget: false })),
    ];
    shuffle(all);

    this.emojis = all.map(item => ({
      emoji:    item.emoji,
      isTarget: item.isTarget,
      x: 0, y: 0,
      vx:     (Math.random() - 0.5) * 1.15,
      vy:     (Math.random() - 0.5) * 1.15,
      found:  false,
      wobble: Math.random() * Math.PI * 2,
    }));

    this._placeEmojis();
    this._updateBadge();
  }

  _emojiSize() {
    return Math.min(this.canvas.width, this.canvas.height) * 0.115;
  }

  _emojiZoneTop() {
    return Math.min(this.canvas.height * 0.29, 200);
  }

  _placeEmojis() {
    const W   = this.canvas.width, H = this.canvas.height;
    const sz  = this._emojiSize();
    const top = this._emojiZoneTop() + sz * 0.6;
    const pad = sz * 0.55;
    const placed = [];

    for (const e of this.emojis) {
      let attempts = 0, x, y;
      do {
        x = pad + Math.random() * (W - 2 * pad);
        y = top + Math.random() * (H - top - pad);
        attempts++;
      } while (attempts < 80 && placed.some(p => Math.hypot(p.x - x, p.y - y) < sz * 1.85));
      e.x = x;
      e.y = y;
      placed.push({ x, y });
    }
  }

  /* ── game loop ──────────────────────────────────────────────────────────── */

  _loop() {
    if (!this.active) return;
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    this._tick++;
    const W   = this.canvas.width, H = this.canvas.height;
    const sz  = this._emojiSize();
    const top = this._emojiZoneTop();

    for (const e of this.emojis) {
      e.wobble += e.found ? 0.06 : 0.018;
      if (e.found) continue;
      e.x += e.vx;
      e.y += e.vy;
      if (e.x < sz / 2)       { e.x = sz / 2;       e.vx =  Math.abs(e.vx); }
      if (e.x > W - sz / 2)   { e.x = W - sz / 2;   e.vx = -Math.abs(e.vx); }
      if (e.y < top + sz / 2) { e.y = top + sz / 2; e.vy =  Math.abs(e.vy); }
      if (e.y > H - sz / 2)   { e.y = H - sz / 2;   e.vy = -Math.abs(e.vy); }
    }

    let alive = 0;
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].life > 0) this.particles[alive++] = this.particles[i];
    }
    this.particles.length = alive;
  }

  /* ── drawing ────────────────────────────────────────────────────────────── */

  _draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawTargetZone(ctx);
    for (const e of this.emojis) this._drawEmoji(ctx, e);
    for (const p of this.particles) p.draw(ctx);
  }

  _drawTargetZone(ctx) {
    const W    = this.canvas.width;
    const top  = 70;
    const bot  = this._emojiZoneTop();
    const cy   = top + (bot - top) / 2;
    const maxR = Math.min((bot - top) / 2 - 6, 52);

    // Outer soft glow
    const glow = ctx.createRadialGradient(W / 2, cy, maxR * 0.4, W / 2, cy, maxR + 14);
    glow.addColorStop(0, 'rgba(255,255,255,0)');
    glow.addColorStop(1, 'rgba(240,70,70,0.18)');
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, cy, maxR + 14, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    ctx.restore();

    // Bullseye rings (outer → inner)
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.18)';
    ctx.shadowBlur  = 10;
    for (const [r, fill] of [
      [maxR,        'rgba(205,35,35,0.78)'],
      [maxR * 0.66, 'rgba(255,255,255,0.92)'],
      [maxR * 0.37, 'rgba(205,35,35,0.80)'],
    ]) {
      ctx.beginPath();
      ctx.arc(W / 2, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.restore();

    // Pulsing emoji at centre
    const pulse = 1 + Math.sin(this._tick * 0.065) * 0.11;
    const eSize = Math.round(maxR * 0.82 * pulse);
    ctx.save();
    ctx.font         = `${eSize}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.target, W / 2, cy + eSize * 0.04);
    ctx.restore();
  }

  _drawEmoji(ctx, e) {
    const sz = this._emojiSize();
    const r  = sz * 0.61;

    ctx.save();
    ctx.translate(e.x, e.y);

    if (e.found) {
      const sc = 1 + Math.sin(e.wobble * 3) * 0.04;
      ctx.scale(sc, sc);
      ctx.globalAlpha = 0.48;
    }

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = e.found ? 'rgba(100,220,100,0.28)' : 'rgba(255,255,255,0.55)';
    ctx.fill();

    if (e.found) {
      ctx.strokeStyle = 'rgba(50,200,50,0.55)';
      ctx.lineWidth   = 3;
      ctx.stroke();
    }

    ctx.font         = `${Math.round(sz * 0.86)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(e.emoji, 0, sz * 0.04);
    ctx.restore();
  }

  /* ── hit testing ────────────────────────────────────────────────────────── */

  _onTap(px, py) {
    if (this.locked) return;
    const sz = this._emojiSize();

    for (const e of this.emojis) {
      if (e.found) continue;
      if (Math.hypot(px - e.x, py - e.y) <= sz * 0.72) {
        if (e.isTarget) {
          e.found = true;
          this.found++;
          this.particles.push(...spawnBurst(e.x, e.y, 16, 0.7));
          Sounds.sparkle();
          this._updateBadge();

          if (this.found === this.targetTotal) {
            this.locked = true;
            setTimeout(() => this._win(), 650);
          }
        } else {
          Sounds.softPop();
          e.vx = (Math.random() - 0.5) * 4;
          e.vy = (Math.random() - 0.5) * 4;
        }
        break;
      }
    }
  }

  _onTouch(e) {
    const r = this.canvas.getBoundingClientRect();
    const t = e.changedTouches[0];
    this._onTap(t.clientX - r.left, t.clientY - r.top);
  }

  _onClick(e) {
    const r = this.canvas.getBoundingClientRect();
    this._onTap(e.clientX - r.left, e.clientY - r.top);
  }

  /* ── win ────────────────────────────────────────────────────────────────── */

  _win() {
    Sounds.fanfare();
    const cx = this.canvas.width / 2, cy = this.canvas.height / 2;
    for (let i = 0; i < 4; i++) {
      this.particles.push(...spawnBurst(
        cx + (Math.random() - 0.5) * this.canvas.width  * 0.6,
        cy + (Math.random() - 0.5) * this.canvas.height * 0.4,
        20,
      ));
    }
    this._showOverlay();
  }

  _showOverlay() {
    const WIN_EMOJIS = ['🔍', '👀', '🎯', '🏅'];
    const WIN_KEYS   = ['spot.win.0', 'spot.win.1', 'spot.win.2', 'spot.win.3'];
    const idx = Math.floor(Math.random() * WIN_KEYS.length);
    this.overlayEmoji.textContent = WIN_EMOJIS[idx];
    this.overlayMsg.textContent   = t(WIN_KEYS[idx]);

    const inner = this.winOverlay.querySelector('.overlay-inner');
    inner.style.transition = 'none';
    inner.style.transform  = 'scale(0)';
    inner.style.opacity    = '0';
    this.winOverlay.classList.add('visible');
    requestAnimationFrame(() => {
      inner.style.transition = '';
      requestAnimationFrame(() => {
        inner.style.transform = '';
        inner.style.opacity   = '';
      });
    });
  }

  _hideOverlay() {
    this.winOverlay.classList.remove('visible');
  }

  _updateBadge() {
    this.badge.textContent = this.found === 0
      ? t('spot.find_all')
      : t('spot.found', this.found, this.targetTotal);
  }

  _onResize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (this.emojis.length) this._placeEmojis();
  }
}
