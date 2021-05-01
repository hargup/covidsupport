if (typeof window === "undefined") {
  // console.log("running on client");
} else {
  // console.log("running on browser");
  window.dataLayer = window.dataLayer || [];
}

var dataLayer = (typeof window !== "undefined" && window.dataLayer) || [];
export default dataLayer;
var event;

export const dlPageView = (page) => {
  event = "pageView";
  let url = window.location.pathname;
  dataLayer.push({
    event,
    url,
    pageTitle: page,
  });
};

export const dlSearch = (search, city) => {
  event = "Search";
  dataLayer.push({
    event,
    search,
    city,
  });
};
