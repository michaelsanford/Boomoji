const CELEBRATE_MSGS = ['Amazing!', 'Woohoo!', 'Brilliant!', 'Superstar!', 'Incredible!', 'You Rock!'];
const CELEBRATE_EMOJI = ['🎉', '🌟', '🏆', '🎊', '💫', '⭐'];

class PopGame {
  constructor(canvas, roundBadgeEl, overlayEl) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.badge  = roundBadgeEl;
    this.overlay = overlayEl;
    this.overlayInner = overlayEl.querySelector('#overlay-inner');
    this.overlayEmoji = overlayEl.querySelector('#overlay-emoji');
    this.overlayMsg   = overlayEl.querySelector('#overlay-msg');
    this.overlaySub   = overlayEl.querySelector('#overlay-sub');

    this.emojis    = [];
    this.particles = [];
    this.round     = 1;
    this.remaining = 0;
    this.active    = false;
    this.roundLock = false;
    this.raf       = null;
    this.pool      = [];

    this._resize  = () => this._onResize();
    this._touch   = (e) => { e.preventDefault(); this._onTouch(e); };
    this._click   = (e) => this._onClick(e);
  }

  /* ── lifecycle ─────────────────────────────────────────────────────────── */

  start() {
    this._onResize();
    window.addEventListener('resize', this._resize);
    this.canvas.addEventListener('touchstart', this._touch, { passive: false });
    this.canvas.addEventListener('click', this._click);

    this.round     = 1;
    this.active    = true;
    this.roundLock = false;
    this.emojis    = [];
    this.particles = [];
    this.pool      = [...EMOJIS].sort(() => Math.random() - 0.5);

    this._updateBadge();
    this._spawnRound();
    this._loop();
  }

  stop() {
    this.active = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this._resize);
    this.canvas.removeEventListener('touchstart', this._touch);
    this.canvas.removeEventListener('click', this._click);
    this.emojis = [];
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._hideOverlay();
  }

  /* ── internal ──────────────────────────────────────────────────────────── */

  _onResize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _pickEmoji() {
    if (this.pool.length === 0) this.pool = [...EMOJIS].sort(() => Math.random() - 0.5);
    return this.pool.pop();
  }

  _spawnRound() {
    this.emojis    = [];
    this.roundLock = false;
    const W = this.canvas.width, H = this.canvas.height;
    const baseSpeed = Math.min(4.5, 1.6 + this.round * 0.25);
    const size = Math.max(52, Math.min(80, 82 - this.round * 1.5));

    for (let i = 0; i < this.round; i++) {
      const margin = size * 0.7;
      const x = margin + Math.random() * (W - 2 * margin);
      const y = margin + Math.random() * (H - 2 * margin);
      const angle = Math.random() * Math.PI * 2;
      const speed = baseSpeed * (0.75 + Math.random() * 0.5);
      this.emojis.push({
        emoji:   this._pickEmoji(),
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot:       Math.random() * Math.PI * 2,
        rotSpeed:  (Math.random() - 0.5) * (0.025 + this.round * 0.003),
        breath:    Math.random() * Math.PI * 2,
        size,
        scale:   0,
        state:   'spawning', // spawning | alive | popping | dead
        popT:    0,
        spawnDelay: i * 8,
      });
    }
    this.remaining = this.round;
    this._updateBadge();
  }

  _loop() {
    if (!this.active) return;
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    /* particles */
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }

    /* emojis */
    const W = this.canvas.width, H = this.canvas.height;
    let anyDead = false;

    for (const e of this.emojis) {
      if (e.spawnDelay > 0) { e.spawnDelay--; continue; }

      if (e.state === 'spawning') {
        e.scale += (1 - e.scale) * 0.14;
        if (e.scale > 0.97) { e.scale = 1; e.state = 'alive'; }
      }

      if (e.state === 'alive') {
        e.x   += e.vx;
        e.y   += e.vy;
        e.rot += e.rotSpeed;
        e.breath += 0.055;
        const r = e.size * 0.52;
        if (e.x - r < 0)  { e.x = r;   e.vx =  Math.abs(e.vx); }
        if (e.x + r > W)  { e.x = W-r; e.vx = -Math.abs(e.vx); }
        if (e.y - r < 0)  { e.y = r;   e.vy =  Math.abs(e.vy); }
        if (e.y + r > H)  { e.y = H-r; e.vy = -Math.abs(e.vy); }
      }

      if (e.state === 'popping') {
        e.popT += 0.055;
        e.scale = 1 + e.popT * 0.9;
        if (e.popT >= 1) { e.state = 'dead'; anyDead = true; }
      }
    }

    if (anyDead) {
      this.emojis = this.emojis.filter(e => e.state !== 'dead');
      if (this.emojis.length === 0 && !this.roundLock) {
        this.roundLock = true;
        this._roundComplete();
      }
    }
  }

  _draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) p.draw(ctx);

    for (const e of this.emojis) {
      if (e.spawnDelay > 0) continue;
      const breathScale = 1 + Math.sin(e.breath) * 0.038;
      const s = e.scale * breathScale;
      const alpha = e.state === 'popping' ? Math.max(0, 1 - e.popT * 2.2) : 1;
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.rot);
      ctx.scale(s, s);
      ctx.globalAlpha = alpha;
      ctx.font = `${e.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(e.emoji, 0, 0);
      ctx.restore();
    }
  }

  _onTouch(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      const r = this.canvas.getBoundingClientRect();
      this._tryPop(t.clientX - r.left, t.clientY - r.top);
    }
  }

  _onClick(e) {
    const r = this.canvas.getBoundingClientRect();
    this._tryPop(e.clientX - r.left, e.clientY - r.top);
  }

  _tryPop(x, y) {
    for (const e of this.emojis) {
      if (e.state !== 'alive') continue;
      const dx = x - e.x, dy = y - e.y;
      if (dx*dx + dy*dy < (e.size * 0.75) ** 2) {
        this._popEmoji(e);
        return;
      }
    }
  }

  _popEmoji(e) {
    e.state = 'popping';
    e.popT  = 0;
    this.remaining--;
    this._updateBadge();
    this.particles.push(...spawnBurst(e.x, e.y, 30));
    Sounds.pop();
  }

  _roundComplete() {
    Sounds.fanfare();

    /* celebratory burst from centre */
    const cx = this.canvas.width / 2, cy = this.canvas.height / 2;
    for (let i = 0; i < 4; i++) {
      const ox = (Math.random() - 0.5) * 120, oy = (Math.random() - 0.5) * 120;
      this.particles.push(...spawnBurst(cx + ox, cy + oy, 18));
    }

    this._showOverlay();
    setTimeout(() => {
      this._hideOverlay();
      this.round++;
      this._spawnRound();
    }, 2200);
  }

  _showOverlay() {
    const idx = Math.floor(Math.random() * CELEBRATE_MSGS.length);
    this.overlayEmoji.textContent = CELEBRATE_EMOJI[idx];
    this.overlayMsg.textContent   = CELEBRATE_MSGS[idx];
    this.overlaySub.textContent   = `Round ${this.round + 1}: ${this.round + 1} emojis! 🚀`;

    /* reset animation */
    this.overlayInner.style.transition = 'none';
    this.overlayInner.style.transform  = 'scale(0)';
    this.overlayInner.style.opacity    = '0';
    this.overlayInner.offsetHeight;
    this.overlayInner.style.transition = '';

    this.overlay.classList.add('visible');
    /* micro-delay so transition applies */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      this.overlayInner.style.transform = '';
      this.overlayInner.style.opacity   = '';
    }));
  }

  _hideOverlay() {
    this.overlay.classList.remove('visible');
  }

  _updateBadge() {
    const left = this.emojis.filter(e => e.state === 'alive' || e.state === 'spawning').length;
    this.badge.textContent = left > 0
      ? `Round ${this.round} · ${left} left`
      : `Round ${this.round}`;
  }
}
