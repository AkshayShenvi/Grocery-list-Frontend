import React, { useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { TextField, Button, Avatar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router";
import {
  changeName,
  changeEmail,
  changePassword,
  changePassword2,
  // changeErrors,
  registerUser,
} from "../redux";

const register = {
  alignContent: "centre",
};
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Register({
  name,
  email,
  password,
  password2,
  auth,
  error,
  changeName,
  changeEmail,
  changePassword,
  changePassword2,

  registerUser,
}) {
  const history = useHistory();
  const classes = useStyles();
  const handleInputChange = (event) => {
    // console.log(event.target.id)
    const value = event.target.value;
    if (event.target.id === "name") {
      changeName(value);
    } else if (event.target.id === "email") {
      changeEmail(value);
    } else if (event.target.id === "password1") {
      changePassword(value);
    } else if (event.target.id === "password2") {
      changePassword2(value);
    }
    // console.log(name, email, password, password2);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    changeName("");
    changeEmail("");
    changePassword("");
    changePassword2("");
    // console.log(newUser);
    registerUser(newUser, history);
  };

  // useEffect({});

  return (
    <div style={register}>
      <Card
        style={{
          width: "25rem",
          margin: "0 auto",
          marginTop: "10rem",
          padding: "2em",
          textAlign: "center",
        }}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h4 style={{ marginBottom: "1rem" }}>Register</h4>

        <Form>
          <Form.Group>
            <TextField
              onChange={handleInputChange}
              required
              autoFocus
              fullWidth={true}
              color={"primary"}
              id="name"
              label="Name"
              type={"text"}
              variant="outlined"
              value={name}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <TextField
              onChange={handleInputChange}
              required
              fullWidth={true}
              color={"primary"}
              id="email"
              label="Email"
              type={"email"}
              variant="outlined"
              value={email}
            />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <TextField
              onChange={handleInputChange}
              required
              fullWidth={true}
              color={"primary"}
              id="password1"
              label="Password"
              type={"password"}
              variant="outlined"
              value={password}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <TextField
              onChange={handleInputChange}
              required
              fullWidth={true}
              color={"primary"}
              id="password2"
              label="Retype Password"
              type={"password"}
              variant="outlined"
              value={password2}
            />
          </Form.Group>

          <Button
            fullWidth
            color={"primary"}
            variant={"contained"}
            type="button"
            onClick={handleSubmit}
            // style={{
            //   margin: theme.spacing(3, 0, 2),
            // }}
          >
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    name: state.registeration.name,
    email: state.registeration.email,
    password: state.registeration.password,
    password2: state.registeration.password2,
    auth: state.auth,
    error: state.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeName: (name) => dispatch(changeName(name)),
    changeEmail: (email) => dispatch(changeEmail(email)),
    changePassword: (password) => dispatch(changePassword(password)),
    changePassword2: (password2) => dispatch(changePassword2(password2)),

    registerUser: (newUser, hist) => dispatch(registerUser(newUser, hist)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
