import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";
import Slide from "@material-ui/core/Slide";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styles from "../CSS/modal.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateListDialogComponent({ open, handleClose, user }) {
  const [newListName, setNewListName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelecteduser] = useState([]);
  const getUsers = () => {
    axios({
      method: "get",
      url: "/api/users/getusers",
      baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
    })
      // axios
      //   .get("https://grocery-list-app-backend.herokuapp.com/api/users/getusers", {})
      .then((res) => {
        const data = res.data.filter((users) => users._id !== user.id);

        setAllUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createList = async () => {
    await axios({
      method: "post",
      url: "/lists/createlist",
      baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
      data: {
        users: [{ _id: user.id, name: user.name }, ...selectedUser],
        listname: newListName,
      },
    })
      // axios
      //   .post("https://grocery-list-app-backend.herokuapp.com/lists/createlist", {
      //     users: [{ _id: user.id, name: user.name }, ...selectedUser],
      //     listname: newListName,
      //   })
      .then((res) => {
        setNewListName("");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Create New List"
      TransitionComponent={Transition}
      style={{ padding: 20 }}
    >
      <DialogTitle style={{ cursor: "move" }} disableTypography={true}>
        <Typography variant="h4">Create A New List</Typography>
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 80 }}>
        <TextField
          autoFocus
          margin="dense"
          label="List Name"
          type="text"
          value={newListName}
          onChange={(event) => {
            setNewListName(event.target.value);
          }}
          fullWidth
        />
        <Multiselect
          options={allUsers}
          displayValue="name"
          onSelect={(selectedList, selectedItem) => {
            setSelecteduser(selectedList);
          }}
          onRemove={(selectedList, removedItem) => {
            setSelecteduser(selectedList);
          }}
        />
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          // size="large"
          disableElevation
          color="primary"
          aria-label="large outlined primary button group"
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createList}>Create List</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
