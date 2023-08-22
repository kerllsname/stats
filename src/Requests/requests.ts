import ky from 'ky';

import { SummonerData } from '../Components/InterfacesAndTypes/Interfaces/MainPageInterfaces';

const API_KEY = 'RGAPI-d79fba7d-9f62-442d-8bca-ac7a5c0f5b29';

export default async function getSummonerByName(
  summonerName: string,
): Promise<boolean | SummonerData> {
  const response = await ky
    .get(
      `https://ru.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`,
    );

  if (response.status === 200) {
    const answer: SummonerData = await response.json();

    return answer;
  }

  return false;
}
