/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Fast extends React.Component {
  // population

  constructor(props) {
    super(props);
    this.state = this.props.array.reduce(
      (o, key) => ({ ...o, [key]: false }),
      {}
    );
  }
  handleChange = name => event => {
    let options = this.state;
    var element;
    console.log(this.state);
    for (element in options) {
      if (element === name) {
        this.setState({ [element]: true });
      } else {
        this.setState({ [element]: false });
      }
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h4 className={classes.infoText}>Choose your type search : </h4>

        <GridContainer justify="center">
          {this.props.array.map((element, key) => {
            return (
              <GridItem key={key}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state[element]}
                    onClick={this.handleChange(element)}
                    checkedIcon={
                      <i
                        className={"fas fa-user " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-user " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>{element}</h6>
                </div>
              </GridItem>
            );
          })}
        </GridContainer>
      </div>
    );
  }
}

Fast.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Fast);
