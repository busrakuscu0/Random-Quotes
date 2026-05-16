export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getUniqueRandomNumber(currentIndex, length) {
  const nextIndex = getRandomNumber(0, length);

  if (nextIndex === currentIndex) {
    return getUniqueRandomNumber(currentIndex, length);
  }
  return nextIndex;
}
