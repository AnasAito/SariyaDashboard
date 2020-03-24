import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "components/CustomButtons/Button.jsx";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Product = gql`
  query product($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      description
      images
    }
  }
`;
const Update = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $description: String!
    $price: Float!
  ) {
    updateProduct(
      where: { id: $id }
      data: { name: $name, description: $description, price: $price }
    ) {
      id
    }
  }
`;
export default function Modify({ id, refetch }) {
  const { loading, data } = useQuery(Product, {
    variables: { id: id },
    fetchPolicy: "cache-and-network"
  });
  const [mutate] = useMutation(Update);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [disable, setdisable] = useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {!loading ? (
        <GridContainer>
          <GridItem xs={6}>
            <TextField
              label="name"
              defaultValue={data.product ? data.product.name : " "}
              onChange={e => setName(e.target.value)}
            />
          </GridItem>
          <GridItem xs={6}>
            <TextField
              label="Price"
              defaultValue={data.product ? data.product.price : " "}
              onChange={e => setPrice(parseFloat(e.target.value))}
            />
          </GridItem>
          <GridItem xs={12} style={{ marginTop: 30 }}>
            <TextField
              label="Description"
              defaultValue={data.product ? data.product.description : " "}
              multiline
              rows="4"
              fullWidth
              onChange={e => setDescription(e.target.value)}
            />
          </GridItem>
          <GridItem xs={12} style={{ marginTop: 30 }}></GridItem>
          <GridItem xs={12} style={{ marginTop: 30 }}>
            <Button
              disable={disable}
              color="info"
              className="like"
              onClick={async () => {
                setdisable(true);
                await mutate({
                  variables: {
                    id: id,
                    name: name === "" ? data.product.name : name,
                    price: price == 0 ? data.product.price : price,
                    description:
                      description === ""
                        ? data.product.description
                        : description
                  }
                }).then(data => setdisable(false));

                refetch({ variables: { id: Math.random() } });
              }}
            >
              Update Product
            </Button>
          </GridItem>
        </GridContainer>
      ) : (
        <>
          <CircularProgress variant="determinate" value={progress} />
        </>
      )}
    </>
  );
}
