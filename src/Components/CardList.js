import React, { useState, useEffect } from "react";
// ----------------------------- Redux Imports ---------------------------------------
import { connect } from "react-redux";
import { fetchListNames } from "../redux";
// ----------------------------- Network imports -------------------------------------

// ----------------------------- Component Imports -----------------------------------
import CardComponent from "./CardComponent";
import { Button, FormGroup, TextField, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "react-bootstrap/Container";
import EditListUsersComponent from "./EditListUsers/EditListUsersComponent";
import Card from "react-bootstrap/Card";
import CreateListDialogComponent from "./CreateListDialogComponent";
import Popup from "reactjs-popup";
import Divider from "@material-ui/core/Divider";
import isEmpty from "is-empty";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Fab from "@material-ui/core/Fab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dropdown from "react-bootstrap/Dropdown";

function CardList({ fetchListNames, listData, auth }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let name = isEmpty(auth.user) ? "" : auth.user.name;

    fetchListNames(name);
  }, []);
  const useStyles = makeStyles({
    root: {
      maxWidth: 200,
      textAlign: "center",
      margin: "0 auto",
      marginTop: "10%",
    },
  });

  const handleClose = () => {
    setOpen(false);
    let name = isEmpty(auth.user) ? "" : auth.user.name;
    fetchListNames(name);
  };
  return (
    <div style={{ align: "center", display: "flex", marginTop: "5rem" }}>
      {/* <Container fluid> */}
      <CreateListDialogComponent
        open={open}
        handleClose={handleClose}
        user={auth.user}
      />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid
          lg={3}
          md={3}
          sm={6}
          container
          item
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            {" "}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Create List
            </Button>
          </Grid>
        </Grid>

        <Grid
          lg={9}
          md={9}
          sm={6}
          item
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {listData.listNames.map((element) => (
            <Grid item key={element.id} style={{ position: "relative" }}>
              <CardComponent
                list={element}
                id={element.id}
                username={auth.user.name}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* </Container> */}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    listData: state.listNames,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListNames: (user) => dispatch(fetchListNames(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardList);
