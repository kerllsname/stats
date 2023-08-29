import { createSlice } from "@reduxjs/toolkit";

const summonerDataSlice = createSlice({
  name: "summonersData",
  initialState: {
    summoners: [
      {
        initialSummonerData: {},
      },
    ],
  },
  reducers: {
    addInitialData(state, action) {
      state.summoners.push({
        initialSummonerData: action.payload,
      });
    },
  },
});

export const { addInitialData } = summonerDataSlice.actions;

export default summonerDataSlice.reducer;
