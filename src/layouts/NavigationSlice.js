import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Routes contains all of URLs visited regardless of tab
  routes: [],
  // Our tabs here: To keep track of the navigation for each individual tab
  search: [],
  todo: [],
  feed: [],
  staff: [],
  schedule: [],
};

//this will export the search slice values & functions
export const navigationSlice = createSlice({
  name: "navigationSlice",
  initialState: initialState,
  reducers: {
    pushRoute: (state, { payload }) => {
      const tabKey = payload.split("/")[1] || "search";

      console.log("RUNNING PUSH");
      console.log("payload", payload);
      console.log("tabKey", tabKey);
      // The user added a new route
      state.routes.push(payload);
      state[tabKey].push(payload);
    },
    popRoute: (state, { payload }) => {
      const tabKey = payload.split("/")[1] || "search";

      state.routes = state.routes.filter(
        (_, i) => i !== state.routes.length - 1
      );

      state[tabKey] = state[tabKey].filter(
        (_, i) => i !== state[tabKey].length - 1
      );
    },
  },
});

// This and the commented line below it work the same way
export const pushRoute = navigationSlice.actions.pushRoute;
export const popRoute = navigationSlice.actions.popRoute;

// export const { pushRoute, popRoute } = postSlice.actions;
