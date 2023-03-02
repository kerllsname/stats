import { useEffect, useState } from 'react';

import { Header } from '../header/header';

import './home.css';

import { PlayerStatistic } from '../../types/homeTypes';
import {
  clanRequest,
  IDRequest,
  playerRequest,
} from '../../requests/homeRequests';

const Home = () => {
  const [playerStatData, updatePlayerStatData] = useState<PlayerStatistic>();
  const [playerClanData, updateClanData] = useState<string>();

  useEffect(() => {
    async function getPlayerId() {
      let playerID;
      let playerData;
      let clanID;
      let clanTag;
      let errorIDMessage;
      let errorPlayerDataMessage;
      let errorClanMessage;

      try {
        const IDRequestData = await IDRequest();

        playerID = IDRequestData.data[0].account_id;
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
        updatePlayerStatData(playerData.data[playerID]);
      }

      if (clanTag) {
        updateClanData(clanTag);
      }
    }

    getPlayerId();
  }, []);

  const timeConverter = (time: number) => {
    const date = new Date(time * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day}.${month}.${year}`;
  };

  return (
    <div className="home">
      <Header />
      <main>
        <div className="main__title">
          <div className="main__nickname">
            {playerStatData ? playerStatData.nickname : 'wait'}
          </div>
          <div className="main__clan">
            {playerClanData ? `[${playerClanData}]` : ''}
          </div>
          <div className="main__last-battle">
            {`last battle: ${
              playerStatData
                ? timeConverter(playerStatData.last_battle_time)
                : 'wait'
            }`}
          </div>
          <div className="main__reg">{`registration: ${
            playerStatData ? timeConverter(playerStatData.created_at) : 'wait'
          }`}</div>
        </div>
        <div className="main__first-row">
          <div className="main__main-info">
            <div className="main__battles">
              <div className="main__info-title">Battles</div>
              <div className="main__info-value">
                {playerStatData
                  ? playerStatData.statistics.all.battles
                  : 'wait'}
              </div>
            </div>
            <div className="main__win-rate">
              <div className="main__info-title">Winrate</div>
              <div className="main__info-value">
                {playerStatData
                  ? Math.round(
                      ((playerStatData.statistics.all.wins * 100) /
                        playerStatData.statistics.all.battles) *
                        100
                    ) / 100
                  : 'wait'}
                %
              </div>
            </div>
            <div className="main__rating">
              <div className="main__info-title">Rating</div>
              <div className="main__info-value">
                {playerStatData ? playerStatData.global_rating : 'wait'}
              </div>
            </div>
            <div className="main__av-damage">
              <div className="main__info-title">Av. Damage</div>
              <div className="main__info-value">
                {playerStatData
                  ? Math.round(
                      playerStatData.statistics.all.damage_dealt /
                        playerStatData.statistics.all.battles
                    )
                  : 'wait'}
              </div>
            </div>
          </div>
          <div className="main__record-info"></div>
        </div>
      </main>
    </div>
  );
};

export { Home };
