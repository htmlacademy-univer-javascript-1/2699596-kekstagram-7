const COMMENTS_PER_PAGE = 5;

const overlay = document.querySelector('.big-picture');
const image = overlay.querySelector('.big-picture__img img');
const caption = overlay.querySelector('.social__caption');
const likesCount = overlay.querySelector('.likes-count');
const commentCount = overlay.querySelector('.social__comment-count');
const commentsLoader = overlay.querySelector('.comments-loader');
const commentsList = overlay.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const closeButton = overlay.querySelector('.big-picture__cancel');

let allComments = [];
let shownComments = 0;

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  const picture = comment.querySelector('.social__picture');

  picture.src = avatar;
  picture.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const showMoreComments = () => {
  const nextComments = allComments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);
  commentsList.append(...nextComments.map(createComment));
  shownComments += nextComments.length;
  commentCount.textContent = `${shownComments} из ${allComments.length} комментариев`;
  commentsLoader.classList.toggle('hidden', shownComments === allComments.length);
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
  allComments = comments;
  shownComments = 0;
  commentsList.replaceChildren();
  commentCount.classList.remove('hidden');
  showMoreComments();

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscape);
};

closeButton.addEventListener('click', closePicture);
commentsLoader.addEventListener('click', showMoreComments);

export {openPicture};
