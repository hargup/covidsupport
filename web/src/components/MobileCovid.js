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

import { theme } from "../assets/theme";
import { media } from "../assets/media";

function capitalize(s) {
  if (s) {
    return s[0].toUpperCase() + s.slice(1);
  }
}

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

/* 
  Moved theme to /assets/media
  to make this available in all files
  
  theme: {
        // theme colors
        background: "#f3f4f9",
        text: "#666",
        gray: "#D9DADA",
        primary: "#8D81EF",
        greenText: "#3CAA6B",
        greenBack: "rgba(111, 207, 151, 0.2)",
      }

  ~~~~~~~~~~~~~~~~~~~~~~

  Moved media to /assets/media
  to make this available in all files
  const mediaDesktop = "@media (min-width: 800px)";
  const mediaMobile = "@media (max-width: 799px)"; 
*/

const Heading = styled.img`
  margin: 0;
`;

const Wrapper = styled.div`
  padding: 1rem;
  background: ${theme.background};
  color: ${theme.text};

  ${media.desktop} {
    max-width: 800px;
    margin: 1rem auto;
  }
`;

const Check = styled(Icon.Check)`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  padding: 0.5rem;
  width: 2.25rem;
  height: 2.25rem;
  stroke: ${theme.white};
  border-radius: 12px;
`;

const Box = styled.div`
  position: relative;
  display: block;
  width: calc((100vw - 4rem) / 3);
  margin-bottom: 1rem;
  border: 1px solid ${theme.border};
  background: white;
  transition: all 0.2s ease;

  img {
    width: calc((100vw - 4rem) / 3);
  }

  ${(props) => {
    if (props.isSelected) {
      return css`
        background-color: ${rgba(theme.primary, 0.2)};
        border: 2px solid ${theme.primary};

        ${Check} {
          stroke: ${theme.primary};
          // background: ${theme.primary};
        }
      `;
    }
  }}
  &:active {
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);
  }
  border-radius: 12px;
  ${media.mobile} {
    &:nth-child(3n + 2) {
      margin: 0 1rem 1rem;
    }
  }
  ${media.desktop} {
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
  justify-content: center;
  width: 100%;
  margin: 1rem 0 2rem;

  .css-yk16xz-control {
    border-radius: 8px;
  }

  .css-1rhbuit-multiValue {
    background-color: ${theme.grayLight};
  }

  #react-select-3-input {
    height: 36px;
  }
`;

const ToggleMenu = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${theme.grayLight};
  svg {
    margin: 0.5rem;
  }
`;

const Search = styled.button`
  border: none;
  outline: none;
  padding: 0.5rem;
  background-color: ${theme.primary};
  display: flex;
  align-items: center;
  justify-content: space-around;
  // flex-basis: 300px;
  color: white;
  border-radius: 6px;
  width: 100%;
  height: 48px;
  max-width: 500px;

  svg.search {
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
  border: 1px solid ${theme.border};
  background: white;
  margin: 1.5rem 0;
  padding: 1rem;
  flex-direction: column;
  border-radius: 6px;

  .header {
    justify-content: space-between;
    color: ${theme.gray};
    text-transform: capitalize;

    b {
      font-size: 1.15rem;
      font-weight: 600;
      color: ${theme.grayDarker};
      line-height: 1.2;
      display: block;
      margin-bottom: 0.25rem;
    }
  }

  .details {
    margin: 1rem 0 0.5rem;
    font-size: 1rem;

    b {
      font-weight: 400;
      line-height: 1.2;
    }

    &__col {
      margin-bottom: 0.5rem;

      p {
        display: flex;
        align-items: center;

        span {
          display: block;
          min-width: 120px;
          font-size: 1rem;
        }
      }
    }

    &__contact {
      &-phone {
        display: flex;
        margin-bottom: 0.5rem;

        p:first-child {
          min-width: 120px;
          font-size: 1rem;
        }

        a {
          color: ${theme.primary};

          &:not(:last-child)::after {
            content: ", ";
          }

          &:last-child {
            word-break: break-word;
          }
        }
      }

      &-address {
        p {
          display: flex;

          span {
            display: block;
            min-width: 120px;
          }
        }
      }
    }
  }

  .footer {
    font-size: 0.875rem;
    align-items: center;

    ${media.desktop} {
      display: flex;
      justify-content: space-between;
    }

    p {
      margin: 0;
    }

    .data {
    }
  }
`;

// const OtherResourcesLink = styled.div``;
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

  const dataSortedByVerified = displayData
    .slice()
    .sort((a, b) => (b.verifiedAt || "").localeCompare(a.verifiedAt || ""));

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
            dataSortedByVerified.map((res) => (
              <Result>
                <div className="header">
                  <p>
                    <b>{res.hospital || capitalize(res.resources)}</b>
                    <span>{res.city}</span>
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
                    <div className="details__col">
                      <p>
                        <span>Beds:</span> <b>{res.bedCount}</b>
                      </p>
                      <p>
                        <span>ICUs:</span> <b>{res.icuCount}</b>
                      </p>
                      {res.oxygenBeds && (
                        <p>
                          <span>Oxygen Beds:</span> <b>{res.oxygenBeds}</b>
                        </p>
                      )}
                      <p>
                        <span>Ventilator:</span> <b>{res.ventilatorCount}</b>
                      </p>
                    </div>
                  )}
                  <div className="details__contact">
                    <div className="details__contact-phone">
                      <p>Contact:</p>
                      <div>
                        <b>{res.contactPerson}</b>
                        {res.contactNumber && (
                          <p>
                            {String(res.contactNumber)
                              .replace(/\/|,/g, ",")
                              .split(",")
                              .map((value) => {
                                return (
                                  <a href={"tel:" + value.trim()}>
                                    {" "}
                                    {value.trim()}
                                  </a>
                                );
                              })}
                          </p>
                        )}
                        {res.email && (
                          <p>
                            <a href={"mailto:" + res.email}>{res.email}</a>
                          </p>
                        )}
                      </div>
                    </div>

                    {res.address && (
                      <div className="details__contact-address">
                        <p>
                          <span>Address:</span> <b>{res.address}</b>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="footer">
                  {res.verifiedAt ? (
                    <Verified>
                      Verified at:{" "}
                      <b className="text-green-600">
                        {" "}
                        {moment(res.verifiedAt).format("h:mm A D MMMM")}
                      </b>
                    </Verified>
                  ) : (
                    <p>Not Verified</p>
                  )}
                  <p className="data">
                    Data source:{" "}
                    <a className="text-blue-600" href={res.source}>
                      {res.source}
                    </a>
                  </p>
                </div>
              </Result>
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
