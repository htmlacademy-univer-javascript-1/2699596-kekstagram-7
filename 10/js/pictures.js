const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures, onPictureClick) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const {url, description, likes, comments} = picture;
    const pictureElement = pictureTemplate.cloneNode(true);
    const image = pictureElement.querySelector('.picture__img');

    image.src = url;
    image.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', (event) => {
      event.preventDefault();
      onPictureClick(picture);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export {renderPictures};
