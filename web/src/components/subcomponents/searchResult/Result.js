import React, { Component } from "react";
import { Result } from "../../../assets/styles";
import Header from "./Header";
import Detail from "./Detail";
import Footer from "./Footer";
class Results extends Component {
  render() {
    return (
      <Result>
        <Header res={this.props.res} />
        {/* <div>{JSON.stringify(res)}</div> */}
        <Detail res={this.props.res} />

        <Footer res={this.props.res} />
      </Result>
    );
  }
}

export default Results;
