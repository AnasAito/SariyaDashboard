import React, { useEffect } from "react";

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
import ProductTable from "./productList";
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
const Products = gql`
  {
    products {
      id
      name
      price
      published
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
const JsonTolistp = arg => {
  return Object.values(arg.products).map(product => [
    product.id,
    product.name,
    product.price,
    product.published
  ]);
};
export default function TableList() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const { loading, error, data } = useQuery(Tasks);
  const { loading: loadingp, data: datap } = useQuery(Products);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let tasks = JsonTolist(data);
  //localStorage.setItem("taskContent", "");
  let products = JsonTolistp(datap);
  console.log(products);
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
            },
            {
              tabName: "Submit to Store",
              tabIcon: Send,
              tabContent: (
                <div>
                  <h4>
                    by submiting this Product , it will be added to all signed
                    users's store !
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
      <ProductTable data={products} />
    </GridContainer>
  );
}
