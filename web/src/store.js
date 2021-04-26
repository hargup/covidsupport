import React from "react";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { stringify } from "querystring";
import produce, { current } from "immer";
import logger from "redux-logger";
import API from "./api";

function getQueryParam() {
  const urlObj = new URL(window.location.href);
  return urlObj.searchParams.get("q");
}

// ================== Data =================

const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    load: (state, { payload }) => payload.data,
  },
});

async function getData(dispatch, getState) {
  API.get("/allData").then(({ data }) => {
    dispatch({ type: "data/load", payload: { data } });
  });
}

// ================== selectedCities ====================

const selectedCitiesSlice = createSlice({
  name: "selectedCities",
  initialState: [],
  reducers: {
    select: (state, { payload }) => payload.selectedCities,
  },
});

// ================== selectedResources =================

const selectedResourcesSlice = createSlice({
  name: "selectedResources",
  initialState: [],
  reducers: {
    select: (state, { payload }) => payload.selectedResources,
  },
});

// ===================== screenSlice =====================

const screenSlice = createSlice({
  name: "screen",
  initialState: "input",
  reducers: {
    select: (state, { payload }) => payload.screen,
  },
});

// ==================== Reducers =======================

const reducer = {
  data: dataSlice.reducer,
  selectedCities: selectedCitiesSlice.reducer,
  selectedResources: selectedResourcesSlice.reducer,
  screen: screenSlice.reducer,
};

// =============== Custom Middleware ================
const updateUrl = (store) => (next) => (action) => {
  let result = next(action);
  const urlObj = new URL(window.location.href);
  if (action?.type?.startsWith("selectedCities")) {
    const selectedCities = store.getState().selectedCities;
    urlObj.searchParams.set("cities", selectedCities.join(","));
    window.history.pushState(
      store.getState(),
      "",
      `?${urlObj.searchParams.toString()}`
    );
  }

  if (action?.type?.startsWith("selectedResources")) {
    const selectedResources = store.getState().selectedResources;
    urlObj.searchParams.set("resources", selectedResources.join(","));
    console.log(urlObj.searchParams);
    window.history.pushState(
      { selectedResources },
      "",
      `?${urlObj.searchParams.toString()}`
    );
  }

  return result;
};

const loadSelectedCitiesAndResources = (store) => (next) => (action) => {
  let result = next(action);
  if (action.type === "data/load") {
    const urlObj = new URL(window.location.href);

    const selectedCities = urlObj.searchParams.get("cities")?.split(",");
    if (selectedCities) {
      store.dispatch({
        type: "selectedCities/select",
        payload: { selectedCities },
      });
    }

    const selectedResources = urlObj.searchParams.get("resources")?.split(",");
    if (selectedResources) {
      store.dispatch({
        type: "selectedResources/select",
        payload: { selectedResources },
      });
    }

    const screen = urlObj.searchParams.get("screen");
    if (screen) {
      store.dispatch({
        type: "screen/select",
        payload: { screen },
      });
    }
  }
  return result;
};

// const loadSelectedTab = (store) => (next) => (action) => {
//   let result = next(action);
//   if (action.type === "selectedProfile/select") {
//     const urlObj = new URL(window.location.href);
//     const tabId = urlObj.searchParams.get("tab");
//     const selectedProfile = action.payload.profile;

//     const selectedTab = tabId
//       ? selectedProfile.tabs.find((t) => t.id === tabId)
//       : selectedProfile.tabs[0];
//     store.dispatch({
//       type: "selectedTab/select",
//       payload: { selectedTab },
//     });
//   }
//   return result;
// };

const middleware = [
  logger,
  updateUrl,
  loadSelectedCitiesAndResources,
  // updateProfileInDb,
  // loadSelectedProfile,
  // loadSelectedTab,
  thunkMiddleware,
];
const store = configureStore({
  reducer,
  middleware,
});

export { getData };

export default store;
