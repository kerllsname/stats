import { useContext, useRef } from 'react';

import { ContextApp } from '../reducer/reducer';

import { UpdateActionKind } from '../../types/headerTypes';

import {
  clanRequest,
  IDRequest,
  playerRequest,
} from '../../requests/homeRequests';

import './header.css';

const Header = () => {
  const playerNickname = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useContext(ContextApp);

  async function getPlayerId() {
    let playerID;
    let playerData;
    let clanID;
    let clanTag;
    let errorIDMessage;
    let errorPlayerDataMessage;
    let errorClanMessage;

    try {
      if (playerNickname.current) {
        const IDRequestData = await IDRequest(playerNickname.current.value);

        playerID = IDRequestData.data[0].account_id;
      }
    } catch (e) {
      errorIDMessage = (e as DOMException).message;

      console.log(errorIDMessage);
    }

    if (playerID) {
      try {
        const playerRequestData = await playerRequest(playerID);

        playerData = playerRequestData;
        clanID = playerRequestData.data[playerID].clan_id;
      } catch (e) {
        errorPlayerDataMessage = (e as DOMException).message;

        console.log(errorPlayerDataMessage);
      }
    }

    if (clanID) {
      try {
        const clanRequestData = await clanRequest(clanID);

        clanTag = clanRequestData.data[clanID].clan_tag;
      } catch (e) {
        errorClanMessage = (e as DOMException).message;

        console.log(errorClanMessage);
      }
    }

    if (playerID && playerData) {
      dispatch({
        type: UpdateActionKind.UPDATE,
        payload: {
          playerStat: playerData.data[playerID],
          clanTAG: clanTag ? clanTag : '',
        },
      });
      console.log(state);
    }
  }

  return (
    <header>
      <input type="search" placeholder="Search" ref={playerNickname} />
      <button onClick={getPlayerId}>Search</button>
    </header>
  );
};

export { Header };
