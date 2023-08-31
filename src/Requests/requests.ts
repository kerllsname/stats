/* eslint-disable @typescript-eslint/no-unused-vars */
import ky from "ky";

import { InitialSummonerData } from "../Components/InterfacesAndTypes/Interfaces/MainPageInterfaces";

import API_KEY from "./API_KEY";
import {
  ChampionsDD,
  ListOfChampionsDD,
  TopChampion,
} from "../Components/InterfacesAndTypes/Interfaces/SummonerPageInterfaces";

const regions = [
  "br1.api.riotgames.com",
  "eun1.api.riotgames.com",
  "euw1.api.riotgames.com",
  "jp1.api.riotgames.com",
  "kr.api.riotgames.com",
  "la1.api.riotgames.com",
  "na1.api.riotgames.com",
  "oc1.api.riotgames.com",
  "tr1.api.riotgames.com",
  "ru.api.riotgames.com",
  "ph2.api.riotgames.com",
  "sg2.api.riotgames.com",
  "th2.api.riotgames.com",
  "tw2.api.riotgames.com",
];

let championsJson = {};
let championName: string;

function setRegion(regionInput: string) {
  for (let x = 0; x < regions.length; x += 1) {
    if (regions[x].includes(regionInput)) return regions[x];
  }

  return null;
}

export async function getSummonerByName(
  regionInput: string,
  summonerName: string,
): Promise<null | InitialSummonerData> {
  const region = setRegion(regionInput);

  const response = await ky.get(
    `https://${region}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`,
  );

  if (response.status === 200) {
    const answer: InitialSummonerData = await response.json();

    return answer;
  }

  return null;
}

async function getLatestDDragon() {
  const response = await ky.get(
    "https://ddragon.leagueoflegends.com/api/versions.json",
  );

  if (response.status === 200) {
    const answer: Array<String> = await response.json();

    return answer[0];
  }

  return null;
}

async function getLatestChampionsArray() {
  const version = await getLatestDDragon();

  const response: ListOfChampionsDD = await ky
    .get(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
    )
    .json();

  if (response) {
    const championsList = response;

    championsJson = championsList;

    return championsList.data;
  }

  return null;
}

async function getChampionByKey(key: number) {
  const response: ChampionsDD | null = await getLatestChampionsArray();

  if (response) {
    Object.keys(response).forEach((elem) => {
      if (Number(response[elem as keyof ChampionsDD].key) === key) {
        championName = elem;
      }
    });

    return championName;
  }

  return "1";
}

export async function getTopChampion(summonerId: string): Promise<string> {
  const response = await ky.get(
    `https://ru.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?count=1&api_key=${API_KEY}`,
  );

  if (response.status === 200) {
    const answer: Array<TopChampion> = await response.json();
    const champion = await getChampionByKey(answer[0].championId);

    return champion;
  }

  return "1";
}
