import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import {
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditListUsersComponent from "./EditListUsers/EditListUsersComponent";
import EditListNameComponent from "./EditListNameComponent/EditListNameComponent";
import DeleteList from "./DeleteList/DeleteList";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    textAlign: "center",

    backgroundColor: "#edf5e1",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: { margin: "0 auto" },
});

function CardComponent({ list, id, username }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditListName, setEditListName] = useState(false);
  const [openEditUsers, setOpenEditUsers] = useState(false);
  const [openDeleteList, setOpenDeleteList] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const classes = useStyles();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditUsersClose = () => {
    setOpenEditUsers(false);

    setAnchorEl(null);
  };
  const handleEditListNameClose = () => {
    setEditListName(false);
    setAnchorEl(null);
  };
  const handleDeleteListClose = () => {
    setOpenDeleteList(false);
    setAnchorEl(null);
  };
  return (
    <Box m={1} p={0} boxShadow={3} borderRadius={16}>
      <Card className={classes.root} boxShadow={3}>
        <CardContent style={{ paddingTop: 30 }}>
          <Button
            color="primary"
            style={{ position: "absolute", top: 0, right: 0, border: "0px" }}
            onClick={handleMenuClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setOpenEditUsers(true);
              }}
            >
              Edit List Users
            </MenuItem>
            <MenuItem
              onClick={() => {
                setEditListName(true);
              }}
            >
              Edit List Name
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenDeleteList(true);
              }}
            >
              Delete List
            </MenuItem>
          </Menu>
          <EditListUsersComponent
            open={openEditUsers}
            handleClose={handleEditUsersClose}
            list={list}
          />
          <EditListNameComponent
            open={openEditListName}
            handleClose={handleEditListNameClose}
            list={list}
            username={username}
          />
          <DeleteList
            open={openDeleteList}
            handleClose={handleDeleteListClose}
            list={list}
            username={username}
          />
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            {list.listname}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            component={Link}
            to={"/list/" + list.listname + "/" + id}
            color="primary"
            variant="outlined"
            size="small"
          >
            Open list
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default CardComponent;
