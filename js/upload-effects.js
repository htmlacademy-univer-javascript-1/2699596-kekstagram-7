const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const effects = {
  chrome: {filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: {filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: {filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
};

const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.img-upload__preview img');
const scaleInput = form.querySelector('.scale__control--value');
const level = form.querySelector('.img-upload__effect-level');
const levelInput = level.querySelector('.effect-level__value');
const slider = level.querySelector('.effect-level__slider');
const effectList = form.querySelector('.img-upload__effects');
let scale = MAX_SCALE;
let effect;

const setScale = (next) => {
  scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
  scaleInput.value = `${scale}%`;
  preview.style.transform = `scale(${scale / MAX_SCALE})`;
};

window.noUiSlider.create(slider, {
  range: {min: 0, max: 1},
  start: 1,
  step: 0.1,
  connect: 'lower',
});

slider.noUiSlider.on('update', (values, handle, unencoded) => {
  if (effect) {
    const value = unencoded[handle];
    levelInput.value = value;
    preview.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
});

const setEffect = (name) => {
  effect = effects[name];
  level.classList.toggle('hidden', !effect);

  if (effect) {
    const {min, max, step} = effect;
    slider.noUiSlider.updateOptions({range: {min, max}, step, start: max});
  } else {
    levelInput.value = '';
    preview.style.filter = '';
  }
};

form.querySelector('.scale__control--smaller').addEventListener('click', () => setScale(scale - SCALE_STEP));
form.querySelector('.scale__control--bigger').addEventListener('click', () => setScale(scale + SCALE_STEP));
effectList.addEventListener('change', (event) => setEffect(event.target.value));

const resetEffects = () => {
  setScale(MAX_SCALE);
  setEffect('none');
};

form.addEventListener('reset', resetEffects);
resetEffects();
