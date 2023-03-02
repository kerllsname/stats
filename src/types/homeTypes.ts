export type IDDataType = {
  status: string;
  data: [
    {
      nickname: string;
      account_id: number;
    }
  ];
};

export type PlayerDataType = {
  status: string;
  data: {
    [ID: number]: PlayerStatistic;
  };
};

export type PlayerStatistic = {
  account_id: number;
  clan_id: number;
  created_at: number;
  global_rating: number;
  last_battle_time: number;
  nickname: string;
  statistics: {
    all: {
      battles: number;
      wins: number;
      draws: number;
      losses: number;
      damage_dealt: number;
    };
  };
};

export type ClanDataType = {
  data: {
    [ID: number]: {
      clan_tag: string;
    };
  };
};
