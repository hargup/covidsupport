import React, { Component } from "react";
import { Check, Box, Boxes } from "../../../assets/styles";
import { boxData } from "./boxData";

class SelectBoxes extends Component {
  // add a constructor
  constructor(props) {
    super(props);
  }
  isSelected = (id) => {
    let el = this.props.selected.filter((boxId) => boxId === id);
    return el.length !== 0;
  };
  toggleSelected = (id) => {
    let newSelected = [...this.props.selected];
    if (this.isSelected(id)) {
      newSelected = newSelected.filter((boxId) => boxId !== id);
    } else {
      let el = boxData.filter((box) => box.name === id);
      newSelected.push(el[0].name);
    }
    this.props.setSelected(newSelected);
  };

  render() {
    return (
      <Boxes>
        {boxData.map((box, key) => (
          <Box
            key={key}
            isSelected={this.isSelected(box.name)}
            onClick={() => {
              this.toggleSelected(box.name);
            }}
          >
            <Check />
            <img src={"SupportIndia/boxes/" + box.icon} alt={box.name} />
          </Box>
        ))}
      </Boxes>
    );
  }
}

export default SelectBoxes;
