/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  PlayerStatState,
  UpdateAction,
  UpdateActionKind,
} from '../../types/headerTypes';

export const initialState: PlayerStatState = {
  playerStat: {
    account_id: 0,
    clan_id: 0,
    created_at: 0,
    global_rating: 0,
    last_battle_time: 0,
    nickname: '',
    statistics: {
      all: {
        battles: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        damage_dealt: 0,
      },
    },
  },
  clanTAG: '',
};

export function playerStatReducer(
  state: PlayerStatState,
  action: UpdateAction
) {
  const { type, payload } = action;
  switch (type) {
    case UpdateActionKind.UPDATE:
      return {
        playerStat: payload.playerStat,
        clanTAG: payload.clanTAG,
      };
    default:
      return state;
  }
}

export const ContextApp = React.createContext({
  dispatch: (action: {
    type: UpdateActionKind;
    payload: PlayerStatState;
  }) => {},
  state: initialState,
});
