import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase";
import { gql } from "apollo-boost";
import { Mutation } from "@apollo/react-components";
const config = {
  apiKey: "AIzaSyDMRMww-cvchgUNHXy0LIRW7a2wghh4nL0",
  authDomain: "application-upload.firebaseapp.com",
  databaseURL: "https://application-upload.firebaseio.com",
  projectId: "application-upload",
  storageBucket: "application-upload.appspot.com",
  messagingSenderId: "887334092273",
  appId: "1:887334092273:web:a3b55e2469ff5092749850",
  measurementId: "G-DDPFK2MH90"
};

const createQuestion = gql`
  mutation createQuestion($questionText: String!, $taskid: ID!) {
    createQuestion(
      data: { questionText: $questionText, task: { connect: { id: $taskid } } }
    ) {
      id
      questionText
    }
  }
`;
const createOption = gql`
  mutation createOption($optionText: String!, $questionid: ID!) {
    createOption(
      data: {
        optionText: $optionText
        question: { connect: { id: $questionid } }
      }
    ) {
      id
    }
  }
`;
const createOptionCr = gql`
  mutation createOption(
    $optionText: String!
    $questionText: String!
    $taskid: ID!
  ) {
    createOption(
      data: {
        optionText: $optionText
        question: {
          create: {
            questionText: $questionText
            task: { connect: { id: $taskid } }
          }
        }
      }
    ) {
      question {
        id
      }
    }
  }
`;
firebase.initializeApp(config);

class Upload extends Component {
  state = {
    image: "",
    imageURL: "",
    progress: 0,
    imagelist: [],
    step: 1
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
            part : {this.state.step}
          </Typography>
        </div>
        <Mutation
          mutation={
            this.state.imagelist.length == 0 ? createOptionCr : createOption
          }
        >
          {(croption, { data }) => (
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
                  Upload logo {this.state.imagelist.length + 1}
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
                          if (this.state.imagelist.length == 0) {
                            croption({
                              variables: {
                                questionText: "choose a logo ",
                                taskid: localStorage.getItem("taskID"),
                                optionText: url
                              }
                            }).then(({ data }) => {
                              console.log(data.createOption);
                              localStorage.setItem(
                                "questionID",
                                data.createOption.question.id
                              );
                            });
                            // mutate
                            //localStorage.setItem(data.questionText,data.id)
                          } else {
                            // console.log(localStorage.getItem(question));
                            console.log("next logo");
                            croption({
                              variables: {
                                questionid: localStorage.getItem("questionID"),
                                optionText: url
                              }
                            }).then(({ data }) => {
                              console.log(data);
                            });
                            // console.log(mutation);
                          }
                          this.setState(prevState => ({
                            imageURL: url,
                            imagelist: [...prevState.imagelist, url]
                          }));
                        });
                      //
                      //console.log(croption);
                    }}
                  />
                </label>
              )}
              {this.state.imagelist.length > 3 && (
                <Button variant="contained" color="gray" disabled>
                  4 logos max
                </Button>
              )}
            </div>
          )}
        </Mutation>

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
        >
          {this.state.imagelist.length > 1 && (
            <Button
              style={{ backgroundColor: "#9c27b0", color: "white" }}
              variant="contained"
              onClick={this.handleUploadStartagain}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Upload;
