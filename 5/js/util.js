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

export {getRandomInteger, getRandomArrayElement, createIdGenerator};
