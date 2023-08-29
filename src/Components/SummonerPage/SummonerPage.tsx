/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Store } from "../InterfacesAndTypes/Interfaces/StoreInterfaces";

import { InitialSummonerData } from "../InterfacesAndTypes/Interfaces/MainPageInterfaces";

function SummonerPage() {
  const summonersData = useSelector(
    (state: Store) => state.summoners.summoners,
  );
  const [initialSummonerData, setInitialSummonerData] =
    useState<InitialSummonerData>();
  const navigate = useNavigate();
  const location = useLocation();

  const goToMainPage = () => {
    navigate("/", { replace: true });
  };

  const URIname = decodeURI(location.pathname.split("/")[2]);

  useEffect(() => {
    for (let x = 1; x < summonersData.length; x += 1) {
      if (summonersData[x].initialSummonerData.name === URIname)
        setInitialSummonerData(summonersData[x].initialSummonerData);
    }
  }, []);

  return (
    <div className="summoner-page__wrapper">
      <div>{initialSummonerData ? initialSummonerData.name : "notFound"}</div>
      <button type="button" onClick={goToMainPage}>
        Home
      </button>
    </div>
  );
}

export default SummonerPage;
