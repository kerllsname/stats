import { InitialSummonerData } from "./MainPageInterfaces";

export interface SummonerData {
  initialSummonerData: InitialSummonerData;
}

export interface ListOfChampionsDD {
  data: ChampionsDD;
}

export interface TopChampion {
  championId: number;
}

export interface ChampionsDD {
  [key: string]: ChampionDD;
}

export interface ChampionDD {
  key: string;
}
