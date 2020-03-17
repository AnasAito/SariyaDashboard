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
/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

// core components

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import Fast from "views/FastSearch";
class ChartTest extends React.Component {
  state = {
    checkedA: false,
    data: {
      labels: ["0-5", "5-10", "10-15", "15-20"],
      series: [[7, 6, 15, 4]]
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked,
      data: {
        labels: this.state.data.labels,
        series: event.target.checked
          ? [[4, 2, 11, 1], [3, 4, 4, 3]]
          : [[7, 6, 15, 4]]
      }
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={8}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Fast search</h4>
              </CardHeader>
              <CardBody>
                <Fast
                  array={[
                    "Student",
                    "Level",
                    "Classroom",
                    "Subject",
                    "Teacher"
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

ChartTest.propTypes = {
  classes: PropTypes.object
};

export default withStyles(chartsStyle)(ChartTest);
