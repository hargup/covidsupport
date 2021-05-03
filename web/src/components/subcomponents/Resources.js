import React, { Component } from "react";
import { OtherResourcesLink } from "../../assets/styles";

class Resources extends Component {
  render() {
    return (
      <OtherResourcesLink className="border-t">
        <div>
          <p className="text-xl max-w-xl mt-4 mb-3 ml-2">
            Please try{" "}
            <a
              className="font-bold text-blue-500 underline"
              href="/other-resources"
            >
              Other Resources
            </a>{" "}
            if the above search results in no helpful data.
          </p>
          <p className="text-sm max-w-xl ml-2 text-gray-500">
            Other resources is a list of multiple covid resources that have been
            put together by people all over the country.
          </p>
        </div>

        {/* Contribution Link */}
        <div>
          <p className="text-xl max-w-xl mt-4 mb-3 ml-2">
            <strong>NB:</strong> We can do so much more with your help, checkout
            our{" "}
            <a
              className="font-bold text-blue-500 underline"
              href="https://github.com/hargup/covidsupport"
            >
              Source Code
            </a>{" "}
            and{" "}
            <a
              className="font-bold text-blue-500 underline"
              href="https://github.com/hargup/covidsupport/blob/master/README.md"
            >
              Contribution Guidelines
            </a>{" "}
            to get started.
          </p>
        </div>
      </OtherResourcesLink>
    );
  }
}

export default Resources;
