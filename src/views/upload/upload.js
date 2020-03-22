import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase";
import { gql } from "apollo-boost";
import { Mutation } from "@apollo/react-components";
var config = {
  apiKey: "AIzaSyBPo2Est2rxzFPJ9ve1BY-_uCyDgU4k1-4",
  authDomain: "saira-68617.firebaseapp.com",
  databaseURL: "https://saira-68617.firebaseio.com",
  projectId: "saira-68617",
  storageBucket: "saira-68617.appspot.com",
  messagingSenderId: "1023913934900",
  appId: "1:1023913934900:web:9d0da50945a8a7286b8a61"
};
firebase.initializeApp(config);

const ADD_Images = gql`
  mutation AddImages($id: ID!, $images: [String!]!) {
    updateProduct(where: { id: $id }, data: { images: { set: $images } }) {
      id
    }
  }
`;
class Upload extends Component {
  state = {
    image: "",
    imageURL: "",
    progress: 0,
    imagelist: [],
    step: 1,
    id: ""
  };
  componentDidMount = async () => {
    let id = await localStorage.getItem("ProductID");
    this.setState({ id: id });
  };
  handleUploadStartagain = () => {
    this.setState({
      image: "",
      imageURL: "",
      progress: 0,
      imagelist: [],
      step: this.state.step + 1
    });
  };

  handleUploadStart = () => {
    this.setState({
      progress: 0
    });
  };

  render() {
    console.log(this.state.imagelist);
    return (
      <div>
        <div>
          <Typography variant="button" display="block" gutterBottom>
            Use Upload image to add product images ,when finished click submit !
          </Typography>
        </div>

        <div style={{ marginTop: 15 }}>
          {this.state.imagelist.length < 4 && (
            <label
              onClick={() => {}}
              style={{
                backgroundColor: "#9c27b0",
                color: "white",
                padding: 10,
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Upload Image ({this.state.imagelist.length + 1})
              <FileUploader
                hidden
                accept="image/*"
                name="image"
                storageRef={firebase.storage().ref("import")}
                onUploadStart={this.handleUploadStart}
                onUploadSuccess={filename => {
                  this.setState({
                    image: filename,
                    progress: 100
                  });
                  this.setState(prevState => ({
                    image: filename,
                    progress: 100
                  }));
                  firebase
                    .storage()
                    .ref("import")
                    .child(filename)
                    .getDownloadURL()
                    .then(url => {
                      this.setState(prevState => ({
                        imageURL: url,
                        imagelist: [...prevState.imagelist, url]
                      }));
                    });
                }}
              />
            </label>
          )}
        </div>

        <div style={{ marginTop: 40 }}>
          <LinearProgress
            color="#9c27b0"
            variant="determinate"
            value={this.state.progress}
          />
        </div>
        <div
          style={{
            marginTop: 40,
            marginLeft: 1000,
            marginRight: 5,
            backgroundColor: "#9c27b0",
            color: "white"
          }}
        ></div>
        {this.state.progress == 100 ? (
          <Mutation mutation={ADD_Images}>
            {(mutation, { data }) => (
              <Button
                style={{ backgroundColor: "#9c27b0", color: "white" }}
                variant="contained"
                onClick={() =>
                  mutation({
                    variables: {
                      id: this.state.id,
                      images: this.state.imagelist
                    }
                  })
                }
              >
                submit
              </Button>
            )}
          </Mutation>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Upload;
