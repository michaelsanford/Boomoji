class RevealGame {
  constructor(canvas, hintEl) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.hint   = hintEl;

    this.emojis    = [];
    this.particles = [];
    this.stars     = [];

    this.active = false;
    this.raf    = null;
    this.hinted = false;
    this.touchTracks = new Map();
    this.pool    = [];

    this._resize     = () => this._onResize();
    this._touchstart = (e) => { e.preventDefault(); this._onTouchStart(e); };
    this._touchmove  = (e) => { e.preventDefault(); this._onTouchMove(e); };
    this._touchend   = (e) => { e.preventDefault(); this._onTouchEnd(e); };
    this._click      = (e) => this._onClick(e);
  }

  /* ── lifecycle ─────────────────────────────────────────────────────────── */

  start() {
    this._onResize();
    window.addEventListener('resize', this._resize);
    this.canvas.addEventListener('touchstart', this._touchstart, { passive: false });
    this.canvas.addEventListener('touchmove',  this._touchmove,  { passive: false });
    this.canvas.addEventListener('touchend',   this._touchend,   { passive: false });
    this.canvas.addEventListener('click', this._click);

    this.active = true;
    this.emojis = [];
    this.particles = [];
    this.touchTracks.clear();
    this.pool = [...EMOJIS].sort(() => Math.random() - 0.5);
    this.hinted = false;
    this.hint.classList.remove('gone');

    this._initStars();
    this._loop();
  }

  stop() {
    this.active = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this._resize);
    this.canvas.removeEventListener('touchstart', this._touchstart);
    this.canvas.removeEventListener('touchmove',  this._touchmove);
    this.canvas.removeEventListener('touchend',   this._touchend);
    this.canvas.removeEventListener('click', this._click);
    this.emojis = [];
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /* ── internal ──────────────────────────────────────────────────────────── */

  _onResize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._initStars();
  }

  _initStars() {
    this.stars = [];
    const count = Math.floor(this.canvas.width * this.canvas.height / 5000);
    for (let i = 0; i < count; i++) this.stars.push(this._newStar(true));
  }

  _newStar(anywhere) {
    return {
      x:       Math.random() * this.canvas.width,
      y:       anywhere
              ? Math.random() * this.canvas.height
              : this.canvas.height + 10,
      vx:      (Math.random() - 0.5) * 0.35,
      vy:      -(0.15 + Math.random() * 0.5),
      r:       0.8 + Math.random() * 2.2,
      alpha:   0.2 + Math.random() * 0.55,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.04 + Math.random() * 0.04,
    };
  }

  _pickEmoji() {
    if (this.pool.length === 0) this.pool = [...EMOJIS].sort(() => Math.random() - 0.5);
    return this.pool.pop();
  }

  _loop() {
    if (!this.active) return;
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    const now = Date.now();

    /* ambient stars */
    for (const s of this.stars) {
      s.x       += s.vx;
      s.y       += s.vy;
      s.twinkle += s.twinkleSpeed;
      if (s.y < -12) Object.assign(s, this._newStar(false));
    }

    /* burst particles */
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }

    /* emojis */
    for (const e of this.emojis) {
      if (e.state === 'spawning') {
        e.scale += (1.05 - e.scale) * 0.16;
        if (e.scale > 1.0) {
          e.scale = 1;
          e.state = 'alive';
        }
      }

      if (e.state === 'alive' || e.state === 'moving') {
        e.x  += e.vx;
        e.y  += e.vy;
        e.vx *= 0.975;
        e.vy *= 0.975;
        e.vy += 0.018;
        e.rot += e.rotSpeed;

        if (now - e.born > e.lifetime) {
          e.state    = 'dying';
          e.dieStart = now;
        }
      }

      if (e.state === 'dying') {
        const p = Math.max(0, 1 - (now - e.dieStart) / 380);
        e.scale = p * p;
        if (e.scale < 0.01) {
          e.state = 'dead';
          this.particles.push(...spawnBurst(e.x, e.y, 10, 0.55));
          Sounds.softPop();
        }
      }
    }

    this.emojis = this.emojis.filter(e => e.state !== 'dead');
  }

  _draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /* stars */
    for (const s of this.stars) {
      const t = 0.55 + 0.45 * Math.sin(s.twinkle);
      ctx.save();
      ctx.globalAlpha = s.alpha * t;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    /* particles */
    for (const p of this.particles) p.draw(ctx);

    /* emojis */
    for (const e of this.emojis) {
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.rot);
      ctx.scale(e.scale, e.scale);
      ctx.font = `${e.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(e.emoji, 0, 0);
      ctx.restore();
    }
  }

  _spawnEmoji(x, y, vx, vy) {
    if (!this.hinted) {
      this.hinted = true;
      this.hint.classList.add('gone');
    }

    const size = 68 + Math.floor(Math.random() * 28);
    const speed = Math.sqrt(vx * vx + vy * vy);
    const state = speed > 1 ? 'moving' : 'spawning';

    this.emojis.push({
      emoji:    this._pickEmoji(),
      x, y,
      vx, vy,
      rot:      (Math.random() - 0.5) * 0.4,
      rotSpeed: (Math.random() - 0.5) * 0.018,
      size,
      scale:    0.05,
      state,
      born:     Date.now(),
      lifetime: 3600 + Math.random() * 2000,
      dieStart: 0,
    });

    this.particles.push(...spawnBurst(x, y, 22));
    Sounds.sparkle();
  }

  /* ── touch handling ────────────────────────────────────────────────────── */

  _onTouchStart(e) {
    const rect = this.canvas.getBoundingClientRect();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      const now = Date.now();
      this.touchTracks.set(t.identifier, [
        { x: t.clientX - rect.left, y: t.clientY - rect.top, t: now }
      ]);
    }
  }

  _onTouchMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t    = e.changedTouches[i];
      const track = this.touchTracks.get(t.identifier);
      if (!track) continue;
      track.push({ x: t.clientX - rect.left, y: t.clientY - rect.top, t: Date.now() });
      if (track.length > 6) track.shift();
    }
  }

  _onTouchEnd(e) {
    const rect = this.canvas.getBoundingClientRect();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t     = e.changedTouches[i];
      const track = this.touchTracks.get(t.identifier);
      this.touchTracks.delete(t.identifier);

      const ex = t.clientX - rect.left;
      const ey = t.clientY - rect.top;
      let vx = 0, vy = 0;

      if (track && track.length >= 2) {
        const p1  = track[track.length - 1];
        const dt  = Math.max(16, Date.now() - p1.t);
        vx = ((ex - p1.x) / dt) * 14;
        vy = ((ey - p1.y) / dt) * 14;
        const spd = Math.sqrt(vx*vx + vy*vy);
        const MAX = 14;
        if (spd > MAX) { vx = vx/spd*MAX; vy = vy/spd*MAX; }
      }

      this._spawnEmoji(ex, ey, vx, vy);
    }
  }

  _onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    this._spawnEmoji(e.clientX - rect.left, e.clientY - rect.top, 0, 0);
  }
}
