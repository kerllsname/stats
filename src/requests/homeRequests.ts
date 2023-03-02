import ky from 'ky';

import { APPID } from './APPID';

import { ClanDataType, IDDataType, PlayerDataType } from '../types/homeTypes';

export const IDRequest = (): Promise<IDDataType> =>
  ky
    .get(
      `https://api.worldoftanks.eu/wot/account/list/?application_id=${APPID}&search=kiruksha`
    )
    .json();

export const playerRequest = (playerID: number): Promise<PlayerDataType> =>
  ky
    .get(
      `https://api.worldoftanks.eu/wot/account/info/?application_id=${APPID}&account_id=${playerID}`
    )
    .json();

export const clanRequest = (clanID: number): Promise<ClanDataType> =>
  ky
    .get(
      `https://api.worldoftanks.eu/wot/clanratings/clans/?application_id=${APPID}&clan_id=${clanID}`
    )
    .json();
