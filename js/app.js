let popGame      = null;
let revealGame   = null;
let growGame     = null;
let rainGame     = null;
let stickersGame = null;
let current      = 'menu';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`screen-${id}`).classList.add('active');
  current = id;
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
  }
}

function goHome() {
  if (current === 'pop'    && popGame)    popGame.stop();
  if (current === 'reveal' && revealGame) revealGame.stop();
  if (current === 'grow'     && growGame)     growGame.stop();
  if (current === 'rain'     && rainGame)     rainGame.stop();
  if (current === 'stickers' && stickersGame) stickersGame.stop();
  showScreen('menu');
}

document.getElementById('btn-pop').addEventListener('click',      () => startGame('pop'));
document.getElementById('btn-reveal').addEventListener('click',   () => startGame('reveal'));
document.getElementById('btn-grow').addEventListener('click',     () => startGame('grow'));
document.getElementById('btn-rain').addEventListener('click',     () => startGame('rain'));
document.getElementById('btn-stickers').addEventListener('click', () => startGame('stickers'));
document.getElementById('pop-back').addEventListener('click',      goHome);
document.getElementById('reveal-back').addEventListener('click',   goHome);
document.getElementById('grow-back').addEventListener('click',     goHome);
document.getElementById('rain-back').addEventListener('click',     goHome);
document.getElementById('stickers-back').addEventListener('click', goHome);

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
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
