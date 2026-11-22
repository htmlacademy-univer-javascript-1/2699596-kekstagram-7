const overlay = document.querySelector('.big-picture');
const image = overlay.querySelector('.big-picture__img img');
const caption = overlay.querySelector('.social__caption');
const likesCount = overlay.querySelector('.likes-count');
const commentsCount = overlay.querySelector('.comments-count');
const commentsList = overlay.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const closeButton = overlay.querySelector('.big-picture__cancel');

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  const picture = comment.querySelector('.social__picture');

  picture.src = avatar;
  picture.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const closePicture = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscape);
};

function onEscape(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closePicture();
  }
}

const openPicture = ({url, description, likes, comments}) => {
  image.src = url;
  image.alt = description;
  caption.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  commentsList.replaceChildren(...comments.map(createComment));
  overlay.querySelector('.social__comment-count').classList.add('hidden');
  overlay.querySelector('.comments-loader').classList.add('hidden');

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscape);
};

closeButton.addEventListener('click', closePicture);

export {openPicture};
