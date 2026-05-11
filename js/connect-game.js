const CONNECT_P_COLORS = [
  { from: '#ff9a5c', to: '#ff6b9d' },  // P1: warm coral/pink
  { from: '#56CCF2', to: '#2F80ED' },  // P2: cool sky blue
];

class ConnectGame {
  constructor(canvas, badgeEl, winOverlayEl) {
    this.canvas     = canvas;
    this.ctx        = canvas.getContext('2d');
    this.badge      = badgeEl;
    this.winOverlay = winOverlayEl;
    this.overlayEmoji = winOverlayEl.querySelector('.overlay-emoji');
    this.overlayMsg   = winOverlayEl.querySelector('.overlay-msg');
    this.replayBtn    = winOverlayEl.querySelector('.connect-replay-btn');

    this.ROWS = 6;
    this.COLS = 7;

    this.board     = [];
    this.emojis    = ['', ''];
    this.turn      = 0;       // 0 = P1, 1 = P2
    this.falling   = null;    // { col, row, player, y, vy }
    this.winLine   = null;    // [[r,c], ...] 4 winning cells
    this.winPulse  = 0;
    this.particles = [];
    this.active    = false;
    this.locked    = false;
    this.raf       = null;
    this.bounce    = 0;       // turn-indicator bob animation

    this.cellSize  = 0;
    this.gridX     = 0;
    this.gridY     = 0;
    this.topZone   = 0;

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
    this._setupGame();
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
    this.board     = [];
    this.particles = [];
    this.falling   = null;
    this.winLine   = null;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._hideOverlay();
  }

  /* ── setup ──────────────────────────────────────────────────────────────── */

  _setupGame() {
    this.board     = Array.from({ length: this.ROWS }, () => new Array(this.COLS).fill(0));
    const pool     = shuffle([...EMOJIS]);
    this.emojis    = [pool[0], pool[1]];
    this.turn      = 0;
    this.falling   = null;
    this.winLine   = null;
    this.winPulse  = 0;
    this.particles = [];
    this.locked    = false;
    this.bounce    = 0;
    this._updateBadge();
  }

  /* ── layout ─────────────────────────────────────────────────────────────── */

  _calcLayout() {
    const W = this.canvas.width, H = this.canvas.height;
    this.topZone  = Math.min(H * 0.26, 178);
    const cellByW = (W - 16) / this.COLS;
    const cellByH = (H - this.topZone - 28) / this.ROWS;
    this.cellSize = Math.min(cellByW, cellByH, 74);
    this.gridW    = this.COLS * this.cellSize;
    this.gridH    = this.ROWS * this.cellSize;
    this.gridX    = (W - this.gridW) / 2;
    this.gridY    = this.topZone + (H - this.topZone - this.gridH) / 2;
  }

  /* ── game loop ──────────────────────────────────────────────────────────── */

  _loop() {
    if (!this.active) return;
    this._update();
    this._draw();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    this.bounce += 0.065;
    if (this.winLine) this.winPulse += 0.022;

    if (this.falling) {
      const targetY = this.gridY + this.falling.row * this.cellSize + this.cellSize / 2;
      this.falling.vy += 2.5;
      this.falling.y  += this.falling.vy;

      if (this.falling.y >= targetY) {
        this.falling.y = targetY;
        const { row, col, player } = this.falling;
        this.board[row][col] = player;
        this.falling = null;
        Sounds.pop();

        const line = this._checkWin(row, col, player);
        if (line) {
          this.winLine = line;
          this.locked  = true;
          const cx = this.gridX + col * this.cellSize + this.cellSize / 2;
          const cy = this.gridY + row * this.cellSize + this.cellSize / 2;
          this.particles.push(...spawnBurst(cx, cy, 28));
          setTimeout(() => this._win(player), 700);
        } else if (this._checkDraw()) {
          this.locked = true;
          setTimeout(() => {
            this._showOverlay('🤝', t('connect.tie'));
          }, 500);
        } else {
          this.turn   = 1 - this.turn;
          this.locked = false;
          this._updateBadge();
        }
      }
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
    this._drawTurnZone(ctx);
    this._drawDropArrows(ctx);
    this._drawGrid(ctx);
    if (this.falling) {
      const cx = this.gridX + this.falling.col * this.cellSize + this.cellSize / 2;
      this._drawPiece(ctx, cx, this.falling.y, this.falling.player - 1);
    }
    for (const p of this.particles) p.draw(ctx);
  }

  _drawTurnZone(ctx) {
    if (!this.emojis[0]) return;
    const W  = this.canvas.width;
    const cy = 70 + (this.topZone - 70) / 2;

    for (let p = 0; p < 2; p++) {
      const isActive = this.turn === p && !this.winLine && !this.locked;
      const maxR     = Math.min((this.topZone - 70) * 0.44, 48);
      const r        = isActive ? maxR : maxR * 0.56;
      const cx       = p === 0 ? W * 0.27 : W * 0.73;
      const bob      = isActive ? Math.sin(this.bounce) * 5 : 0;

      ctx.save();
      ctx.translate(cx, cy - bob);
      ctx.globalAlpha = isActive ? 1.0 : 0.30;

      if (isActive) {
        ctx.shadowColor = CONNECT_P_COLORS[p].to;
        ctx.shadowBlur  = 26;
      }

      const grad = ctx.createRadialGradient(0, -r * 0.15, 0, 0, 0, r);
      grad.addColorStop(0, CONNECT_P_COLORS[p].from);
      grad.addColorStop(1, CONNECT_P_COLORS[p].to);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font         = `${Math.round(r * 1.28)}px serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.emojis[p], 0, r * 0.06);
      ctx.restore();
    }

    // VS separator
    ctx.save();
    ctx.font         = `${Math.round(Math.min((this.topZone - 70) * 0.22, 20))}px 'Fredoka One', system-ui, sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = 'rgba(255,255,255,0.42)';
    ctx.fillText('VS', W / 2, cy);
    ctx.restore();
  }

  _drawDropArrows(ctx) {
    if (this.locked || this.falling || this.winLine) return;
    const { COLS, cellSize, gridX, gridY } = this;
    const color   = CONNECT_P_COLORS[this.turn];
    const arrowH  = Math.max(cellSize * 0.22, 10);
    const arrowW  = Math.max(cellSize * 0.22, 10);
    const baseY   = gridY - arrowH * 1.5;

    for (let c = 0; c < COLS; c++) {
      if (this.board[0][c] !== 0) continue;
      const cx = gridX + c * cellSize + cellSize / 2;

      ctx.save();
      ctx.globalAlpha = 0.58 + Math.sin(this.bounce * 1.6 + c * 0.45) * 0.16;
      ctx.fillStyle   = color.to;
      ctx.beginPath();
      ctx.moveTo(cx,           baseY + arrowH);
      ctx.lineTo(cx - arrowW,  baseY);
      ctx.lineTo(cx + arrowW,  baseY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  _drawGrid(ctx) {
    const { ROWS, COLS, cellSize, gridX, gridY, gridW, gridH } = this;
    const pad = 7;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.14)';
    ctx.shadowBlur  = 16;
    ctx.fillStyle   = 'rgba(255,255,255,0.16)';
    this._rrect(ctx, gridX - pad, gridY - pad, gridW + pad * 2, gridH + pad * 2, 16);
    ctx.fill();
    ctx.restore();

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cx = gridX + c * cellSize + cellSize / 2;
        const cy = gridY + r * cellSize + cellSize / 2;
        this._drawCell(ctx, cx, cy, this.board[r][c], r, c);
      }
    }
  }

  _drawCell(ctx, cx, cy, piece, row, col) {
    const r     = this.cellSize * 0.42;
    const isWin = this.winLine && this.winLine.some(([wr, wc]) => wr === row && wc === col);
    const wsc   = isWin ? (1 + Math.sin(this.winPulse * Math.PI * 2) * 0.14) : 1;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(wsc, wsc);

    if (piece === 0) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.20)';
      ctx.fill();
    } else {
      const p = piece - 1;
      if (isWin) {
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur  = 22;
      }
      const grad = ctx.createRadialGradient(0, -r * 0.15, 0, 0, 0, r);
      grad.addColorStop(0, CONNECT_P_COLORS[p].from);
      grad.addColorStop(1, CONNECT_P_COLORS[p].to);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      if (isWin) {
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth   = 3;
        ctx.stroke();
        ctx.shadowBlur  = 0;
      }
      ctx.font         = `${Math.round(r * 1.28)}px serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.emojis[p], 0, r * 0.06);
    }
    ctx.restore();
  }

  _drawPiece(ctx, cx, cy, playerIdx) {
    const r    = this.cellSize * 0.42;
    const grad = ctx.createRadialGradient(cx, cy - r * 0.15, 0, cx, cy, r);
    grad.addColorStop(0, CONNECT_P_COLORS[playerIdx].from);
    grad.addColorStop(1, CONNECT_P_COLORS[playerIdx].to);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.font         = `${Math.round(r * 1.28)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.emojis[playerIdx], cx, cy + r * 0.06);
    ctx.restore();
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

  _onTap(px, py) {
    if (this.locked || this.falling) return;
    if (px < this.gridX || px > this.gridX + this.gridW) return;
    const col = Math.floor((px - this.gridX) / this.cellSize);
    if (col < 0 || col >= this.COLS) return;
    this._dropInColumn(col);
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

  _dropInColumn(col) {
    let row = -1;
    for (let r = this.ROWS - 1; r >= 0; r--) {
      if (this.board[r][col] === 0) { row = r; break; }
    }
    if (row === -1) return;

    this.locked  = true;
    this.falling = {
      col, row,
      player: this.turn + 1,
      y:      this.gridY - this.cellSize * 0.15,
      vy:     0,
    };
    Sounds.sparkle();
  }

  /* ── win logic ──────────────────────────────────────────────────────────── */

  _checkWin(row, col, player) {
    const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (const [dr, dc] of dirs) {
      let line = [[row, col]];
      for (let d = 1; d <= 3; d++) {
        const r = row + dr * d, c = col + dc * d;
        if (r >= 0 && r < this.ROWS && c >= 0 && c < this.COLS && this.board[r][c] === player) line.push([r, c]);
        else break;
      }
      for (let d = 1; d <= 3; d++) {
        const r = row - dr * d, c = col - dc * d;
        if (r >= 0 && r < this.ROWS && c >= 0 && c < this.COLS && this.board[r][c] === player) line.push([r, c]);
        else break;
      }
      if (line.length >= 4) return line.slice(0, 4);
    }
    return null;
  }

  _checkDraw() {
    for (let c = 0; c < this.COLS; c++) {
      if (this.board[0][c] === 0) return false;
    }
    return true;
  }

  /* ── win ────────────────────────────────────────────────────────────────── */

  _win(player) {
    Sounds.fanfare();
    const cx = this.canvas.width / 2, cy = this.canvas.height / 2;
    for (let i = 0; i < 5; i++) {
      this.particles.push(...spawnBurst(
        cx + (Math.random() - 0.5) * this.canvas.width  * 0.7,
        cy + (Math.random() - 0.5) * this.canvas.height * 0.5,
        20,
      ));
    }
    this._showOverlay(this.emojis[player - 1], t('connect.win'));
  }

  _showOverlay(emoji, msg) {
    this.overlayEmoji.textContent = emoji;
    this.overlayMsg.textContent   = msg;

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
    if (!this.emojis[0]) return;
    this.badge.textContent = t('connect.turn', this.emojis[this.turn]);
  }

  _onResize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._calcLayout();
  }
}
