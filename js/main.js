/* eslint-disable no-unused-vars */
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function createIdGenerator(count) {
  const ids = Array.from({length: count}, (_, index) => index + 1);

  for (let i = ids.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }

  let currentIndex = 0;

  return function () {
    const id = ids[currentIndex];
    currentIndex++;
    return id;
  };
}

const DESCRIPTIONS = [
  'Как прошли выходные?',
  'Отличный вечер в компании друзей',
  'Немного красоты в ленту',
  'Сегодня прекрасная погода',
  'Новый день — новые возможности',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Ольга',
  'Сергей',
  'Екатерина',
];

const generateCommentId = createIdGenerator(1000);
const generatePhotoId = createIdGenerator(25);

function generateComment() {
  const messagesCount = getRandomInteger(1, 2);
  let message = getRandomArrayElement(COMMENT_MESSAGES);

  for (let i = 1; i < messagesCount; i++) {
    message += ` ${getRandomArrayElement(COMMENT_MESSAGES)}`;
  }

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message,
    name: getRandomArrayElement(COMMENT_NAMES),
  };
}

function generateComments(count) {
  return Array.from({length: count}, generateComment);
}

function generatePhoto() {
  const photoNumber = generatePhotoId();

  return {
    id: photoNumber,
    url: `photos/${photoNumber}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: generateComments(getRandomInteger(0, 30)),
  };
}

const photos = Array.from({length: 25}, generatePhoto);
