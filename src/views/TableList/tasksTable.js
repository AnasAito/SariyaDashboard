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
import Close from "@material-ui/icons/Close";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { gql } from "apollo-boost";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import PublishIcon from "@material-ui/icons/Publish";
import TocIcon from "@material-ui/icons/Toc";

import { Query } from "@apollo/react-components";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CardContent from "@material-ui/core/CardContent";
import { Mutation } from "@apollo/react-components";
import get from "lodash/get";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Confirm = gql`
  mutation updateProduct($id: ID!) {
    updateUserBag(where: { id: $id }, data: { confirmed: true }) {
      id
    }
  }
`;
const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  card: {
    minWidth: 275,
    backgroundColor: "gray"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const UserBag = gql`
  query userBag($id: ID!) {
    userBag(where: { id: $id }) {
      id
      updatedAt
      user {
        phone
      }
      location {
        lat
        long
      }
      userProducts {
        id
        qt
        product {
          name
          price
        }
      }
    }
  }
`;
class TasksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false,
      id: "",
      expanded: null
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.data.map((prop, key) => {
        return {
          id: key,
          userPhone: prop[2],
          userName: prop[1],
          products: parseInt(prop[3]),
          time: prop[4],
          confirmed: prop[5],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}

              <Button
                justIcon
                round
                simple
                color="info"
                className="like"
                onClick={() => {
                  this.setState({ visible: true, id: prop[0] });
                }}
              >
                <PublishIcon />
              </Button>

              {/* use this button to add a edit kind of action */}
            </div>
          )
        };
      })
    });
  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>{this.props.name}</h4>
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
                    },
                    {
                      Header: "Confirmed",
                      accessor: "confirmed"
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false
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
          query={UserBag}
          //fetchPolicy={"network-only"}
          variables={{ id: this.state.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>loading ... </div>;

            if (error) return <p>`Error! ${error.message}`</p>;
            // console.log(data.userBag ? data.userBag.location : "");
            console.log(get(data, "userBag.location", " "));
            return (
              <>
                <Dialog
                  open={this.state.visible}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.setState({ visible: false })}
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
                      onClick={() => this.setState({ visible: false })}
                    >
                      <Close className={classes.modalClose} />
                    </Button>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    {/*data.userBag ? (
                      data.userBag.userProducts.map(up => (
                        <div style={{ flexDirection: "row" }}>
                          <div style={{}}> product name </div>
                          <div>{up.product.name}</div>
                          <div>{up.qt} </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )*/}
                    <ExpansionPanel
                      expanded={expanded === "panel1"}
                      onChange={this.handleChange("panel1")}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                          Bag data
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                          General data
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          time :{" "}
                          {data.userBag
                            ? data.userBag.updatedAt
                                .replace("T", " ")
                                .replace("Z", " ")
                            : ""}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      expanded={expanded === "panel2"}
                      onChange={this.handleChange("panel2")}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                          User phone number
                        </Typography>
                        <Typography
                          className={classes.secondaryHeading}
                        ></Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          phone:{data.userBag ? data.userBag.user.phone : " "}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      expanded={expanded === "panel3"}
                      onChange={this.handleChange("panel3")}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                          user location
                        </Typography>
                        <Typography
                          className={classes.secondaryHeading}
                        ></Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          location :{" "}
                          {get(data, "userBag.location", false) ? (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${data.userBag.location.lat},${data.userBag.location.long}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              user location link
                            </a>
                          ) : (
                            `test`
                          )}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      expanded={expanded === "panel4"}
                      onChange={this.handleChange("panel4")}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                          products details
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div style={{ flexDirection: "row" }}>
                          {data.userBag ? (
                            data.userBag.userProducts.map(up => (
                              <Card className={classes.card}>
                                <CardContent>
                                  <Typography
                                    className={classes.title}
                                    color="textSecondary"
                                    gutterBottom
                                  >
                                    {up.product.name}
                                  </Typography>

                                  <Typography
                                    className={classes.pos}
                                    color="textSecondary"
                                  >
                                    quantity : {up.qt}
                                  </Typography>
                                  <Typography component="p">
                                    total :{" "}
                                    {(up.qt * up.product.price).toFixed(2)}
                                  </Typography>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    {
                      <Mutation mutation={Confirm}>
                        {(mutation, { data }) => (
                          <Button
                            color="primary"
                            onClick={async () => {
                              await mutation({
                                variables: { id: this.state.id }
                              });
                              this.setState({ visible: false });
                              this.props.refetch({
                                variables: { id: this.state.id }
                              });
                            }}
                          >
                            Confirm
                          </Button>
                        )}
                      </Mutation>
                    }
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
