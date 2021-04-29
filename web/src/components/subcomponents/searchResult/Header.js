import React, { Component } from "react";
import { capitalize } from "../../helpers/main.helper";
import * as Icon from "react-feather";
class Header extends Component {
  shareUrl() {
    return `${window.location.href || document.URL}&screen=result`;
  }
  render() {
    let res = this.props.res;
    return (
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
                url: this.shareUrl(),
              });
            }}
          >
            <Icon.Share2 />
          </div>
        )}
      </div>
    );
  }
}

export default Header;
