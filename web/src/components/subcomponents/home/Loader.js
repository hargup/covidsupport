import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import { Wrapper, Heading } from "../../../assets/styles";

class Loader extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <Heading className="heading" src="SupportIndia/logo2.svg" />
          <div className="text-2xl font-bold p-5">
            Loading...
            <Skeleton count={1} color="#8D81EF" highlightColor="#444" />
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default Loader;
