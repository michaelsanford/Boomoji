class ParentGate {
  constructor(overlayEl, onSuccess, onCancel) {
    this._overlay   = overlayEl;
    this._onSuccess = onSuccess;
    this._onCancel  = onCancel || null;
    this._a = 0;
    this._b = 0;
    this._question  = overlayEl.querySelector('.gate-question');
    this._input     = overlayEl.querySelector('.gate-input');

    overlayEl.querySelector('.gate-confirm').addEventListener('click', () => this._check());
    overlayEl.querySelector('.gate-cancel').addEventListener('click',  () => this._cancel());
    this._input.addEventListener('keydown', e => { if (e.key === 'Enter') this._check(); });

    /* prevent tapping backdrop from dismissing */
    overlayEl.querySelector('.parent-gate-card').addEventListener('click', e => e.stopPropagation());
  }

  show() {
    this._newQuestion();
    this._overlay.classList.add('visible');
    /* delay focus so the open animation doesn't fight the keyboard */
    setTimeout(() => this._input.focus(), 350);
  }

  hide() {
    this._overlay.classList.remove('visible');
    this._input.blur();
  }

  _newQuestion() {
    /* both operands 4–9 so sum is always ≥ 8 and never guessable at a glance */
    this._a = 4 + Math.floor(Math.random() * 6);
    this._b = 4 + Math.floor(Math.random() * 6);
    this._question.textContent = `${this._a} + ${this._b} = ?`;
    this._input.value = '';
    this._input.classList.remove('shake');
  }

  _check() {
    const answer = parseInt(this._input.value, 10);
    if (answer === this._a + this._b) {
      this.hide();
      this._onSuccess();
    } else {
      /* force reflow so the animation restarts cleanly */
      this._input.classList.remove('shake');
      void this._input.offsetWidth;
      this._input.classList.add('shake');
      /* generate a fresh question after the shake */
      setTimeout(() => this._newQuestion(), 420);
    }
  }

  _cancel() {
    this.hide();
    if (this._onCancel) this._onCancel();
  }
}
