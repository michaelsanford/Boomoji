let popGame    = null;
let revealGame = null;
let current    = 'menu';

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
  } else {
    showScreen('reveal');
    if (!revealGame) {
      revealGame = new RevealGame(
        document.getElementById('canvas-reveal'),
        document.getElementById('reveal-hint'),
      );
    }
    revealGame.start();
  }
}

function goHome() {
  if (current === 'pop'    && popGame)    popGame.stop();
  if (current === 'reveal' && revealGame) revealGame.stop();
  showScreen('menu');
}

document.getElementById('btn-pop').addEventListener('click',    () => startGame('pop'));
document.getElementById('btn-reveal').addEventListener('click', () => startGame('reveal'));
document.getElementById('pop-back').addEventListener('click',    goHome);
document.getElementById('reveal-back').addEventListener('click', goHome);

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
