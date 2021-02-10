import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { fetchListNames } from "../../redux";

var isEmpty = require("is-empty");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteList({ open, handleClose, list, username, fetchListNames }) {
  const [listName, setListName] = useState("");
  const deleteList = () => {
    axios
      .delete("/lists/deletelist", {
        params: {
          listid: list.id,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          console.log("error");
        } else {
          console.log("Success");
        }
      });
    setListName("");
    fetchListNames(username);
    handleClose();
  };
  console.log(listName.toLowerCase() === list.listname.toLowerCase());
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        setListName("");
      }}
      aria-labelledby="Delete List"
      TransitionComponent={Transition}
    >
      <DialogTitle style={{ cursor: "move" }} disableTypography={true}>
        <Typography variant="h4">Delete "{list.listname}" List</Typography>
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 80 }}>
        <Typography variant="p">
          To delete list enter list name below and press "DELETE"
        </Typography>
        <TextField
          value={listName}
          onChange={(event) => setListName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          // size="large"
          disableElevation
          color="primary"
          aria-label="large outlined primary button group"
        >
          <Button
            onClick={() => {
              handleClose();
              setListName("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteList}
            disabled={
              isEmpty(list)
                ? true
                : listName.toLowerCase() === list.listname.toLowerCase()
                ? false
                : true
            }
          >
            DELETE
          </Button>
        </ButtonGroup>
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
export default connect(mapStateToProps, mapDispatchToProps)(DeleteList);
