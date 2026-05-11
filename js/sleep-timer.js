const TIMER_LIMIT_KEY   = 'boomoji-play-limit';
const TIMER_SESSION_KEY = 'boomoji-session-start';

const SLEEP_ANIMALS = ['🐻', '🐱', '🦊', '🐶'];

class SleepTimer {
  constructor(overlayEl, canvasEl, gateOverlayEl) {
    this._overlay = overlayEl;
    this._canvas  = canvasEl;
    this._ctx     = canvasEl.getContext('2d');
    this._gate    = new ParentGate(gateOverlayEl, () => this._unlock());

    this._tick    = 0;
    this._zees    = [];
    this._stars   = [];
    this._raf     = null;
    this._active  = false;
    this._watcher = null;

    this._onTap = (e) => { e.preventDefault(); this._gate.show(); };

    this._refreshButtons();
    this._startWatcher();
    this._check();
  }

  /* ── Public ─────────────────────────────────────────────────────────────── */

  get _limitMs() {
    const m = parseInt(localStorage.getItem(TIMER_LIMIT_KEY) || '0', 10);
    return m > 0 ? m * 60_000 : 0;
  }

  setLimit(minutes) {
    localStorage.setItem(TIMER_LIMIT_KEY, String(minutes));
    if (minutes === 0) {
      this._resetSession();
      if (this._active) this._hideSleep();
    }
    this._refreshButtons();
  }

  startSession() {
    if (!this._limitMs) return;
    if (!localStorage.getItem(TIMER_SESSION_KEY)) {
      localStorage.setItem(TIMER_SESSION_KEY, String(Date.now()));
    }
    this._check();
  }

  /* ── Internal ───────────────────────────────────────────────────────────── */

  _refreshButtons() {
    const cur = parseInt(localStorage.getItem(TIMER_LIMIT_KEY) || '0', 10);
    document.querySelectorAll('.timer-btn').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.duration) === cur);
    });
  }

  _resetSession() {
    localStorage.removeItem(TIMER_SESSION_KEY);
  }

  _startWatcher() {
    if (this._watcher) return;
    this._watcher = setInterval(() => this._check(), 10_000);
  }

  _check() {
    if (!this._limitMs || this._active) return;
    const start = parseInt(localStorage.getItem(TIMER_SESSION_KEY) || '0', 10);
    if (!start) return;
    if (Date.now() - start >= this._limitMs) this._showSleep();
  }

  _showSleep() {
    if (this._active) return;
    this._active = true;
    this._canvas.width  = window.innerWidth;
    this._canvas.height = window.innerHeight;
    this._initScene();
    this._loop();
    this._overlay.classList.add('visible');
    this._canvas.addEventListener('touchstart', this._onTap, { passive: false });
    this._canvas.addEventListener('click', this._onTap);
  }

  _hideSleep() {
    this._active = false;
    this._overlay.classList.remove('visible');
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    this._canvas.removeEventListener('touchstart', this._onTap);
    this._canvas.removeEventListener('click', this._onTap);
  }

  _unlock() {
    this._resetSession();
    this._hideSleep();
  }

  /* ── Scene ──────────────────────────────────────────────────────────────── */

  _initScene() {
    const W = this._canvas.width, H = this._canvas.height;
    this._stars = Array.from({ length: 55 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H * 0.62,
      r:     0.8 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
    }));
    this._zees = [];
    this._tick = 0;
  }

  _loop() {
    if (!this._active) return;
    this._tick++;
    this._spawnZees();
    this._updateZees();
    this._render();
    this._raf = requestAnimationFrame(() => this._loop());
  }

  _spawnZees() {
    if (this._tick % 50 !== 0) return;
    const W = this._canvas.width, H = this._canvas.height;
    const groundY = H * 0.62;
    const spacing = W / (SLEEP_ANIMALS.length + 1);
    const i = Math.floor(Math.random() * SLEEP_ANIMALS.length);
    this._zees.push({
      x:    spacing * (i + 1) + (Math.random() - 0.5) * 20,
      y:    groundY - 48,
      vx:   (Math.random() - 0.5) * 0.4,
      vy:   -(0.55 + Math.random() * 0.4),
      size: 13 + Math.floor(Math.random() * 3) * 5,
      life: 1,
    });
  }

  _updateZees() {
    for (const z of this._zees) {
      z.x += z.vx;
      z.y += z.vy;
      z.life -= 0.007;
    }
    this._zees = this._zees.filter(z => z.life > 0);
  }

  _render() {
    const ctx = this._ctx;
    const W = this._canvas.width, H = this._canvas.height;

    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0,   '#06061a');
    sky.addColorStop(0.6, '#0d1240');
    sky.addColorStop(1,   '#1a1a60');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    for (const s of this._stars) {
      const tw = 0.35 + Math.sin(this._tick * 0.028 + s.phase) * 0.35;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,240,200,${tw.toFixed(2)})`;
      ctx.fill();
    }

    ctx.font         = '54px serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌙', W * 0.82, H * 0.10);

    ctx.beginPath();
    ctx.ellipse(W / 2, H * 0.82, W * 0.72, H * 0.28, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10,18,55,0.80)';
    ctx.fill();

    const groundY = H * 0.62;
    const spacing = W / (SLEEP_ANIMALS.length + 1);
    for (let i = 0; i < SLEEP_ANIMALS.length; i++) {
      const x   = spacing * (i + 1);
      const bob = Math.sin(this._tick * 0.022 + i * 1.4) * 2.5;
      ctx.font         = '44px serif';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(SLEEP_ANIMALS[i], x, groundY + bob);
    }

    for (const z of this._zees) {
      ctx.save();
      ctx.globalAlpha  = Math.max(0, z.life);
      ctx.font         = `bold ${z.size}px 'Fredoka One', sans-serif`;
      ctx.fillStyle    = 'rgba(160,185,255,1)';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('z', z.x, z.y);
      ctx.restore();
    }

    ctx.save();
    ctx.shadowColor  = 'rgba(0,0,40,0.9)';
    ctx.shadowBlur   = 18;
    ctx.font         = `bold ${Math.round(Math.min(W * 0.09, 36))}px 'Fredoka One', sans-serif`;
    ctx.fillStyle    = 'rgba(200,220,255,0.96)';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t('sleep.message'), W / 2, H * 0.30);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha  = 0.45 + Math.sin(this._tick * 0.04) * 0.15;
    ctx.font         = `${Math.round(Math.min(W * 0.044, 17))}px 'Fredoka One', sans-serif`;
    ctx.fillStyle    = 'rgba(150,175,220,1)';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t('sleep.hint'), W / 2, H * 0.88);
    ctx.restore();
  }
}
