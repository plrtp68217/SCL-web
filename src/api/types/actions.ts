export interface ISummary {
  entrysCount: number | string;
  actionsCount: number | string;
}

export interface ISummaryInterval {
  entrysCountInterval: number | string;
  actionsCountInterval: number | string;
}

export interface IGameActivity {
  gameActivity: number | string;
}

export interface IGameActivityInterval {
  gameActivityInterval: number | string;
}

export interface CreateActionDto {
  name: string,
  action: string,
}

export interface Action {
  name: string;
  action: string;
  date: Date;
}