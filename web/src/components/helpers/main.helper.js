import moment from "moment";
export const capitalize = (s) => {
  if (s) {
    return s[0].toUpperCase() + s.slice(1);
  }
};

export const sortByResource = (data, resourceName) => {
  return data.sort(function (a, b) {
    if (b[resourceName] && a[resourceName]) {
      return b[resourceName] - a[resourceName];
    } else {
      return 0;
    }
  });
};

export const verifyAtComparator = (a, b) => {
  try {
    return (
      moment(a?.verifiedAt || "1980-01-01").valueOf() -
      moment(b?.verifiedAt || "1970-01-01").valueOf()
    );
  } catch {
    return 0;
  }
};

export const sortByVerifiedAt = (data) => {
  return data.sort(function (a, b) {
    return (
      moment(a?.verifiedAt || "1980-01-01").valueOf() -
      moment(b?.verifiedAt || "1970-01-01").valueOf()
    );
  });
};

export const intersects = (arr1, arr2) => {
  const filteredArray = arr1.filter((value) => arr2.includes(value));
  if (filteredArray.length > 0) {
    return true;
  }
  return false;
};

export const filterCities = (data, cities) => {
  if (cities.length > 0) {
    return data.filter((item) => {
      return cities.includes(item.city.toLowerCase());
    });
  } else {
    return data;
  }
};

export const filterResource = (data, resources) => {
  if (resources.length > 0) {
    return data.filter((item) => {
      return intersects(resources, item.resources);
    });
  } else {
    return data;
  }
};

export const addToCurrentTime = (hours, minutes) => {
  let dt = new Date();
  dt.setHours(dt.getHours() + hours);
  dt.setMinutes(dt.getMinutes() + minutes);
  return dt;
}
