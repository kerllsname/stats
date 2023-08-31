import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Store } from "../InterfacesAndTypes/Interfaces/StoreInterfaces";

import { InitialSummonerData } from "../InterfacesAndTypes/Interfaces/MainPageInterfaces";

import { getSummonerByName, getTopChampion } from "../../Requests/requests";

import { addInitialData } from "../../Store/summonerDataSlice";

import "./summoner-page.css";

function SummonerPage() {
  const summonersData = useSelector(
    (state: Store) => state.summoners.summoners,
  );
  const dispatch = useDispatch();
  const [initialSummonerData, setInitialSummonerData] =
    useState<InitialSummonerData | null>(null);
  const [backgroundChampion, setbackgroundChampion] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();

  const goToMainPage = () => {
    navigate("/", { replace: true });
  };

  const URIname = decodeURI(location.pathname.split("/")[3]);
  const URIregion = location.pathname.split("/")[2];
  const GHURL =
    "https://ddragon.leagueoflegends.com/cdn/13.17.1/img/profileicon/";
  let tempInitialData: InitialSummonerData;

  useEffect(() => {
    const getSummonerInitialData = async () => {
      const userData = await getSummonerByName(URIregion, URIname);

      if (userData) {
        tempInitialData = userData;
        dispatch(addInitialData(userData));
        setInitialSummonerData(userData);
      }
    };

    const getAllData = async () => {
      const champion = await getTopChampion(
        tempInitialData ? tempInitialData.id : "",
      );

      setbackgroundChampion(champion);
    };

    for (let x = 1; x < summonersData.length; x += 1) {
      if (summonersData[x].initialSummonerData.name === URIname) {
        tempInitialData = summonersData[x].initialSummonerData;
        setInitialSummonerData(summonersData[x].initialSummonerData);
      }
    }

    if (!tempInitialData) {
      getSummonerInitialData();
    }

    getAllData();
  }, []);

  return (
    <>
      {backgroundChampion ? (
        <div
          className="summoner-page__wrapper"
          style={{
            background: `linear-gradient(91deg, rgba(38,30,53,1) 20%, rgba(43,41,90,0) 100%), url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${backgroundChampion}_0.jpg') no-repeat`,
          }}
        >
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
      ) : (
        <div>loading</div>
      )}
      <div />
    </>
  );
}

export default SummonerPage;
