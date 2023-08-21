import React, { useRef } from 'react';

import ky from 'ky';

import './main-page.css';

function MainPage() {
  const searchInput = useRef<HTMLInputElement>(null);

  async function getUserId(summonerName: string) {
    const userData = await ky.get(`https://ru.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-96fe0e84-2372-4300-90b7-0200083eaf99`).json();

    console.log(userData);
  }

  return (
    <div className="main-page-wrapper">
      <div className="main-page__searchbox">
        <select className="main-page__select">
          <option className="main-page__option">RU</option>
          <option className="main-page__option">EUW</option>
        </select>
        <input className="main-page__input" type="search" ref={searchInput} />
        <button className="main-page__button" type="button" onClick={() => getUserId(searchInput.current ? searchInput.current.value : 'Кирилл без секса')}>
          Search
        </button>
      </div>
    </div>
  );
}

export default MainPage;
