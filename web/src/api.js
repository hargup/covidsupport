import axios from "axios";

const LOCAL_END_POINT = "http://localhost:5001/api/";
const PROD_END_POINT = "/api/";

const END_POINT =
  process.env.NODE_ENV === "development" ? LOCAL_END_POINT : PROD_END_POINT;

export default axios.create({
  baseURL: END_POINT,
  headers: {
    Accept: "*/*",
  },
});

export { END_POINT };
