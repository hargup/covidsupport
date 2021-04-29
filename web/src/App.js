import "./App.css";
import React from "react";
import _ from "lodash";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import MobileCovid from "./components/MobileCovid";

// import OtherResources from "./components/OtherResources";

// -------------------------------------------------

// ======================= Main Area =============================

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div
          className="text-xl font-semibold justify-center items-center md:hidden"
          style={{ width: "100%", padding: "5px 5%" }}
        >
          Live Covid19 Resources
        </div>
        <Switch>
          {/* <Route path="/other-resources">
            <OtherResources />
          </Route> */}
          <Route path="/">
            <MobileCovid />
          </Route>
          <Route path="">
            <MobileCovid />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
