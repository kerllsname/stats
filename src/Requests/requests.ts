import ky from "ky";

import { InitialSummonerData } from "../Components/InterfacesAndTypes/Interfaces/MainPageInterfaces";

import API_KEY from "./API_KEY";

export default async function getSummonerByName(
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
