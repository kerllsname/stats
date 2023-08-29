import ky from "ky";

import { InitialSummonerData } from "../Components/InterfacesAndTypes/Interfaces/MainPageInterfaces";

import API_KEY from "./API_KEY";

export async function getSummonerByName(
  summonerName: string,
): Promise<null | InitialSummonerData> {
  const response = await ky.get(
    `https://ru.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`,
  );

  if (response.status === 200) {
    const answer: InitialSummonerData = await response.json();

    return answer;
  }

  return null;
}

export async function getTopChampion(
  summonerId: string,
): Promise<null | InitialSummonerData> {
  const response = await ky.get(
    `https://ru.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?count=1&api_key=${API_KEY}`,
  );

  if (response.status === 200) {
    const answer: InitialSummonerData = await response.json();

    return answer;
  }

  return null;
}
