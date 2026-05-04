const Sounds = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function pop() {
    try {
      const ac = getCtx();
      const t = ac.currentTime;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.13);
      gain.gain.setValueAtTime(0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
      osc.start(t);
      osc.stop(t + 0.14);
    } catch (_) {}
  }

  function sparkle() {
    try {
      const ac = getCtx();
      const t = ac.currentTime;
      [523, 659, 784, 1047].forEach((freq, i) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const st = t + i * 0.045;
        gain.gain.setValueAtTime(0, st);
        gain.gain.linearRampToValueAtTime(0.1, st + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.28);
        osc.start(st);
        osc.stop(st + 0.3);
      });
    } catch (_) {}
  }

  function fanfare() {
    try {
      const ac = getCtx();
      const t = ac.currentTime;
      [523, 659, 784, 1047, 1319].forEach((freq, i) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const st = t + i * 0.1;
        gain.gain.setValueAtTime(0, st);
        gain.gain.linearRampToValueAtTime(0.2, st + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.4);
        osc.start(st);
        osc.stop(st + 0.42);
      });
    } catch (_) {}
  }

  function softPop() {
    try {
      const ac = getCtx();
      const t = ac.currentTime;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.09);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.start(t);
      osc.stop(t + 0.1);
    } catch (_) {}
  }

  function grow(freq) {
    try {
      const ac = getCtx();
      const t = ac.currentTime;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch (_) {}
  }

  function boom() {
    try {
      const ac = getCtx();
      const t = ac.currentTime;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(28, t + 0.55);
      gain.gain.setValueAtTime(0.75, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
      osc.start(t);
      osc.stop(t + 0.57);
    } catch (_) {}
  }

  return { pop, sparkle, fanfare, softPop, grow, boom };
})();
