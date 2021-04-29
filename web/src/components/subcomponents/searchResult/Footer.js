import React, { Component } from "react";
import moment from "moment";
import { Verified } from "../../../assets/styles";
class Result extends Component {
  render() {
    let res = this.props.res;
    return (
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
    );
  }
}

export default Result;
