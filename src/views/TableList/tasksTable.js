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
// react component for creating dynamic tables
import ReactTable from "react-table";
import { CSVLink, CSVDownload } from "react-csv";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import PublishIcon from "@material-ui/icons/Publish";
import TocIcon from "@material-ui/icons/Toc";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { gql } from "apollo-boost";
import { Query } from "@apollo/react-components";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import GetAppIcon from "@material-ui/icons/GetApp";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
const Task = gql`
  query task($taskname: String) {
    task(where: { name: $taskname }) {
      name
      questions {
        questionText
      }
      mytasks {
        user {
          username
          age
          location
          sex
        }
        metadata
      }
    }
  }
`;
class TasksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: false,
      task: "test2",
      classicModal: false,
      csv: [],
      ready: false,
      headers: []
    };
  }
  handleClose() {
    this.setState({ classicModal: false, ready: false });
    console.log(this.state.csv);
  }
  prepareData({ task }) {
    let columns = ["sex", "age", "local"];
    let questions = task.questions.map(question => question.questionText);
    columns = [...columns, ...questions];
    let rows = task.mytasks.map(mytask => {
      let user = [
        mytask.user.sex == null ? "" : mytask.user.sex,
        mytask.user.age == null ? "" : mytask.user.age,
        mytask.user.location == null ? "" : mytask.user.location
      ];

      let resp = Object.keys(JSON.parse(mytask.metadata)).map(function(_) {
        return JSON.parse(mytask.metadata)[_];
      });
      return [...user, ...resp];
    });

    return [columns, rows];
  }
  exportdata(data) {
    let [columns, rows] = this.prepareData(data);

    let csv = [];
    csv.push(columns);
    //csv.push(rows[0]);
    csv = [...csv, ...rows];
    this.setState({ csv: csv, ready: true });
  }
  componentDidMount() {
    this.setState({
      data: this.props.data.map((prop, key) => {
        return {
          id: key,
          userPhone: prop[2],
          userName: prop[1],
          products: parseInt(prop[3]),
          time: prop[4]
        };
      })
    });
  }
  render() {
    const { classes } = this.props;
    //console.log(this.state.data)
    return (
      <>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>TASKS TABLE</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.data}
                  filterable
                  columns={[
                    {
                      Header: "User Phone",
                      accessor: "userPhone"
                    },
                    {
                      Header: "User Name",
                      accessor: "userName"
                    },
                    {
                      Header: "Items count",
                      accessor: "products"
                    },
                    {
                      Header: "Time",
                      accessor: "time"
                    }
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Query
          query={Task}
          fetchPolicy={"cache-and-network"}
          variables={{ taskname: this.state.task }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>loading ... </div>;

            if (error) return <p>`Error! ${error.message}`</p>;

            return (
              <>
                <Dialog
                  open={this.state.classicModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.handleClose()}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                  contentStyle={{ width: "100%", maxWidth: "none" }}
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <Button
                      justIcon
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="transparent"
                      onClick={() => this.handleClose("classicModal")}
                    >
                      <Close className={classes.modalClose} />
                    </Button>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <GridContainer>
                      <GridItem>
                        <Card>
                          <CardBody>
                            <Typography variant="h5" component="h3">
                              task name
                            </Typography>
                            <Typography component="p">
                              {data.task.name}
                            </Typography>
                          </CardBody>
                        </Card>
                      </GridItem>
                      <GridItem>
                        <Card>
                          <CardBody>
                            <Typography variant="h5" component="h3">
                              responses
                            </Typography>
                            <Typography component="p">
                              {data.task.mytasks.length}
                            </Typography>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    {!this.state.ready ? (
                      <Button
                        color="success"
                        className={classes.marginRight}
                        onClick={() => this.exportdata(data)}
                      >
                        <SettingsIcon className={classes.icons} />
                        Prepare data
                      </Button>
                    ) : (
                      <></>
                    )}
                    {this.state.ready ? (
                      <CSVLink
                        data={this.state.csv}
                        filename={this.state.task.concat(".csv")}
                      >
                        <Button color="success" className={classes.marginRight}>
                          <GetAppIcon className={classes.icons} />
                          Download{" "}
                        </Button>
                      </CSVLink>
                    ) : (
                      <></>
                    )}
                  </DialogActions>
                </Dialog>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

TasksTable.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(TasksTable);
