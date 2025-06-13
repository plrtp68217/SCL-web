export interface Record {
  userId: number,
  gameId: string,
  score: number,
}

export interface CreateRecordDto {
  userId: number,
  gameId: string,
}

export interface UpdateRecordDto {
  userId: number,
  gameId: string,
  score: number,
}
