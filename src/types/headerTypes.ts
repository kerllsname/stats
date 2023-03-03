import { PlayerStatistic } from './homeTypes';

export enum UpdateActionKind {
  UPDATE = 'UPDATE',
}

export interface UpdateAction {
  type: UpdateActionKind;
  payload: PlayerStatState;
}

export interface PlayerStatState {
  playerStat: PlayerStatistic;
  clanTAG: string;
}
