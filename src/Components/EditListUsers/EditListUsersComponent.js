import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { Multiselect } from "multiselect-react-dropdown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditListUsersComponent({ open, handleClose, list, auth }) {
  const [allUsers, setAllUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  // const [selectedUser, setSelecteduser] = useState([]);
  const updateListUsers = (listuser) => {
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/lists/updatelistusers`,
        {
          listid: list.id,
          listusers: listuser,
        }
      )
      .then((res) => {
        getListUsers();
        if (res.status !== 200) {
          console.log("error");
        } else {
          console.log("Success");
        }
      });
  };
  const getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/getusers`, {})
      .then((res) => {
        const data = res.data.filter((users) => users._id !== auth.user.id);

        setAllUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getListUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/lists/getlistusers`, {
        params: {
          listid: list.id,
        },
      })
      .then((res) => {
        const listusers = res.data.listUsers;
        setListUsers(listusers);
        // console.log(res.data.listUsers, allUsers, list.listname);

        // const data= allUsers.filter(user=>{
        //   return listusers.findIndex(listuser=> user._id === listuser._id) === -1
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    getListUsers();
  }, [allUsers]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Edit List Users"
      TransitionComponent={Transition}
    >
      <DialogTitle style={{ cursor: "move" }} disableTypography={true}>
        <Typography variant="h4">Edit Users for {list.listname}</Typography>
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 80 }}>
        <Multiselect
          options={allUsers}
          displayValue="name"
          selectedValues={listUsers}
          onSelect={(selectedList, selectedItem) => {
            // setSelecteduser(selectedList);
            updateListUsers(selectedList);
            // console.log(selectedList)
          }}
          onRemove={(selectedList, removedItem) => {
            // setSelecteduser(selectedList);
            updateListUsers(selectedList);
            // console.log(selectedList)
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, null)(EditListUsersComponent);
