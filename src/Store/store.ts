import { configureStore } from "@reduxjs/toolkit";

import summonerReducer from "./summonerDataSlice";

export default configureStore({
  reducer: {
    summoners: summonerReducer,
  },
});
