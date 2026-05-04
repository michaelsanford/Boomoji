const MEMORY_MSGS  = ['You did it!', 'Amazing!', 'Brilliant!', 'Superstar!'];
const MEMORY_EMOJI = ['🎉', '🏆', '🌟', '🎊'];

class MemoryGame {
  constructor(canvas, badgeEl, winOverlayEl) {
    this.canvas      = canvas;
    this.ctx         = canvas.getContext('2d');
    this.badge       = badgeEl;
    this.winOverlay  = winOverlayEl;
    this.overlayInner = winOverlayEl.querySelector('.overlay-inner');
    this.overlayEmoji = winOverlayEl.querySelector('.overlay-emoji');
    this.overlayMsg   = winOverlayEl.querySelector('.overlay-msg');
    this.replayBtn    = winOverlayEl.querySelector('.memory-replay-btn');

    this.tiles      = [];
    this.particles  = [];
    this.flipped    = [];
    this.matchCount = 0;
    this.locked     = false;
    this.active     = false;
    this.raf        = null;

    this._resize = () => this._onResize();
    this._touch  = (e) => { e.preventDefault(); this._onTouch(e); };
    this._click  = (e) => this._onClick(e);
    this._replay = () => this.start();
  }

  /* ── lifecycle ──────────────────────────────────────────────────────────── */

  start() {
    this._onResize();
    window.addEventListener('resize', this._resize);
    this.canvas.addEventListener('touchstart', this._touch, { passive: false });
    this.canvas.addEventListener('click', this._click);
    this.replayBtn.removeEventListener('click', this._replay);
    this.replayBtn.addEventListener('click', this._replay);

    this._hideOverlay();
    this._setupGrid();
    this.particles  = [];
    this.flipped    = [];
    this.locked     = false;
    this.active     = true;
    this.matchCount = 0;
    this._updateBadge();
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
    this.tiles     = [];
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._hideOverlay();
  }

  /* ── grid setup ─────────────────────────────────────────────────────────── */

  _setupGrid() {
    const pool  = shuffle([...EMOJIS]).slice(0, 8);
    const pairs = shuffle([...pool, ...pool]);
    this.tiles  = pairs.map((emoji, i) => ({
      emoji,
      col:        i % 4,
      row:        Math.floor(i / 4),
      state:      'down',  // down | flipping-up | up | flipping-down | matched
      flipT:      0,       // 0 = face-down, 1 = face-up
      matchPulse: 0,       // 0→1 bounce animation after match
    }));
    this._calcLayout();
  }

  _calcLayout() {
    const W = this.canvas.width, H = this.canvas.height;
    const pad = 16, gap = 10;
    const maxTileW = (W - pad * 2 - gap * 3) / 4;
    const maxTileH = (H - pad * 2 - gap * 3 - 80) / 4;
    this.tileSize = Math.min(maxTileW, maxTileH, 120);
    this.gap      = gap;
    const gridW = 4 * this.tileSize + 3 * gap;
    const gridH = 4 * this.tileSize + 3 * gap;
    this.startX = (W - gridW) / 2;
    this.startY = (H - gridH) / 2 + 20;
  }

  /* ── game loop ──────────────────────────────────────────────────────────── */

  _loop() {
    if (!this.active) return;
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    const SPEED = 0.08;

    for (const t of this.tiles) {
      if (t.state === 'flipping-up') {
        t.flipT = Math.min(1, t.flipT + SPEED);
        if (t.flipT === 1) {
          t.state = 'up';
          if (this.flipped.length === 2 &&
              this.flipped[0].state === 'up' &&
              this.flipped[1].state === 'up') {
            this._checkPair();
          }
        }
      } else if (t.state === 'flipping-down') {
        t.flipT = Math.max(0, t.flipT - SPEED);
        if (t.flipT === 0) t.state = 'down';
      } else if (t.state === 'matched' && t.matchPulse < 1) {
        t.matchPulse = Math.min(1, t.matchPulse + 0.04);
      }
    }

    let alive = 0;
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].life > 0) this.particles[alive++] = this.particles[i];
    }
    this.particles.length = alive;
  }

  _checkPair() {
    const [a, b] = this.flipped;

    if (a.emoji === b.emoji) {
      a.state      = 'matched';
      b.state      = 'matched';
      a.matchPulse = 0;
      b.matchPulse = 0;
      this.flipped    = [];
      this.locked     = false;
      this.matchCount++;
      this._updateBadge();

      const pa = this._tileCenter(a);
      const pb = this._tileCenter(b);
      this.particles.push(...spawnBurst(pa.x, pa.y, 20, 0.9));
      this.particles.push(...spawnBurst(pb.x, pb.y, 20, 0.9));
      Sounds.sparkle();

      if (this.matchCount === 8) setTimeout(() => this._win(), 700);
    } else {
      Sounds.softPop();
      const [a2, b2] = this.flipped;
      setTimeout(() => {
        a2.state = 'flipping-down';
        b2.state = 'flipping-down';
        this.flipped = [];
        this.locked  = false;
      }, 900);
    }
  }

  /* ── drawing ────────────────────────────────────────────────────────────── */

  _draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const t of this.tiles) this._drawTile(ctx, t);
    for (const p of this.particles) p.draw(ctx);
  }

  _drawTile(ctx, t) {
    const { x, y } = this._tilePos(t);
    const s  = this.tileSize;
    const cx = x + s / 2;
    const cy = y + s / 2;

    const scaleX     = Math.abs(Math.cos(t.flipT * Math.PI));
    const showFront  = t.flipT >= 0.5;
    const matchScale = (t.state === 'matched' && t.matchPulse < 1)
      ? 1 + Math.sin(t.matchPulse * Math.PI) * 0.1
      : 1;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scaleX * matchScale, matchScale);
    ctx.translate(-s / 2, -s / 2);

    if (showFront) this._drawFace(ctx, 0, 0, s, t.emoji, t.state === 'matched', t.matchPulse);
    else           this._drawBack(ctx, 0, 0, s);

    ctx.restore();
  }

  _drawBack(ctx, x, y, s) {
    const r    = Math.min(14, s * 0.16);
    const grad = ctx.createLinearGradient(x, y, x + s, y + s);
    grad.addColorStop(0, '#c77dff');
    grad.addColorStop(1, '#ff6b9d');
    this._rrect(ctx, x, y, s, s, r);
    ctx.fillStyle   = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth   = 2;
    ctx.stroke();

    ctx.font         = `${Math.round(s * 0.42)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = 'rgba(255,255,255,0.75)';
    ctx.fillText('❓', x + s / 2, y + s / 2);
  }

  _drawFace(ctx, x, y, s, emoji, matched, pulse) {
    const r = Math.min(14, s * 0.16);

    if (matched && pulse > 0) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, pulse) * 0.4;
      this._rrect(ctx, x - 5, y - 5, s + 10, s + 10, r + 5);
      ctx.fillStyle = '#ffd700';
      ctx.fill();
      ctx.restore();
    }

    this._rrect(ctx, x, y, s, s, r);
    ctx.fillStyle   = matched ? '#fffde7' : '#ffffff';
    ctx.fill();
    ctx.strokeStyle = matched ? 'rgba(255,200,0,0.55)' : 'rgba(180,100,255,0.22)';
    ctx.lineWidth   = 2;
    ctx.stroke();

    ctx.font         = `${Math.round(s * 0.52)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, x + s / 2, y + s / 2);
  }

  _rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y,     x + w, y + r,     r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x,     y + h, x, y + h - r,     r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x,     y,     x + r, y,          r);
    ctx.closePath();
  }

  /* ── hit testing ────────────────────────────────────────────────────────── */

  _tilePos(t) {
    return {
      x: this.startX + t.col * (this.tileSize + this.gap),
      y: this.startY + t.row * (this.tileSize + this.gap),
    };
  }

  _tileCenter(t) {
    const { x, y } = this._tilePos(t);
    return { x: x + this.tileSize / 2, y: y + this.tileSize / 2 };
  }

  _tileAt(px, py) {
    for (const t of this.tiles) {
      const { x, y } = this._tilePos(t);
      if (px >= x && px <= x + this.tileSize && py >= y && py <= y + this.tileSize) {
        return t;
      }
    }
    return null;
  }

  _onTap(px, py) {
    if (this.locked) return;
    const tile = this._tileAt(px, py);
    if (!tile || tile.state !== 'down') return;
    tile.state = 'flipping-up';
    this.flipped.push(tile);
    Sounds.pop();
    if (this.flipped.length === 2) this.locked = true;
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
    for (let i = 0; i < 5; i++) {
      const ox = (Math.random() - 0.5) * this.canvas.width  * 0.7;
      const oy = (Math.random() - 0.5) * this.canvas.height * 0.5;
      this.particles.push(...spawnBurst(cx + ox, cy + oy, 22));
    }
    this._showOverlay();
  }

  _showOverlay() {
    const idx = Math.floor(Math.random() * MEMORY_MSGS.length);
    this.overlayEmoji.textContent = MEMORY_EMOJI[idx];
    this.overlayMsg.textContent   = MEMORY_MSGS[idx];

    this.overlayInner.style.transition = 'none';
    this.overlayInner.style.transform  = 'scale(0)';
    this.overlayInner.style.opacity    = '0';
    this.winOverlay.classList.add('visible');
    requestAnimationFrame(() => {
      this.overlayInner.style.transition = '';
      requestAnimationFrame(() => {
        this.overlayInner.style.transform = '';
        this.overlayInner.style.opacity   = '';
      });
    });
  }

  _hideOverlay() {
    this.winOverlay.classList.remove('visible');
  }

  _updateBadge() {
    this.badge.textContent = this.matchCount > 0
      ? `${this.matchCount} / 8 matched`
      : 'Find the pairs!';
  }

  _onResize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._calcLayout();
  }
}
