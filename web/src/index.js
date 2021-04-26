import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import store, { getData } from "./store";

firebase.initializeApp({
  apiKey: "AIzaSyBZj5bRwGKvVOauMxZvuDjwDH-CoKa2YoU",
  authDomain: "neera-b0cb4.firebaseapp.com",
  projectId: "neera-b0cb4",
  storageBucket: "neera-b0cb4.appspot.com",
  messagingSenderId: "270584014008",
  appId: "1:270584014008:web:3566cab522cbbfee32004d",
  measurementId: "G-9XS8GR8HKD",
});

store.dispatch(getData);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
