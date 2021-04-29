import React, { useState, useEffect, useCallback } from "react";

import uniq from "lodash.uniq";
import Select from "react-select";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import SelectBoxes from "./subcomponents/home/Boxes";
import Loader from "./subcomponents/home/Loader";
import {
  Wrapper,
  Toolbar,
  Heading,
  ToggleMenu,
  Search,
} from "../assets/styles";
import Results from "./subcomponents/searchResult/Result";
import {
  capitalize,
  sortByResource,
  verifyAtComparator,
  sortByVerifiedAt,
  filterCities,
  filterResource,
} from "./helpers/main.helper";

// =============== Main Component  ==================

export default function MobileCovid() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const selectedResources = useSelector((state) => state.selectedResources);
  const selectedCities = useSelector((state) => state.selectedCities);
  const screen = useSelector((state) => state.screen);

  const [loadStatus, setLoadStatus] = useState("initial");
  const [displayData, setDisplayData] = useState([]);
  const [allCities, setAllCities] = useState([]);

  window.data = data;
  window.moment = moment;

  const getCityOptions = (city) => {
    return { label: capitalize(city), value: city };
  };

  const setSelectedResources = useCallback(
    (data) => {
      dispatch({
        type: "selectedResources/select",
        payload: { selectedResources: data },
      });
    },
    [dispatch]
  );

  const setSelectedCities = useCallback(
    (data) => {
      dispatch({
        type: "selectedCities/select",
        payload: { selectedCities: data },
      });
    },
    [dispatch]
  );

  const setScreen = useCallback(
    (screen) => {
      dispatch({
        type: "screen/select",
        payload: { screen },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    // const displayData = data.sort(sortByVerifiedAt);
    setDisplayData(data);
    const allCities = uniq(data.map((item) => item.city.toLowerCase()));
    setAllCities(allCities);
  }, [data]);

  useEffect(() => {
    const citiesData = filterCities(data, selectedCities);
    // TODO: Ideally selectedResources should be a flat array
    // of strings
    const newDisplayData = filterResource(citiesData, selectedResources);
    setDisplayData(newDisplayData);
  }, [data, selectedCities, selectedResources]);

  const dataSortedByVerified = displayData
    .slice()
    .sort((a, b) => (b.verifiedAt || "").localeCompare(a.verifiedAt || ""));

  return (
    <div>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <Wrapper>
          <Heading src="SupportIndia/logo2.svg" />
          <Toolbar>
            {screen !== "input" && (
              <div
                onClick={() => {
                  setScreen("input");
                }}
                className="mr-2 cursor-pointer rounded bg-blue-50 h-12 w-12"
                style={{ color: "#8D81EF" }}
              >
                <Icon.ChevronLeft className="mt-0.5" size={40} />
              </div>
            )}
            <Select
              placeholder="Select single or multiple cities"
              isMulti
              value={selectedCities.map(getCityOptions)}
              options={allCities.map(getCityOptions)}
              className="mt-1 block w-full rounded-md bg-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              onChange={(options, meta) => {
                if (options) {
                  const cities = options.map((opt) => opt.value);
                  setSelectedCities(cities);
                } else {
                  setSelectedCities([]);
                }
              }}
            />
          </Toolbar>
          {screen === "input" && (
            <SelectBoxes
              selected={selectedResources}
              setSelected={setSelectedResources}
            />
          )}
          {screen === "input" && (
            <Toolbar>
              <Search
                onClick={() => {
                  if (
                    selectedResources.length > 0 ||
                    selectedCities.length > 0
                  ) {
                    setScreen("results");
                  }
                }}
              >
                <div style={{ width: "24px" }} />
                <div>See Resources ({displayData.length})</div>
                <Icon.ChevronsRight className="search" />
              </Search>
            </Toolbar>
          )}
          {dataSortedByVerified &&
            screen !== "input" &&
            dataSortedByVerified.map((res, key) => (
              <Results key={key} res={res} />
            ))}

          {/* <OtherResourcesLink className="border-t">
            <p className="text-xl max-w-xl mt-4 mb-3 ml-2">
              Please try{" "}
              <a
                className="font-bold text-blue-500 underline"
                href="/other-resources"
              >
                Other Resources
              </a>{" "}
              if the above search results in no helpful data.
            </p>
            <p className="text-sm max-w-xl ml-2 text-gray-500">
              Other resources is a list of multiple covid resources that have
              been put together by people all over the country.
            </p>
          </OtherResourcesLink> */}
        </Wrapper>
      )}
    </div>
  );
}
