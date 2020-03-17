import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Table from "components/Table/Table";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import CustomTabs from "components/CustomTabs/CustomTabs";

import FiberNew from "@material-ui/icons/FiberNew";
import AddBox from "@material-ui/icons/AddBox";
import Send from "@material-ui/icons/Send";

import Add from "./add";
import Basic from "./createtask";

import TasksTable from "./tasksTable";
import Button from "components/CustomButtons/Button";
const Tasks = gql`
  {
    tasks(orderBy: name_ASC) {
      id
      name
      taskScore
      createdAt
      mytasks {
        id
      }
    }
  }
`;
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);
const JsonTolist = arg => {
  return Object.values(arg.tasks).map(task => [
    task.id,
    task.name,
    task.taskScore.toString(),
    `${task.createdAt.split("T")[0]} ${task.createdAt.split("T")[1]}`,
    task.mytasks.length
  ]);
};
export default function TableList() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    localStorage.clear();
  }, []);
  const { loading, error, data } = useQuery(Tasks);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let tasks = JsonTolist(data);
  //localStorage.setItem("taskContent", "");
  console.log(tasks);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          title="Create Task :"
          headerColor="primary"
          tabs={[
            {
              tabName: "Define",
              tabIcon: FiberNew,
              tabContent: <Basic />
            },
            {
              tabName: "Add content ",
              tabIcon: AddBox,
              tabContent: <Add />
            },
            {
              tabName: "Submit",
              tabIcon: Send,
              tabContent: (
                <div>
                  <h4>
                    by submiting this task , it will be added to all signed
                    users's feed !
                  </h4>
                  <Button color="primary" round>
                    Submit
                  </Button>
                </div>
              )
            }
          ]}
        />
      </GridItem>

      <TasksTable data={tasks} />
    </GridContainer>
  );
}
