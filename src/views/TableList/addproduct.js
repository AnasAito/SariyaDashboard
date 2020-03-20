import React, { useEffect } from "react";

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import CustomTabs from "components/CustomTabs/CustomTabs";

import FiberNew from "@material-ui/icons/FiberNew";
import AddBox from "@material-ui/icons/AddBox";
import Send from "@material-ui/icons/Send";

import Add from "./add";
import Basic from "./createtask";

import Button from "components/CustomButtons/Button";

export default function AddProducts() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  //localStorage.setItem("taskContent", "");

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          title="Create Product :"
          headerColor="primary"
          tabs={[
            {
              tabName: "Define",
              tabIcon: FiberNew,
              tabContent: <Basic />
            },
            {
              tabName: "Add Images ",
              tabIcon: AddBox,
              tabContent: <Add />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
