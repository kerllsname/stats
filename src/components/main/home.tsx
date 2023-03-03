import { useContext } from 'react';

import { ContextApp } from '../reducer/reducer';

import { Header } from '../header/header';

import './home.css';

const Home = () => {
  const { state } = useContext(ContextApp);

  console.log(state);

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
            {state ? state.playerStat.nickname : 'wait'}
          </div>
          <div className="main__clan">{state ? `[${state.clanTAG}]` : ''}</div>
          <div className="main__last-battle">
            {`last battle: ${
              state ? timeConverter(state.playerStat.last_battle_time) : 'wait'
            }`}
          </div>
          <div className="main__reg">{`registration: ${
            state ? timeConverter(state.playerStat.created_at) : 'wait'
          }`}</div>
        </div>
        <div className="main__first-row">
          <div className="main__main-info">
            <div className="main__battles">
              <div className="main__info-title">Battles</div>
              <div className="main__info-value">
                {state ? state.playerStat.statistics.all.battles : 'wait'}
              </div>
            </div>
            <div className="main__win-rate">
              <div className="main__info-title">Winrate</div>
              <div className="main__info-value">
                {state
                  ? Math.round(
                      ((state.playerStat.statistics.all.wins * 100) /
                        state.playerStat.statistics.all.battles) *
                        100
                    ) / 100
                  : 'wait'}
                %
              </div>
            </div>
            <div className="main__rating">
              <div className="main__info-title">Rating</div>
              <div className="main__info-value">
                {state ? state.playerStat.global_rating : 'wait'}
              </div>
            </div>
            <div className="main__av-damage">
              <div className="main__info-title">Av. Damage</div>
              <div className="main__info-value">
                {state
                  ? Math.round(
                      state.playerStat.statistics.all.damage_dealt /
                        state.playerStat.statistics.all.battles
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
