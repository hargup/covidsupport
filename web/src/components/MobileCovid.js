import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import * as Icon from "react-feather";
import API from "../api";
import uniq from "lodash.uniq";
import Select from "react-select";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function capitalize(s) {
  if (s) {
    return s[0].toUpperCase() + s.slice(1);
  }
}

const theme = {
  background: "#f3f4f9",
  text: "#666",
  gray: "#D9DADA",
  primary: "#8D81EF",
  greenText: "#3CAA6B",
  greenBack: "rgba(111, 207, 151, 0.2)",
};

const boxData = [
  {
    name: "oxygen",
    icon: "1.svg",
  },
  {
    name: "ventilator",
    icon: "8.svg",
  },
  {
    name: "icu",
    icon: "5.svg",
  },
  {
    name: "beds",
    icon: "2.svg",
  },
  // {
  //   name: "tests",
  //   icon: "9.svg",
  // },
  {
    name: "plasma",
    icon: "6.svg",
  },
  {
    name: "remdesivir",
    icon: "3.svg",
  },
  {
    name: "fabiflu",
    icon: "10.svg",
  },
  {
    name: "tocilizumab",
    icon: "7.svg",
  },
  // {
  //   name: "food",
  //   icon: "4.svg",
  // },
  // {
  //   name: "other_resources",
  //   icon: "11.svg",
  // },
  // Other resources needs to be different page
];

const mediaDesktop = "@media (min-width: 800px)";
const mediaMobile = "@media (max-width: 799px)";

const Heading = styled.img`
  margin: 0;
`;

const Wrapper = styled.div`
  padding: 1rem;
  background: ${theme.background};
  color: ${theme.text};

  ${mediaDesktop} {
    max-width: 800px;
    margin: 1rem auto;
  }
`;

const Check = styled(Icon.Check)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  stroke: ${theme.gray};
  border-radius: 12px;
`;

const Box = styled.div`
  position: relative;
  display: block;
  width: calc((100vw - 4rem) / 3);
  margin-bottom: 1rem;
  border: 2px solid white;
  background: white;

  img {
    width: calc((100vw - 4rem) / 3);
  }

  ${(props) => {
    if (props.isSelected) {
      return css`
        background-color: ${rgba(theme.primary, 0.2)};
        border: 2px solid ${theme.primary};

        ${Check} {
          stroke: white;
          background: ${theme.primary};
        }
      `;
    }
  }}
  &:active {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  border-radius: 12px;
  ${mediaMobile} {
    &:nth-child(3n + 2) {
      margin: 0 1rem 1rem;
    }
  }
  ${mediaDesktop} {
    width: calc((800px - 5rem) / 4);
    &:nth-child(4n + 2) {
      margin: 0 1rem 1rem;
    }
    &:nth-child(4n + 3) {
      margin: 0 1rem 1rem 0;
    }
  }
`;

const Boxes = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
`;

function SelectBoxes(props) {
  const isSelected = (id) => {
    let el = props.selected.filter((boxId) => boxId === id);
    return el.length !== 0;
  };

  // TODO: Refactor this
  // The code is confusing
  const toggleSelected = (id) => {
    let newSelected = [...props.selected];
    if (isSelected(id)) {
      newSelected = newSelected.filter((boxId) => boxId !== id);
    } else {
      let el = boxData.filter((box) => box.name === id);
      newSelected.push(el[0].name);
    }
    props.setSelected(newSelected);
  };

  return (
    <Boxes>
      {boxData.map((box) => (
        <Box
          isSelected={isSelected(box.name)}
          onClick={() => {
            toggleSelected(box.name);
          }}
        >
          <Check />
          <img src={"SupportIndia/boxes/" + box.icon} alt={box.name} />
        </Box>
      ))}
    </Boxes>
  );
}

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0 2rem;
`;

const ToggleMenu = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  background-color: ${theme.gray};
  svg {
    margin: 0.5rem;
  }
`;

const Search = styled.button`
  border: none;
  outline: none;
  padding: 0.5rem 0.5rem;
  background-color: ${theme.primary};
  display: flex;
  align-items: center;
  color: white;
  border-radius: 6px;

  svg.search {
    margin: 0 0.5rem 0 0;
    /* width: 2.5rem; */
    /* height: 2.5rem; */
    stroke: ${theme.background};
  }
`;

const Verified = styled.div`
  background-color: ${theme.greenBack};
  color: ${theme.greenText};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  margin: 0.5rem 0;
`;

const Result = styled.div`
  display: flex;
  /* border: 1px solid ${theme.gray}; */
  background: white;
  margin: 1.5rem 0;
  padding: 0.5rem;
  flex-direction: column;
  border-radius: 6px;
  .header {
    display: flex;
    justify-content: space-between;
    color: ${theme.primary};
    b {
      font-size: 1.5rem;
      color: ${theme.primary};
    }
  }
  .details {
    margin: 1rem 0 0.5rem;
    font-size: 1.2rem;
  }
  .footer {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    p {
      margin: 0;
    }
    .data {
      margin-left: 1rem;
    }
  }
`;

// =============== Common Functions ==================

// Usage: sortByResource(data, 'bedCount')
function sortByResource(data, resourceName) {
  return data.sort(function (a, b) {
    if (b[resourceName] && a[resourceName]) {
      return b[resourceName] - a[resourceName];
    } else {
      return 0;
    }
  });
}

const verifyAtComparator = (a, b) => {
  try {
    return (
      moment(a?.verifiedAt || "1980-01-01").valueOf() -
      moment(b?.verifiedAt || "1970-01-01").valueOf()
    );
  } catch {
    return 0;
  }
};

function sortByVerifiedAt(data) {
  return data.sort(function (a, b) {
    return (
      moment(a?.verifiedAt || "1980-01-01").valueOf() -
      moment(b?.verifiedAt || "1970-01-01").valueOf()
    );
  });
}

function intersects(arr1, arr2) {
  const filteredArray = arr1.filter((value) => arr2.includes(value));
  if (filteredArray.length > 0) {
    return true;
  }
  return false;
}

function filterCities(data, cities) {
  if (cities.length > 0) {
    return data.filter((item) => {
      return cities.includes(item.city.toLowerCase());
    });
  } else {
    return data;
  }
}

function filterResource(data, resources) {
  if (resources.length > 0) {
    return data.filter((item) => {
      return intersects(resources, item.resources);
    });
  } else {
    return data;
  }
}

function shareUrl() {
  return `${window.location.href || document.URL}&screen=result`;
}

// =============== Main Component  ==================

function Loading() {
  return (
    <div>
      <Wrapper>
        <div style={{ width: "100%", padding: "5px 5%" }}>
          <Heading src="SupportIndia/Loading_top.svg" />
        </div>
        <div className="text-2xl font-bold p-5">
          Loading...
          <Skeleton count={1} color="#8D81EF" highlightColor="#444" />
        </div>
      </Wrapper>
    </div>
  );
}

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

  return (
    <div>
      {data.length === 0 ? (
        <Loading />
      ) : (
        <Wrapper>
          <Heading src="SupportIndia/logo2.svg" />
          <Toolbar>
            {screen !== "input" && (
              <div
                onClick={() => {
                  setScreen("input");
                }}
                className="m-2 border rounded"
                style={{ background: "#D9DADA" }}
              >
                <Icon.ChevronLeft size={40} />
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
                <Icon.Search className="search" /> Find Resources (
                {displayData.length})
              </Search>
            </Toolbar>
          )}
          {displayData &&
            screen !== "input" &&
            displayData.map((res) => (
              <Result>
                <div className="header">
                  <p>
                    <b>{res.hospital || capitalize(res.resources)}</b>
                    <br></br>
                    {res.city}
                  </p>
                  {navigator.share && (
                    <div
                      onClick={() => {
                        navigator.share({
                          title: "Live Covid 19 Resources",
                          text: `${res.hospital}: ${res.contactPerson} ${res.contactNumber}`,
                          url: shareUrl(),
                        });
                      }}
                    >
                      <Icon.Share2 />
                    </div>
                  )}
                </div>
                {/* <div>{JSON.stringify(res)}</div> */}
                <div className="details">
                  {res.hospital && (
                    <div>
                      <p>
                        Beds: <b>{res.bedCount}</b>
                      </p>
                      <p>
                        ICUs: <b>{res.icuCount}</b>
                      </p>
                      {res.oxygenBeds && (
                        <p>
                          Oxygen Beds: <b>{res.oxygenBeds}</b>
                        </p>
                      )}
                      <p>
                        Ventilator: <b>{res.ventilatorCount}</b>
                      </p>
                    </div>
                  )}
                  <div>
                    <p>Contact:</p>
                    <b>{res.contactPerson}</b>
                    <p>
                      <b>{res.contactNumber}</b> <p>{res.email}</p>
                    </p>
                    {res.address && (
                      <p>
                        Address: <b>{res.address}</b>
                      </p>
                    )}
                  </div>
                </div>

                <div className="footer">
                  {res.verifiedAt ? (
                    <Verified>
                      Verified at: <br />{" "}
                      {moment(res.verifiedAt).format("h:mm A D MMMM")}
                    </Verified>
                  ) : (
                    <p>Not Verified</p>
                  )}
                  <p className="data">
                    Data source:{" "}
                    <a className="text-green-600" href={res.source}>
                      {res.source}
                    </a>
                  </p>
                </div>
              </Result>
            ))}
        </Wrapper>
      )}
    </div>
  );
}
