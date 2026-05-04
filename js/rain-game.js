class RainGame {
  constructor(canvas) {
    this.canvas    = canvas;
    this.ctx       = canvas.getContext('2d');
    this.fallers   = [];
    this.particles = [];
    this.streaks   = [];
    this.active    = false;
    this.raf       = null;
    this.pool      = [];

    this.spawnTimer = 0;
    this.gameFrame  = 0;

    this._resize = ()  => this._onResize();
    this._touch  = (e) => { e.preventDefault(); this._onTouch(e); };
    this._click  = (e) => this._onClick(e);
  }

  /* ── lifecycle ─────────────────────────────────────────────────────────── */

  start() {
    this._onResize();
    window.addEventListener('resize', this._resize);
    this.canvas.addEventListener('touchstart', this._touch, { passive: false });
    this.canvas.addEventListener('click',      this._click);

    this.active     = true;
    this.fallers    = [];
    this.particles  = [];
    this.spawnTimer = 0;
    this.gameFrame  = 0;
    this.pool       = shuffle([...EMOJIS]);
    this._initStreaks();
    this._loop();
  }

  stop() {
    this.active = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this._resize);
    this.canvas.removeEventListener('touchstart', this._touch);
    this.canvas.removeEventListener('click',      this._click);
    this.fallers   = [];
    this.particles = [];
    this.streaks   = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /* ── internal ──────────────────────────────────────────────────────────── */

  _onResize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._initStreaks();
  }

  _initStreaks() {
    this.streaks = Array.from({ length: 18 }, () => this._newStreak(true));
  }

  _newStreak(anywhere) {
    return {
      x:     Math.random() * this.canvas.width,
      y:     anywhere ? Math.random() * this.canvas.height : -30,
      vy:    5 + Math.random() * 5,
      len:   12 + Math.random() * 22,
      alpha: 0.06 + Math.random() * 0.1,
    };
  }

  _pickEmoji() {
    if (!this.pool.length) this.pool = shuffle([...EMOJIS]);
    return this.pool.pop();
  }

  _spawnInterval() {
    /* starts at 90 frames (~1.5 s), decreases by 1 every 3 s, floors at 48 */
    return Math.max(48, 90 - Math.floor(this.gameFrame / 180));
  }

  _spawnFaller() {
    if (this.fallers.length >= 10) return;
    const W    = this.canvas.width;
    const size = 60 + Math.floor(Math.random() * 30);
    const m    = size * 0.6;
    this.fallers.push({
      emoji:    this._pickEmoji(),
      x:        m + Math.random() * (W - 2 * m),
      y:        -size,
      vy:       1.5 + Math.random() * 1.0,
      vx:       (Math.random() - 0.5) * 0.6,
      rot:      (Math.random() - 0.5) * 0.3,
      rotSpeed: (Math.random() - 0.5) * 0.022,
      size,
      font:     `${size}px serif`,
      scale:    0.1,
      state:    'alive',
      popT:     0,
      splatT:   0,
    });
  }

  _loop() {
    if (!this.active) return;
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    this.gameFrame++;
    if (--this.spawnTimer <= 0) {
      this._spawnFaller();
      this.spawnTimer = this._spawnInterval();
    }

    let alive = 0;
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].life > 0) this.particles[alive++] = this.particles[i];
    }
    this.particles.length = alive;

    for (const s of this.streaks) {
      s.y += s.vy;
      if (s.y > this.canvas.height + 35) Object.assign(s, this._newStreak(false));
    }

    const H = this.canvas.height;
    for (const f of this.fallers) {
      if (f.state === 'alive') {
        if (f.scale < 1) f.scale = Math.min(1, f.scale + 0.1);
        f.vy  += 0.09;
        f.x   += f.vx;
        f.y   += f.vy;
        f.rot += f.rotSpeed;
        if (f.y + f.size * 0.5 >= H) {
          f.state  = 'splat';
          f.splatT = 0;
          this.particles.push(...this._spawnSplash(f.x));
          Sounds.softPop();
        }
      }

      if (f.state === 'popping') {
        f.popT  += 0.06;
        f.scale  = 1 + f.popT * 0.9;
        if (f.popT >= 1) f.state = 'gone';
      }

      if (f.state === 'splat') {
        f.splatT += 0.07;
        if (f.splatT >= 1) f.state = 'gone';
      }
    }

    this.fallers = this.fallers.filter(f => f.state !== 'gone');
  }

  _draw() {
    const ctx = this.ctx;
    const H   = this.canvas.height;
    ctx.clearRect(0, 0, this.canvas.width, H);

    /* rain streaks */
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth   = 1.5;
    for (const s of this.streaks) {
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.moveTo(s.x,        s.y);
      ctx.lineTo(s.x - 1.5,  s.y + s.len);
      ctx.stroke();
    }
    ctx.restore();

    for (const p of this.particles) p.draw(ctx);

    for (const f of this.fallers) {
      ctx.save();
      if (f.state === 'splat') {
        const scaleX = 1 + f.splatT * 2.2;
        const scaleY = Math.max(0, 1 - f.splatT * 3.5);
        ctx.globalAlpha  = Math.max(0, 1 - f.splatT * 2.2);
        ctx.translate(f.x, H);
        ctx.scale(scaleX, scaleY);
        ctx.font         = f.font;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(f.emoji, 0, 0);
      } else {
        const alpha = f.state === 'popping' ? Math.max(0, 1 - f.popT * 2.2) : 1;
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        ctx.scale(f.scale, f.scale);
        ctx.globalAlpha  = alpha;
        ctx.font         = f.font;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(f.emoji, 0, 0);
      }
      ctx.restore();
    }
  }

  _spawnSplash(x) {
    const H = this.canvas.height;
    const list = [];
    for (let i = 0; i < 14; i++) {
      /* upward fan: straight up ± ~65° */
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
      const speed = 1.5 + Math.random() * 5;
      list.push(new Particle(
        x, H,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
        22 + Math.random() * 12,
        2 + Math.random() * 4,
        SHAPES[Math.floor(Math.random() * SHAPES.length)],
      ));
    }
    return list;
  }

  /* ── input ─────────────────────────────────────────────────────────────── */

  _onTouch(e) {
    const r = this.canvas.getBoundingClientRect();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      this._tryPop(t.clientX - r.left, t.clientY - r.top);
    }
  }

  _onClick(e) {
    const r = this.canvas.getBoundingClientRect();
    this._tryPop(e.clientX - r.left, e.clientY - r.top);
  }

  _tryPop(x, y) {
    for (const f of this.fallers) {
      if (f.state !== 'alive') continue;
      const dx = x - f.x, dy = y - f.y;
      if (dx*dx + dy*dy < (f.size * 0.75) ** 2) {
        this._popFaller(f);
        return;
      }
    }
  }

  _popFaller(f) {
    f.state = 'popping';
    f.popT  = 0;
    this.particles.push(...spawnBurst(f.x, f.y, 30));
    Sounds.pop();
  }
}
