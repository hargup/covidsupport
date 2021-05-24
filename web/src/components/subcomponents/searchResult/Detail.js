import React, { Component } from "react";

class Detail extends Component {
  render() {
    let res = this.props.res;
    return (
      <div className="details">
        {res.hospital && (
          <div className="details__col">
            <p>
              <span>Total Beds:</span>{" "}
              <b>{res.total_beds_allocated_to_covid}</b>
            </p>
            {res.total_beds_with_oxygen !== 0 && (
              <p>
                <span>Beds With Oxygen:</span>{" "}
                <b>{res.total_beds_with_oxygen}</b>
              </p>
            )}
            {res.total_beds_without_oxygen !== 0 && (
              <p>
                <span>Beds Without Oxygen:</span>{" "}
                <b>{res.total_beds_without_oxygen}</b>
              </p>
            )}
            {res.total_icu_beds_with_ventilator !== 0 && (
              <p>
                <span>ICU Beds With Ventilator:</span>{" "}
                <b>{res.total_icu_beds_with_ventilator}</b>
              </p>
            )}
            {res.total_icu_beds_without_ventilator !== 0 && (
              <p>
                <span>ICU Beds Without Ventilator:</span>{" "}
                <b>{res.total_icu_beds_without_ventilator}</b>
              </p>
            )}
            <p>
              <span>ICUs:</span> <b>{res.icuCount}</b>
            </p>
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
          {res.others && (
            <div className="details__contact-address">
              <p>
                <span>Comments:</span> <b>{res.others}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Detail;
