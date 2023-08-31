/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const selectInput = useRef<HTMLSelectElement>(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const goToSummonerPage = (summonerName: string) =>
    navigation(`/summoner/${selectInput.current?.value}/${summonerName}`, {
      replace: true,
    });

  async function getUserId(summonerRegion: string, summonerName: string) {
    const userData = await getSummonerByName(summonerRegion, summonerName);

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
        <select
          ref={selectInput}
          className="main-page__select"
          name="region"
          autoComplete="on"
        >
          <option value="ru" className="main-page__option">
            RU
          </option>
          <option value="eun1" className="main-page__option">
            EUN
          </option>
          <option value="euw1" className="main-page__option">
            EUW
          </option>
          <option value="jp1" className="main-page__option">
            JP
          </option>
          <option value="kr" className="main-page__option">
            KR
          </option>
          <option value="la1" className="main-page__option">
            LA
          </option>
          <option value="na1" className="main-page__option">
            NA
          </option>
          <option value="oc1" className="main-page__option">
            OC
          </option>
          <option value="tr1" className="main-page__option">
            TR
          </option>

          <option value="ph2" className="main-page__option">
            PH
          </option>
          <option value="sg2" className="main-page__option">
            SG
          </option>
          <option value="th2" className="main-page__option">
            TH
          </option>
          <option value="tw2" className="main-page__option">
            TW
          </option>
          <option value="vn2" className="main-page__option">
            VN
          </option>
          <option value="br1" className="main-page__option">
            BR
          </option>
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
          onClick={() => {
            getUserId(
              selectInput.current ? selectInput.current.value : "RU",
              searchInput.current
                ? searchInput.current.value
                : "Кирилл без секса",
            );
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default MainPage;
