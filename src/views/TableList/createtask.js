// Render Prop
import React from "react";
import { Formik, Form, Field } from "formik";

import Button from "components/CustomButtons/Button";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import Snackbar from "components/Snackbar/Snackbar";
import Done from "@material-ui/icons/Done";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    // width: 200
  }
}));

const create_Task = gql`
  mutation createTask(
    $name: String!
    $type: String!
    $taskScore: Int!
    $desc: String
  ) {
    createTask(
      data: {
        name: $name
        taskScore: $taskScore
        type: $type
        description: $desc
      }
    ) {
      id
      type
    }
  }
`;
const Basic = () => {
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const [tc, setTC] = React.useState(false);
  const [notype, setnotype] = React.useState("success");
  const showNotification = () => {
    setTC(true);
    setTimeout(function() {
      setTC(false);
    }, 6000);
  };
  const [createTask, { data }] = useMutation(create_Task);
  const classes = useStyles();
  const type = ({ field, form, ...props }) => {
    return (
      <TextField
        required
        id="standard-required"
        label="TYPE"
        // defaultValue="Task type "
        className={classes.textField}
        margin="normal"
        {...field}
        {...props}
      />
    );
  };
  const name = ({ field, form, ...props }) => {
    return (
      <TextField
        required
        id="standard-required"
        label="Name"
        //defaultValue="Task name"
        className={classes.textField}
        margin="normal"
        {...field}
        {...props}
      />
    );
  };
  const score = ({ field, form, ...props }) => {
    return (
      <TextField
        required
        id="standard-required"
        label="Score"
        //defaultValue="Task score "
        className={classes.textField}
        margin="normal"
        {...field}
        {...props}
      />
    );
  };
  const desc = ({ field, form, ...props }) => {
    return (
      <TextField
        multiline
        fullWidth={true}
        id="standard-required"
        label="Description"
        rows="4"
        //defaultValue="Task description"
        className={classes.textField}
        margin="normal"
        {...field}
        {...props}
      />
    );
  };
  return (
    <>
      <Formik
        initialValues={{ taskname: "", type: "", score: "", desc: "" }}
        onSubmit={values => {
          // console.log(values);
          let { taskname, type, score, desc } = values;
          createTask({
            variables: {
              name: taskname,
              type: type,
              taskScore: parseInt(score),
              desc: desc
            }
          })
            .then(({ data }) => {
              //console.log(data.createTask.id);
              localStorage.setItem("taskID", data.createTask.id);
              localStorage.setItem("type", data.createTask.type);
              setnotype("success");
              showNotification();
            })
            .catch(function(e) {
              console.log(values);
              console.log(e.message);
              setnotype("danger");

              showNotification();
            });
          //console.log(data);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Field name="taskname" component={name} />
                </Grid>
                <Grid item xs={4}>
                  <Field name="score" component={score} />
                </Grid>
                <Grid item xs={4}>
                  <Field name="type" component={type} />
                </Grid>
                <Grid item xs={10}>
                  <Field name="desc" component={desc} />
                </Grid>

                <Grid item xs={12}>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {" "}
                    Create Task
                  </Button>
                  <Snackbar
                    place="tc"
                    color={notype}
                    icon={notype === "success" ? Done : ErrorOutline}
                    message={
                      notype === "success"
                        ? "task created succesfuly"
                        : "task creation failed"
                    }
                    open={tc}
                    closeNotification={() => {
                      console.log(notype);
                      setTC(false);
                    }}
                    close
                  />
                </Grid>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Basic;
