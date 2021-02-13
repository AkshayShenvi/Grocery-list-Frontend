import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { fetchListNames } from "../../redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditListNameComponent({
  open,
  handleClose,
  list,
  fetchListNames,
  username,
}) {
  const [listName, setListName] = useState("");
  function changeListName() {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/lists/updatelistname`, {
        listid: list.id,
        listname: listName,
      })
      .then((res) => {
        if (res.status !== 200) {
          console.log("error");
        } else {
          console.log("Success");
        }

        fetchListNames(username);
        handleClose();
      });
  }
  useEffect(() => {
    setListName(list.listname);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Edit List Name"
      TransitionComponent={Transition}
    >
      <DialogTitle style={{ cursor: "move" }} disableTypography={true}>
        <Typography variant="h4">Edit List Name</Typography>
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 80 }}>
        <TextField
          id="outlined-basic"
          value={listName}
          onChange={(event) => {
            setListName(event.target.value);
          }}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={changeListName}>SAVE</Button>
      </DialogActions>
    </Dialog>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListNames: (user) => dispatch(fetchListNames(user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditListNameComponent);
