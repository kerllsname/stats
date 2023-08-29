/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Store } from "../InterfacesAndTypes/Interfaces/StoreInterfaces";

import { InitialSummonerData } from "../InterfacesAndTypes/Interfaces/MainPageInterfaces";

import { getSummonerByName } from "../../Requests/requests";

import { addInitialData } from "../../Store/summonerDataSlice";

import "./summoner-page.css";

function SummonerPage() {
  const summonersData = useSelector(
    (state: Store) => state.summoners.summoners,
  );
  const dispatch = useDispatch();
  const [initialSummonerData, setInitialSummonerData] =
    useState<InitialSummonerData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const goToMainPage = () => {
    navigate("/", { replace: true });
  };

  const URIname = decodeURI(location.pathname.split("/")[2]);
  const GHURL =
    "https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/profileicon/";

  useEffect(() => {
    const getSummonerInitialData = async () => {
      const userData = await getSummonerByName(URIname);

      if (userData) {
        dispatch(addInitialData(userData));
        setInitialSummonerData(userData);
      }
    };

    for (let x = 1; x < summonersData.length; x += 1) {
      if (summonersData[x].initialSummonerData.name === URIname) {
        setInitialSummonerData(summonersData[x].initialSummonerData);

        return;
      }
    }

    if (!initialSummonerData) {
      getSummonerInitialData();
    }
  }, []);

  return (
    <div className="summoner-page__wrapper">
      <main>
        <div className="summoner-page__profile">
          <div className="summoner-page__profile-icon-block">
            <img
              className="summoner-page__profile-icon-image"
              src={
                initialSummonerData
                  ? `${GHURL}${initialSummonerData.profileIconId}.png`
                  : undefined
              }
              alt="profile icon"
            />
          </div>
          <div className="summoner-page__profile-info">
            <div className="summoner-page__nickname">
              {initialSummonerData ? initialSummonerData.name : "notFound"}
            </div>
          </div>
        </div>
        <button type="button" onClick={goToMainPage}>
          Home
        </button>
      </main>
    </div>
  );
}

export default SummonerPage;
