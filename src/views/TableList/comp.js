import React from "react";

import {
  TextField,
  IconButton,
  Grid,
  FormGroup,
  ListItemText,
  ExpansionPanelActions,
  Divider,
  Button
} from "@material-ui/core/";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem
} from "@material-ui/core";

import { ExpandMore, AddCircleOutline, Subject } from "@material-ui/icons";
import { gql } from "apollo-boost";
import { Mutation } from "@apollo/react-components";

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
class Levels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      levels: []
    };

    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleAddClick(newLevel) {
    let levels = this.state.levels;

    levels.push(newLevel);

    //localStorage.setItem("questions",JSON.stringify)
    this.setState({
      levels: levels
    });
  }

  render() {
    //console.log(this.state.levels);
    return (
      <MainFieldCreator
        fieldName="Questions"
        fieldType="levels"
        newField="Question"
        onAddClick={this.handleAddClick}
        //data={this.state.levels}
      >
        {wasCreated => {
          const levels = wasCreated.levels;
          return (
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {levels.map(level => (
                  <Grid key={level} item width="100%">
                    <Level key={level} levelName={level} />
                  </Grid>
                ))}
              </Grid>
            </div>
          );
        }}
      </MainFieldCreator>
    );
  }
}

class Level extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: this.props.levelName,
      subjects: []
    };

    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleAddClick(subjectsOrClassrooms) {
    for (let key in subjectsOrClassrooms) {
      this.setState({
        [key]: subjectsOrClassrooms[key]
      });
    }

    if (this.props.onAddClick) {
      this.props.onAddClick(this.state);
    }
  }

  render() {
    //console.log(this.state);
    //this.props.addContent(this.state)
    return (
      <CreateSubjects
        questionname={this.props.levelName}
        onAddClick={this.handleAddClick}
        data={this.state}
      />
    );
  }
}

function CreateSubjects(props) {
  return (
    <MainFieldCreator
      data={props.data}
      fieldType="subjects"
      fieldName={props.questionname}
      newField="Option"
      onAddClick={state => props.onAddClick(state)}
    >
      {wasCreted => {
        let subjects = wasCreted.subjects;
        return (
          <List>
            {subjects.map(subject => (
              <ListItem key={subject}>
                {<Subject />}
                {". " + subject}
              </ListItem>
            ))}
          </List>
        );
      }}
    </MainFieldCreator>
  );
}

class MainFieldCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [this.props.fieldType]: []
    };

    this.handleAddField = this.handleAddField.bind(this);
  }

  handleAddField(newField) {
    const fieldType = this.props.fieldType;
    let newFields = this.state[fieldType];
    //console.log(newField);
    //console.log(this.props.newField);
    newFields.push(newField);
    this.setState({
      [fieldType]: newFields
    });

    if (this.props.onAddClick) {
      this.props.onAddClick(this.state);
    }
  }

  render() {
    const fieldName = this.props.fieldName;
    const fieldType = this.props.fieldType;
    //console.log(fieldType) ;
    const countItems = this.state[fieldType].length;
    const newField = this.props.newField;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <ListItemText
            primary={fieldName}
            secondary={`(${countItems}) items`}
          />
        </ExpansionPanelSummary>
        <Divider light />

        <ExpansionPanelDetails style={{ backgroundColor: "#fcf9f2" }}>
          {this.props.children(this.state)}
        </ExpansionPanelDetails>

        <Divider light />

        <ExpansionPanelActions>
          <Grid item xs={12}>
            <AddNewField
              label={"Add new " + newField}
              helperText={"Enter " + newField}
              onAddClick={this.handleAddField}
              fieldType={this.props.newField}
              question={this.props.fieldName}
            />
          </Grid>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

class AddNewField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleAddClick(mutation) {
    let { fieldType, question } = this.props;
    if (this.props.onAddClick) {
      this.props.onAddClick(this.state.value);
      // go with this function to mutate

      if (fieldType === "Question") {
        // get data
        //console.log(localStorage.getItem("taskID"));
        //let questionText = this.state.value;
        mutation({
          variables: {
            questionText: this.state.value,
            taskid: localStorage.getItem("taskID")
          }
        }).then(({ data }) => {
          console.log(data);
          localStorage.setItem(
            data.createQuestion.questionText,
            data.createQuestion.id
          );
        });
        // mutate
        //localStorage.setItem(data.questionText,data.id)
      } else {
        // console.log(localStorage.getItem(question));
        mutation({
          variables: {
            optionText: this.state.value,
            questionid: localStorage.getItem(question)
          }
        });
        // console.log(mutation);
      }
      this.setState({
        value: ""
      });
    }
    //console.log(this.state.value); //mutation content
    //console.log(this.props.fieldType); //choose the mutation option or question
    //console.log(this.props.question); // if option give question id ? (we have just question text)
    //sol : if create question store question text and id
    // to create option // retrieve question id by question text then mutate
  }

  render() {
    let disabled = !this.state.value ? true : false;
    let mutation =
      this.props.fieldType == "Question" ? createQuestion : createOption;
    return (
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <TextField
            fullWidth={true}
            label={this.props.label}
            value={this.state.value}
            variant="outlined"
            placeholder={this.props.helperText}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Mutation mutation={mutation}>
            {(mutation, { data }) => (
              <IconButton
                disabled={disabled}
                onClick={() => this.handleAddClick(mutation)}
              >
                <AddCircleOutline />
              </IconButton>
            )}
          </Mutation>
        </Grid>
      </Grid>
    );
  }
}

export default Levels;
