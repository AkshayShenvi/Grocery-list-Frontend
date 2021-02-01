import React, { useEffect, useState } from "react";
import isEmpty from "is-empty";
// ----------------------------------------- Component Imports ----------------------------------------------
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormHelperText,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
// ---------------------------------------- CSS Imports ----------------------------------------------------
import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
// ---------------------------------------- Redux imports ---------------------------------------------------
import { changeEmail, changePassword, loginUser, changeTheme } from "../redux";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Akshay Shenvi
      </Link>{" "}
      2020
      {"."}
    </Typography>
  );
}

// Styling
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
  },
  avatar: {
    margin: theme.spacing(1),

    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn({
  isdark,
  email,
  password,
  changeEmail,
  changePassword,
  loginUser,
  auth,
  errors,
  changeTheme,
}) {
  const history = useHistory();
  const classes = useStyles();
  let [validationError, setValidationError] = useState({
    emailerror: false,
    passworderror: false,
  });
  // let [passwordError,setPasswordError] = useState(false)
  // Hooks
  function darkMode() {
    if (isdark) {
      return "primary";
    } else {
      return "light";
    }
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      // console.log(auth.user.name)
      history.push("/card");
      // history.go(0)
    }
    if (!isEmpty(errors)) {
      if (errors.hasOwnProperty("emailnotfound")) {
        setValidationError({ ...validationError, emailerror: true });
      } else if (errors.hasOwnProperty("passwordincorrect")) {
        setValidationError({ ...validationError, passworderror: true });
      }
    } else {
      setValidationError({ emailerror: false, passworderror: false });
    }
  }, [auth, errors]);

  // Event Functions
  const handleInputChange = (event) => {
    // console.log(event.target.id)
    const value = event.target.value;
    if (event.target.id === "email") {
      changeEmail(value);
    } else if (event.target.id === "password1") {
      changePassword(value);
    }
  };

  const handleSubmit = (event) => {
    const userData = {
      email: email,
      password: password,
    };
    changeEmail("");
    changePassword("");
    // console.log(userData);
    loginUser(userData);
  };

  return (
    <div>
      <Card
        style={{
          width: "25rem",
          margin: "0 auto",
          marginTop: "10rem",
          padding: "2em",
          textAlign: "center",
          backgroundColor: "#5CDB95",
        }}
        // bg={darkMode()}
        bsPrefix="signin-card rounded shadow"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <form className={"form1"} noValidate>
              <Typography
                component="h1"
                variant="h5"
                color={isdark ? "info" : "primary"}
              >
                Sign in
              </Typography>
              <TextField
                error={validationError.emailerror}
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleInputChange}
                className={classes.email}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              />
              {validationError.emailerror ? (
                <FormHelperText error={true} children={"Incorrect Email"} />
              ) : null}

              <TextField
                error={validationError.passworderror}
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={password}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              />
              {validationError.passworderror ? (
                <FormHelperText error={true} children={"Incorrect Password"} />
              ) : null}
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isdark: state.navigation.darkMode,
    email: state.registeration.email,
    password: state.registeration.password,
    auth: state.auth,
    errors: state.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeEmail: (email) => dispatch(changeEmail(email)),
    changePassword: (password) => dispatch(changePassword(password)),
    loginUser: (userData) => dispatch(loginUser(userData)),
    changeTheme: (theme) => dispatch(changeTheme(theme)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
