interface User {
  name: string
}

export interface BestRecord {
  id: number,
  userId: number,
  score: number,
  user: User
}

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
