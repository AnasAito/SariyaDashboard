import React, { useEffect } from "react";

// core components

import GridContainer from "components/Grid/GridContainer";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import ProductTable from "./productList";

const Products = gql`
  {
    products(orderBy: createdAt_DESC) {
      id
      name
      price
      published
    }
  }
`;

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

  const { loading, error, data, refetch } = useQuery(Products);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  //localStorage.setItem("taskContent", "");
  let products = JsonTolistp(data);

  return (
    <GridContainer>
      <ProductTable data={products} refetch={refetch} />
    </GridContainer>
  );
}
