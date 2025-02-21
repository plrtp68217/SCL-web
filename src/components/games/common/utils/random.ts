export function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomItem = array[randomIndex];
  return randomItem;
}

export function isChance(p: number) {
  if (Math.random() >= p) {
    return true;
  }
  return false;
}