const STICKER_THEMES = [
  {
    id:     'animals',
    name:   'Animals',
    icon:   '🐾',
    emojis: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🦄','🦓','🐘','🦒','🐲'],
  },
  {
    id:     'ocean',
    name:   'Ocean',
    icon:   '🌊',
    emojis: ['🐙','🐬','🦀','🐠','🐡','🐳','🦈','🐟','🦞','🦑','🐋','🐚','🦜','🐊','🐸'],
  },
  {
    id:     'yummy',
    name:   'Yummy!',
    icon:   '🍕',
    emojis: ['🍭','🍦','🍓','🍕','🍉','🍊','🍋','🍇','🍒','🥝','🍰','🍩','🍪','🍫','🧁'],
  },
  {
    id:     'space',
    name:   'Space',
    icon:   '🚀',
    emojis: ['⭐','🌟','💫','🚀','🌙','🪐','🌍','🌕','☄️','👾','🛸','🌞','🔭','💥','🌈'],
  },
  {
    id:     'garden',
    name:   'Garden',
    icon:   '🌸',
    emojis: ['🌺','🌸','🌻','🌷','🌹','🍀','🌿','🦋','🐝','🌼','🍄','🌱','🌵','🌾','🌴'],
  },
];

const STAMPS_PER_ROUND = 15;

const FLOWER_COLOURS = ['#FF6B9D','#FFD700','#FF8E53','#C77DFF','#4ECDC4','#FF6B6B','#A8E6CF'];

class StickersGame {
  constructor(canvas, badgeEl, overlayEl, hintEl) {
    this.canvas  = canvas;
    this.ctx     = canvas.getContext('2d');
    this.badge   = badgeEl;
    this.overlay = overlayEl;
    this.overlayInner = overlayEl.querySelector('.overlay-inner');
    this.overlayEmoji = overlayEl.querySelector('.overlay-emoji');
    this.overlayMsg   = overlayEl.querySelector('.overlay-msg');
    this.overlaySub   = overlayEl.querySelector('.overlay-sub');
    this.hint    = hintEl;

    this.stickers    = [];
    this.particles   = [];
    this.stars       = [];
    this.active      = false;
    this.raf         = null;
    this.themeIndex  = 0;
    this.stampCount  = 0;
    this.celebrating = false;
    this.pool        = [];
    this.hinted      = false;
    this.bgCanvas    = null;

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

    this.active      = true;
    this.themeIndex  = 0;
    this.celebrating = false;
    this.stickers    = [];
    this.particles   = [];
    this.hinted      = false;
    this.hint.classList.remove('gone');

    this._loadTheme();
    this._loop();
  }

  stop() {
    this.active = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this._resize);
    this.canvas.removeEventListener('touchstart', this._touch);
    this.canvas.removeEventListener('click',      this._click);
    this.stickers  = [];
    this.particles = [];
    this._hideOverlay();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /* ── internal ──────────────────────────────────────────────────────────── */

  _onResize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.bgCanvas = null;
    if (this._currentTheme()?.id === 'space') this._initStars();
  }

  _currentTheme() {
    return STICKER_THEMES[this.themeIndex];
  }

  _loadTheme() {
    const theme = this._currentTheme();
    this.pool       = shuffle([...theme.emojis]);
    this.stickers   = [];
    this.stampCount = 0;
    this.bgCanvas   = null;
    this._updateBadge();
    if (theme.id === 'space') this._initStars();
    else this.stars = [];
  }

  _nextTheme() {
    this.themeIndex = (this.themeIndex + 1) % STICKER_THEMES.length;
    this._hideOverlay();
    this.celebrating = false;
    this._loadTheme();
  }

  _updateBadge() {
    const theme = this._currentTheme();
    this.badge.textContent = `${theme.icon} ${t(`sticker.${theme.id}`)}`;
  }

  /* ── stars (space theme) ───────────────────────────────────────────────── */

  _initStars() {
    this.stars = [];
    const count = Math.floor(this.canvas.width * this.canvas.height / 4500);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x:            Math.random() * this.canvas.width,
        y:            Math.random() * this.canvas.height,
        r:            0.8 + Math.random() * 2.2,
        alpha:        0.25 + Math.random() * 0.55,
        twinkle:      Math.random() * Math.PI * 2,
        twinkleSpeed: 0.04 + Math.random() * 0.04,
      });
    }
  }

  /* ── loop ──────────────────────────────────────────────────────────────── */

  _loop() {
    if (!this.active) return;
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    /* particles */
    let alive = 0;
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].life > 0) this.particles[alive++] = this.particles[i];
    }
    this.particles.length = alive;

    /* star twinkle */
    for (const s of this.stars) s.twinkle += s.twinkleSpeed;

    /* sticker spring-in */
    for (const s of this.stickers) {
      if (s.bounceSc < 1) {
        s.bounceVel += (1 - s.bounceSc) * 0.18;
        s.bounceVel *= 0.7;
        s.bounceSc  += s.bounceVel;
        if (s.bounceSc > 0.99) s.bounceSc = 1;
      }
    }
  }

  _draw() {
    const ctx = this.ctx;
    const W = this.canvas.width, H = this.canvas.height;
    const id = this._currentTheme().id;

    if (id === 'space') {
      this._drawBackground(ctx, W, H);
    } else {
      if (!this.bgCanvas) {
        this.bgCanvas        = document.createElement('canvas');
        this.bgCanvas.width  = W;
        this.bgCanvas.height = H;
        this._drawBackground(this.bgCanvas.getContext('2d'), W, H);
      }
      ctx.drawImage(this.bgCanvas, 0, 0);
    }

    for (const p of this.particles) p.draw(ctx);

    for (const s of this.stickers) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.scale(s.bounceSc, s.bounceSc);
      ctx.font         = s.font;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.emoji, 0, 0);
      ctx.restore();
    }
  }

  /* ── backgrounds ───────────────────────────────────────────────────────── */

  _drawBackground(ctx, W, H) {
    const id  = this._currentTheme().id;

    if (id === 'animals') {
      /* sky */
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.68);
      sky.addColorStop(0, '#5BC8F5');
      sky.addColorStop(1, '#A8DFFB');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      /* sun glow */
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.fillStyle   = '#FFD700';
      ctx.beginPath();
      ctx.arc(W * 0.82, H * 0.1, 72, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      /* sun */
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(W * 0.82, H * 0.1, 48, 0, Math.PI * 2);
      ctx.fill();

      /* back hill */
      ctx.fillStyle = '#6ab840';
      ctx.beginPath();
      ctx.ellipse(W * 0.22, H * 0.71, W * 0.32, H * 0.07, 0, Math.PI, 0);
      ctx.fill();

      /* front hill */
      ctx.fillStyle = '#7EC850';
      ctx.beginPath();
      ctx.ellipse(W * 0.74, H * 0.70, W * 0.34, H * 0.07, 0, Math.PI, 0);
      ctx.fill();

      /* ground */
      const ground = ctx.createLinearGradient(0, H * 0.68, 0, H);
      ground.addColorStop(0, '#7EC850');
      ground.addColorStop(1, '#5a9e3c');
      ctx.fillStyle = ground;
      ctx.fillRect(0, H * 0.68, W, H * 0.32);

    } else if (id === 'ocean') {
      /* sky */
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.22);
      sky.addColorStop(0, '#87CEEB');
      sky.addColorStop(1, '#5AB4E0');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H * 0.22);

      /* water */
      const water = ctx.createLinearGradient(0, H * 0.22, 0, H * 0.88);
      water.addColorStop(0, '#1E90FF');
      water.addColorStop(0.45, '#006994');
      water.addColorStop(1, '#003d6e');
      ctx.fillStyle = water;
      ctx.fillRect(0, H * 0.22, W, H * 0.66);

      /* sandy floor */
      const sand = ctx.createLinearGradient(0, H * 0.88, 0, H);
      sand.addColorStop(0, '#C8A97A');
      sand.addColorStop(1, '#B8956A');
      ctx.fillStyle = sand;
      ctx.fillRect(0, H * 0.88, W, H * 0.12);

      /* wave line */
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth   = 3;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = H * 0.22 + Math.sin(x / 38) * 7;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

    } else if (id === 'yummy') {
      /* sky */
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
      sky.addColorStop(0, '#B0E2FF');
      sky.addColorStop(1, '#87CEEB');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H * 0.5);

      /* grass */
      const grass = ctx.createLinearGradient(0, H * 0.5, 0, H * 0.72);
      grass.addColorStop(0, '#7EC850');
      grass.addColorStop(1, '#5a9e3c');
      ctx.fillStyle = grass;
      ctx.fillRect(0, H * 0.5, W, H * 0.22);

      /* picnic blanket — red/white checkers */
      const cellW  = W / 6;
      const blanketTop = H * 0.72;
      const cellH  = (H - blanketTop) / 4;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 6; col++) {
          ctx.fillStyle = (row + col) % 2 === 0 ? '#e74c3c' : '#f8d7d7';
          ctx.fillRect(col * cellW, blanketTop + row * cellH, cellW + 1, cellH + 1);
        }
      }

      /* blanket border */
      ctx.save();
      ctx.strokeStyle = '#c0392b';
      ctx.lineWidth   = 3;
      ctx.strokeRect(0, blanketTop, W, H - blanketTop);
      ctx.restore();

    } else if (id === 'space') {
      /* deep space */
      const space = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.8);
      space.addColorStop(0, '#1e0a40');
      space.addColorStop(1, '#080015');
      ctx.fillStyle = space;
      ctx.fillRect(0, 0, W, H);

      /* stars */
      for (const s of this.stars) {
        const t = 0.55 + 0.45 * Math.sin(s.twinkle);
        ctx.save();
        ctx.globalAlpha = s.alpha * t;
        ctx.fillStyle   = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

    } else if (id === 'garden') {
      /* sky */
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
      sky.addColorStop(0, '#B8E4FF');
      sky.addColorStop(1, '#E0F4FF');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H * 0.65);

      /* ground */
      const ground = ctx.createLinearGradient(0, H * 0.65, 0, H);
      ground.addColorStop(0, '#7EC850');
      ground.addColorStop(1, '#5a9e3c');
      ctx.fillStyle = ground;
      ctx.fillRect(0, H * 0.65, W, H * 0.35);

      /* flower stems */
      const positions = [0.07, 0.19, 0.33, 0.47, 0.60, 0.74, 0.87, 0.94];
      positions.forEach((fx, i) => {
        const x  = W * fx;
        const stemTop = H * 0.48;

        ctx.save();
        ctx.strokeStyle = '#3d7a22';
        ctx.lineWidth   = 5;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(x, H * 0.65);
        ctx.lineTo(x, stemTop);
        ctx.stroke();

        ctx.fillStyle = FLOWER_COLOURS[i % FLOWER_COLOURS.length];
        ctx.beginPath();
        ctx.arc(x, stemTop - 14, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff9c4';
        ctx.beginPath();
        ctx.arc(x, stemTop - 14, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
  }

  /* ── sticker placement ─────────────────────────────────────────────────── */

  _onTouch(e) {
    const r = this.canvas.getBoundingClientRect();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      this._placeSticker(t.clientX - r.left, t.clientY - r.top);
    }
  }

  _onClick(e) {
    const r = this.canvas.getBoundingClientRect();
    this._placeSticker(e.clientX - r.left, e.clientY - r.top);
  }

  _placeSticker(x, y) {
    if (this.celebrating) return;

    if (!this.hinted) {
      this.hinted = true;
      this.hint.classList.add('gone');
    }

    if (!this.pool.length) this.pool = shuffle([...this._currentTheme().emojis]);
    const emoji = this.pool.pop();
    const size  = 65 + Math.floor(Math.random() * 26);

    this.stickers.push({
      emoji,
      x, y,
      size,
      font:       `${size}px serif`,
      rot:        (Math.random() - 0.5) * 0.5,
      bounceSc:   0.01,
      bounceVel:  0,
    });

    this.particles.push(...spawnBurst(x, y, 14, 0.6));
    Sounds.sparkle();

    if (++this.stampCount >= STAMPS_PER_ROUND) this._celebrate();
  }

  /* ── celebration ───────────────────────────────────────────────────────── */

  _celebrate() {
    this.celebrating = true;
    Sounds.fanfare();

    const cx = this.canvas.width  / 2;
    const cy = this.canvas.height / 2;
    for (let i = 0; i < 4; i++) {
      const ox = (Math.random() - 0.5) * 160;
      const oy = (Math.random() - 0.5) * 160;
      this.particles.push(...spawnBurst(cx + ox, cy + oy, 24));
    }

    const nextIndex = (this.themeIndex + 1) % STICKER_THEMES.length;
    const next      = STICKER_THEMES[nextIndex];
    this.overlayEmoji.textContent = this._currentTheme().icon;
    this.overlayMsg.textContent   = t('stickers.great_job');
    this.overlaySub.textContent   = t('stickers.next_up', t(`sticker.${next.id}`), next.icon);

    this.overlayInner.style.transition = 'none';
    this.overlayInner.style.transform  = 'scale(0)';
    this.overlayInner.style.opacity    = '0';
    this.overlay.classList.add('visible');
    requestAnimationFrame(() => {
      this.overlayInner.style.transition = '';
      requestAnimationFrame(() => {
        this.overlayInner.style.transform = '';
        this.overlayInner.style.opacity   = '';
      });
    });

    setTimeout(() => this._nextTheme(), 2500);
  }

  _hideOverlay() {
    this.overlay.classList.remove('visible');
  }
}
