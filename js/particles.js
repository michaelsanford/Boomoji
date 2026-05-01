const EMOJIS = [
  '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
  '🦁','🐮','🐷','🐸','🐙','🦋','🐬','🦄','🐲','🌈',
  '⭐','🌟','💫','🎈','🎉','🍭','🍦','🍓','🍕','🚀',
  '🌺','🌸','💖','🦀','🐠','🦜','🐡','🌻','🎀','🍉',
  '🍊','🍋','🍇','🍒','🥝','🦓','🐘','🦒','🌵','🎠',
];

const BURST_COLORS = [
  '#FF6B9D','#FFE66D','#4ECDC4','#A8E6CF',
  '#FF8B94','#C77DFF','#FF9F43','#54A0FF',
  '#5F27CD','#FFEAA7','#00CEC9','#FD79A8',
];

class Particle {
  constructor(x, y, vx, vy, color, life, size, shape) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.size = size;
    this.shape = shape || 'circle';
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.25;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.14;
    this.vx *= 0.985;
    this.vy *= 0.985;
    this.life -= 1;
    this.rotation += this.rotSpeed;
  }

  draw(ctx) {
    const t = Math.max(0, this.life / this.maxLife);
    const sz = this.size * (0.3 + 0.7 * t);
    ctx.save();
    ctx.globalAlpha = t;
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    switch (this.shape) {
      case 'square':
        ctx.fillRect(-sz / 2, -sz / 2, sz, sz);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -sz);
        ctx.lineTo(sz * 0.87, sz * 0.5);
        ctx.lineTo(-sz * 0.87, sz * 0.5);
        ctx.closePath();
        ctx.fill();
        break;
      case 'star':
        _starPath(ctx, 0, 0, sz * 0.45, sz, 5);
        ctx.fill();
        break;
      default:
        ctx.beginPath();
        ctx.arc(0, 0, sz, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
  }
}

function _starPath(ctx, cx, cy, r, R, pts) {
  ctx.beginPath();
  for (let i = 0; i < pts * 2; i++) {
    const a = (Math.PI * i) / pts - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    if (i === 0) ctx.moveTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a));
    else         ctx.lineTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a));
  }
  ctx.closePath();
}

const SHAPES = ['circle', 'circle', 'square', 'triangle', 'star'];

function spawnBurst(x, y, count, spread) {
  count  = count  || 28;
  spread = spread || 1;
  const list = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
    const speed = (3 + Math.random() * 7) * spread;
    list.push(new Particle(
      x, y,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed - 1.5,
      BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      38 + Math.random() * 22,
      4 + Math.random() * 7,
      SHAPES[Math.floor(Math.random() * SHAPES.length)],
    ));
  }
  return list;
}
