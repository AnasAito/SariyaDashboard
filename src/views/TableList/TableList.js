import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

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
    userBags(where: { published: true }) {
      id
      user {
        phone
        name
      }
      updatedAt
      userProducts {
        id
      }
    }
  }
`;

const JsonTolist = arg => {
  return Object.values(arg.userBags).map(bag => [
    bag.id,
    bag.user.name,
    bag.user.phone,
    bag.userProducts.length.toString(),
    bag.updatedAt.replace("T", " ")
  ]);
};
export default function TableList() {
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
