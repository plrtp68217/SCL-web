export function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomItem = array[randomIndex];
  return randomItem;
}