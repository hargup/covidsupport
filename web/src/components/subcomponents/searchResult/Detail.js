import React, { Component } from "react";

class Detail extends Component {
  render() {
    let res = this.props.res;
    return (
      <div className="details">
        {res.hospital && (
          <div className="details__col">
            <p>
              <span>Beds:</span> <b>{res.bedCount}</b>
            </p>
            <p>
              <span>ICUs:</span> <b>{res.icuCount}</b>
            </p>
            {res.oxygenBeds && (
              <p>
                <span>Oxygen Beds:</span> <b>{res.oxygenBeds}</b>
              </p>
            )}
            <p>
              <span>Ventilator:</span> <b>{res.ventilatorCount}</b>
            </p>
          </div>
        )}
        <div className="details__contact">
          <div className="details__contact-phone">
            <p>Contact:</p>
            <div>
              <b>{res.contactPerson}</b>
              {res.contactNumber && (
                <p>
                  {String(res.contactNumber)
                    .replace(/\/|,/g, ",")
                    .split(",")
                    .map((value, key) => {
                      return (
                        <a key={key} href={"tel:" + value.trim()}>
                          {" "}
                          {value.trim()}
                        </a>
                      );
                    })}
                </p>
              )}
              {res.email && (
                <p>
                  <a href={"mailto:" + res.email}>{res.email}</a>
                </p>
              )}
            </div>
          </div>

          {res.address && (
            <div className="details__contact-address">
              <p>
                <span>Address:</span> <b>{res.address}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Detail;
