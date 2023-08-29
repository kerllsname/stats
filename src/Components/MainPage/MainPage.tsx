import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./main-page.css";

import { addInitialData } from "../../Store/summonerDataSlice";
import { getSummonerByName } from "../../Requests/requests";
import { Store } from "../InterfacesAndTypes/Interfaces/StoreInterfaces";

function MainPage() {
  const summonersData = useSelector(
    (state: Store) => state.summoners.summoners,
  );
  const searchInput = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const goToSummonerPage = (summonerName: string) =>
    navigation(`/summoner/${summonerName}`, {
      replace: true,
    });

  async function getUserId(summonerName: string) {
    const userData = await getSummonerByName(summonerName);

    if (userData) {
      for (let x = 1; x < summonersData.length; x += 1) {
        if (summonersData[x].initialSummonerData.name === summonerName) {
          goToSummonerPage(summonerName);

          return;
        }
      }

      dispatch(addInitialData(userData));
      goToSummonerPage(summonerName);
    }
  }

  return (
    <div className="main-page-wrapper">
      <div className="main-page__searchbox">
        <select className="main-page__select" name="region" autoComplete="on">
          <option className="main-page__option">RU</option>
          <option className="main-page__option">EUW</option>
        </select>
        <input
          className="main-page__input"
          name="search"
          type="search"
          autoComplete="on"
          ref={searchInput}
        />
        <button
          className="main-page__button"
          type="button"
          onClick={() =>
            getUserId(
              searchInput.current
                ? searchInput.current.value
                : "Кирилл без секса",
            )
          }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default MainPage;
