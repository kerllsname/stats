import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './main-page.css';

import getSummonerByName from '../../Requests/requests';

function MainPage() {
  const searchInput = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  const goToSummonerPage = (summonerName: string) => navigation(`/summoner/${summonerName}`, { replace: true });

  async function getUserId(summonerName: string) {
    const userData = await getSummonerByName(summonerName);

    if (userData) goToSummonerPage(summonerName);
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
