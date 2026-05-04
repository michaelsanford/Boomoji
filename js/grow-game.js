class GrowGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.particles = [];
    this.active    = false;
    this.raf       = null;
    this.pool      = [];

    this.emoji = '';
    this.size  = 80;
    this.BASE  = 80;
    this.MAX   = 260;
    this.GROW   = 1.8;
    this.SHRINK = 0.4;

    this.isHeld       = false;
    this.exploding    = false;
    this.explodeTimer = 0;
    this.flashAlpha   = 0;

    this.bounceSc      = 0.01;
    this.bounceVel     = 0;
    this.lastSoundSize = 0;

    this._resize        = ()  => this._onResize();
    this._pointerdown   = (e) => { e.preventDefault(); if (!this.exploding) this.isHeld = true; };
    this._pointerup     = ()  => { this.isHeld = false; };
    this._pointercancel = ()  => { this.isHeld = false; };
  }

  /* ── lifecycle ─────────────────────────────────────────────────────────── */

  start() {
    this._onResize();
    window.addEventListener('resize',          this._resize);
    this.canvas.addEventListener('pointerdown', this._pointerdown);
    window.addEventListener('pointerup',       this._pointerup);
    window.addEventListener('pointercancel',   this._pointercancel);

    this.active     = true;
    this.isHeld     = false;
    this.exploding  = false;
    this.flashAlpha = 0;
    this.particles  = [];
    this.pool       = [...EMOJIS].sort(() => Math.random() - 0.5);
    this._nextEmoji();
    this._loop();
  }

  stop() {
    this.active = false;
    this.isHeld = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize',           this._resize);
    this.canvas.removeEventListener('pointerdown', this._pointerdown);
    window.removeEventListener('pointerup',        this._pointerup);
    window.removeEventListener('pointercancel',    this._pointercancel);
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /* ── internal ──────────────────────────────────────────────────────────── */

  _onResize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _pickEmoji() {
    if (!this.pool.length) this.pool = [...EMOJIS].sort(() => Math.random() - 0.5);
    return this.pool.pop();
  }

  _nextEmoji() {
    this.emoji         = this._pickEmoji();
    this.size          = this.BASE;
    this.bounceSc      = 0.01;
    this.bounceVel     = 0;
    this.lastSoundSize = this.BASE;
    this.exploding     = false;
  }

  _loop() {
    if (!this.active) return;
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }

    if (this.flashAlpha > 0) this.flashAlpha = Math.max(0, this.flashAlpha - 0.035);

    /* bounce spring */
    this.bounceVel += (1 - this.bounceSc) * 0.18;
    this.bounceVel *= 0.7;
    this.bounceSc  += this.bounceVel;

    if (this.exploding) {
      if (--this.explodeTimer <= 0) this._nextEmoji();
      return;
    }

    if (this.isHeld) {
      this.size = Math.min(this.MAX, this.size + this.GROW);
      /* sound + bounce tick every 12 px of growth */
      if (this.size - this.lastSoundSize >= 12) {
        this.lastSoundSize = this.size;
        const t = (this.size - this.BASE) / (this.MAX - this.BASE);
        Sounds.grow(200 + t * 700);
        this.bounceVel += 0.1;
      }
      if (this.size >= this.MAX) this._explode();
    } else if (this.size > this.BASE) {
      this.size = Math.max(this.BASE, this.size - this.SHRINK);
    }
  }

  _explode() {
    this.exploding    = true;
    this.explodeTimer = 85;
    this.isHeld       = false;
    this.flashAlpha   = 1.0;

    const cx = this.canvas.width  / 2;
    const cy = this.canvas.height / 2;
    for (let i = 0; i < 6; i++) {
      const ox = (Math.random() - 0.5) * 240;
      const oy = (Math.random() - 0.5) * 240;
      this.particles.push(...spawnBurst(cx + ox, cy + oy, 42, 1.6));
    }
    Sounds.boom();
  }

  _draw() {
    const ctx = this.ctx;
    const W = this.canvas.width, H = this.canvas.height;
    ctx.clearRect(0, 0, W, H);

    for (const p of this.particles) p.draw(ctx);

    if (this.flashAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = this.flashAlpha * 0.8;
      ctx.fillStyle   = '#ffffff';
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    if (!this.exploding) {
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.scale(this.bounceSc, this.bounceSc);
      ctx.font         = `${this.size}px serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.emoji, 0, 0);
      ctx.restore();
    }
  }
}
