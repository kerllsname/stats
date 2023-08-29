import { SummonerData } from "./SummonerPageInterfaces";

export interface Store {
  summoners: {
    summoners: Array<SummonerData>;
  };
}
