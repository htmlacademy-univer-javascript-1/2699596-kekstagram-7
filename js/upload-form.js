const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const pristine = new window.Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getTags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

pristine.addValidator(hashtags, (value) => getTags(value).every((tag) => /^#[\p{L}\p{N}]{1,19}$/u.test(tag)), 'Хэштег должен начинаться с # и содержать от 1 до 19 букв или цифр');
pristine.addValidator(hashtags, (value) => getTags(value).length <= 5, 'Можно указать не больше пяти хэштегов');
pristine.addValidator(hashtags, (value) => new Set(getTags(value)).size === getTags(value).length, 'Хэштеги не должны повторяться');
pristine.addValidator(description, (value) => value.length <= 140, 'Комментарий должен содержать не больше 140 символов');

const closeEditor = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscape);
};

function onEscape(event) {
  if (event.key === 'Escape' && event.target !== hashtags && event.target !== description) {
    event.preventDefault();
    closeEditor();
  }
}

fileInput.addEventListener('change', () => {
  if (fileInput.files.length) {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscape);
  }
});

form.querySelector('.img-upload__cancel').addEventListener('click', (event) => {
  event.preventDefault();
  closeEditor();
});

form.addEventListener('submit', (event) => {
  if (!pristine.validate()) {
    event.preventDefault();
  }
});
