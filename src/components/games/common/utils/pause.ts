export function setPause(gameLoopID: number): void {
  clearInterval(gameLoopID);
}

export function unsetPause(gameLoop: Function, interval: number): number {
  return setInterval(gameLoop, interval);
}