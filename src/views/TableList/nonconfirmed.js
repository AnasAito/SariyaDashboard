import React, { useEffect } from "react";

// core components

import GridContainer from "components/Grid/GridContainer";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import TasksTable from "./tasksTable";

const Tasks = gql`
  {
    d1: userBags(
      where: { published: true, confirmed: false }
      orderBy: updatedAt_DESC
    ) {
      id
      confirmed
      user {
        phone
        name
      }
      updatedAt
      userProducts {
        id
      }
    }
    d2: userBags(
      where: { published: true, confirmed: true }
      orderBy: updatedAt_DESC
    ) {
      id
      confirmed
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

const JsonTolist1 = arg => {
  let t1 = Object.values(arg.d1).map(bag => [
    bag.id,
    bag.user.name,
    bag.user.phone,
    bag.userProducts.length.toString(),
    bag.updatedAt.replace("T", " ").replace("Z", " "),
    bag.confirmed.toString()
  ]);
  let t2 = Object.values(arg.d2).map(bag => [
    bag.id,
    bag.user.name,
    bag.user.phone,
    bag.userProducts.length.toString(),
    bag.updatedAt.replace("T", " ").replace("Z", " "),
    bag.confirmed.toString()
  ]);
  return [...t1];
};
const JsonTolist2 = arg => {
  let t2 = Object.values(arg.d2).map(bag => [
    bag.id,
    bag.user.name,
    bag.user.phone,
    bag.userProducts.length.toString(),
    bag.updatedAt.replace("T", " ").replace("Z", " "),
    bag.confirmed.toString()
  ]);
  return [...t2];
};

export default function BagsPagen() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const { loading, error, data, refetch } = useQuery(Tasks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let tasks = JsonTolist1(data);
  let tasks2 = JsonTolist2(data);
  return (
    <GridContainer>
      <TasksTable data={tasks2} refetch={refetch} name="Confirmed bags" />
    </GridContainer>
  );
}
