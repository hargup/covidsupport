import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import { Wrapper, Heading } from "../assets/styles";

class Loader extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <Heading className="heading" src="SupportIndia/logo2.svg" />
          <br />
          <a href="https://www.covidindiaresources.com/">
            <span className="font-bold text-blue-500 underline">
              covidresources.in
            </span>{" "}
            - Verified resouces for covid needs
          </a>
          <br />
          <a href="https://www.dhoondh.com/">
            <span className="font-bold text-blue-500 underline">Dhoond</span> -
            Plasma Search
          </a>
          <br />
          <a href="https://covidrelief.glideapp.io/">
            <span className="font-bold text-blue-500 underline">
              covidrelief
            </span>{" "}
            - covid resouce tracker
          </a>
        </Wrapper>
      </div>
    );
  }
}

export default Loader;
