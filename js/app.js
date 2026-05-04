let popGame      = null;
let revealGame   = null;
let growGame     = null;
let rainGame     = null;
let stickersGame = null;
let memoryGame   = null;
let current      = 'menu';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`screen-${id}`).classList.add('active');
  current = id;
  const paused = id !== 'menu' ? 'paused' : '';
  document.querySelectorAll('.floatie').forEach(f => f.style.animationPlayState = paused);
}

function startGame(name) {
  if (name === 'pop') {
    showScreen('pop');
    if (!popGame) {
      popGame = new PopGame(
        document.getElementById('canvas-pop'),
        document.getElementById('pop-round-badge'),
        document.getElementById('pop-overlay'),
      );
    }
    popGame.start();
  } else if (name === 'reveal') {
    showScreen('reveal');
    if (!revealGame) {
      revealGame = new RevealGame(
        document.getElementById('canvas-reveal'),
        document.getElementById('reveal-hint'),
      );
    }
    revealGame.start();
  } else if (name === 'grow') {
    showScreen('grow');
    if (!growGame) growGame = new GrowGame(document.getElementById('canvas-grow'));
    growGame.start();
  } else if (name === 'rain') {
    showScreen('rain');
    if (!rainGame) rainGame = new RainGame(document.getElementById('canvas-rain'));
    rainGame.start();
  } else if (name === 'stickers') {
    showScreen('stickers');
    if (!stickersGame) {
      stickersGame = new StickersGame(
        document.getElementById('canvas-stickers'),
        document.getElementById('stickers-badge'),
        document.getElementById('stickers-overlay'),
        document.getElementById('stickers-hint'),
      );
    }
    stickersGame.start();
  } else if (name === 'memory') {
    showScreen('memory');
    if (!memoryGame) {
      memoryGame = new MemoryGame(
        document.getElementById('canvas-memory'),
        document.getElementById('memory-badge'),
        document.getElementById('memory-win-overlay'),
      );
    }
    memoryGame.start();
  }
}

function goHome() {
  if (current === 'pop'    && popGame)    popGame.stop();
  if (current === 'reveal' && revealGame) revealGame.stop();
  if (current === 'grow'     && growGame)     growGame.stop();
  if (current === 'rain'     && rainGame)     rainGame.stop();
  if (current === 'stickers' && stickersGame) stickersGame.stop();
  if (current === 'memory'   && memoryGame)   memoryGame.stop();
  showScreen('menu');
}

const gate = new ParentGate(
  document.getElementById('parent-gate-overlay'),
  () => showScreen('privacy'),
);

document.getElementById('privacy-link').addEventListener('click', () => gate.show());
document.getElementById('privacy-back').addEventListener('click', goHome);

document.getElementById('btn-pop').addEventListener('click',      () => startGame('pop'));
document.getElementById('btn-reveal').addEventListener('click',   () => startGame('reveal'));
document.getElementById('btn-grow').addEventListener('click',     () => startGame('grow'));
document.getElementById('btn-rain').addEventListener('click',     () => startGame('rain'));
document.getElementById('btn-stickers').addEventListener('click', () => startGame('stickers'));
document.getElementById('btn-memory').addEventListener('click',   () => startGame('memory'));
document.getElementById('pop-back').addEventListener('click',      goHome);
document.getElementById('reveal-back').addEventListener('click',   goHome);
document.getElementById('grow-back').addEventListener('click',     goHome);
document.getElementById('rain-back').addEventListener('click',     goHome);
document.getElementById('stickers-back').addEventListener('click', goHome);
document.getElementById('memory-back').addEventListener('click',   goHome);

/* request full-screen on first tap (works on Android Chrome) */
document.addEventListener('click', function _fs() {
  const el = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen;
  if (req) req.call(el).catch(() => {});
  document.removeEventListener('click', _fs);
}, { once: true });

/* register service worker */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.update(); // check for new SW on every page load, bypasses HTTP cache
    }).catch(() => {});
  });
  /* when a new SW takes control, show a toast then reload */
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    const toast = document.getElementById('update-toast');
    if (toast) {
      toast.classList.add('visible');
      setTimeout(() => window.location.reload(), 1600);
    } else {
      window.location.reload();
    }
  });
}
