import React, { useState, useEffect } from "react";
// ----------------------------- Redux Imports ---------------------------------------
import { connect } from "react-redux";
import {
  changeInput,
  changeMessage,
  toggleSnackbar,
  changeErrorStatus,
} from "../../redux";
// ----------------------------- Component Imports -----------------------------------
import ListForm from "./ListForm";
import { useParams, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Navigation from "../Navigation";
// import Tabs from "react-bootstrap/Tabs";
// import Tab from "react-bootstrap/Tab";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import OrderedList from "./OrderedList";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "bootstrap/dist/css/bootstrap.min.css";
// import {addItem } from '../API/api'
const axios = require("axios");

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      <Box>{children}</Box>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function List({
  username,
  itemsData,
  input,
  changeInput,
  message,
  changeMessage,
  open,
  toggleSnackbar,
  errStatus,
  changeErrorStatus,
}) {
  const [orderedList, setOrderedList] = useState({});
  const [value, setValue] = useState(0);
  let { listname, lid } = useParams();
  ///CSS
  const listStyles = {
    textAlign: "center",
    marginTop: "5rem",
  };
  /// API Functions
  // addItem(lid,input,username,listname,toggleSnackbar,fetchListItems,changeErrorStatus,changeMessage)

  const addItem = async () => {
    // console.log(username)
    await axios
      .post("/listdetails/additem", {
        listid: lid,
        itemname: input,
        username: username,
      })
      .then((res) => {
        // fetchNames();
        //---- fetchListItems(listname, lid);
        if (res.status !== 200) {
          changeErrorStatus("error");
          changeMessage("Could not Add Item");
          toggleSnackbar(true);
        } else {
          changeErrorStatus("success");
          changeMessage("Item Added Successfully!");
          toggleSnackbar(true);
        }
      });
  };
  const deleteItem = async (itemId) => {
    await axios
      .put("/listdetails/deleteitem", {
        listid: lid,
        id: itemId,
      })
      .then((res) => {
        // fetchNames();
        //-------- fetchListItems(listname, lid);
        if (res.status !== 200) {
          changeErrorStatus("error");
          changeMessage("Could not Delete Item");
          toggleSnackbar(true);
        } else {
          changeErrorStatus("success");
          changeMessage("Item Deleted Successfully!");
          toggleSnackbar(true);
        }
      });
  };
  // const fetchNames = async () => {
  //   await axios
  //     .get("http://localhost:3000/getlist", {
  //       params: {
  //         listname: listname,
  //         listid: lid,
  //       },
  //     })
  //     .then((res) => {
  //       setListDetails(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const fetchOrderdList = async () => {
    // console.log(lid);
    await axios
      .get("/listdetails/orderedlist", {
        params: {
          listid: lid,
          user: username,
        },
      })
      .then((res) => {
        setOrderedList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const checkItem = async (itemId, listName) => {
    await axios
      .patch("/listdetails/checkeditem", {
        listid: lid,
        itemid: itemId,
        listname: listName,
      })
      .then((res) => {
        // fetchNames();
        //----- fetchListItems(listname, lid);
        if (res.status !== 200) {
          changeErrorStatus("error");
          changeMessage("Could not switch item");
          toggleSnackbar(true);
        } else {
          changeErrorStatus("success");
          changeMessage("Item Switched Successfully!");
          toggleSnackbar(true);
        }
      });
  };
  const addToOrdered = async (lid) => {
    await axios
      .patch("/listdetails/ordered", {
        listid: lid,
      })
      .then((res) => {
        // fetchNames();
        //---- fetchListItems(listname, lid);
        if (res.status !== 200) {
          changeErrorStatus("error");
          changeMessage("Could not add to ordered");
          toggleSnackbar(true);
        } else {
          changeErrorStatus("success");
          changeMessage("Item added ot Ordered Successfully!");
          toggleSnackbar(true);
        }
      });
  };

  /// Event Functions
  function addClick(event) {
    addItem();
    // addItem(lid,input,username,listname,toggleSnackbar,fetchListItems,changeErrorStatus,changeMessage)
    changeInput("");
  }

  function orderButton(event) {
    addToOrdered(lid);
  }
  function getOrderedList() {
    fetchOrderdList();
  }
  function inputChange(event) {
    changeInput(event.target.value);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    toggleSnackbar(false);
  };
  // function addClick(event) {
  //   addItem();
  //   changeInput("");
  // }
  // console.log(lid,listId)
  useEffect(() => {
    // fetchNames();

    //----- fetchListItems(listname, lid);
    getOrderedList();
  }, []);

  function deleteEntry(event) {
    const itemId = event.currentTarget.value;

    deleteItem(itemId);
  }

  function handleChange(event, newValue) {
    if (newValue === 0) {
      getOrderedList();
    } else {
      //----- fetchListItems(listname, lid);
    }
    setValue(newValue);
  }
  return (
    <div style={listStyles}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Grid item lg={2} md={2} sm={4}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            // aria-label="Vertical tabs example"
            // className={classes.tabs}
          >
            <Tab label="Cart" {...a11yProps(0)} />
            <Tab label="Ordered List" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid item lg={10} md={10} sm={8}>
          <TabPanel value={value} index={0}>
            <div>
              <Typography variant="h3">{listname}</Typography>

              <ListForm
                // listDetails={itemsData.listDetails}
                listId={lid}
                username={username}
                input={input}
                inputChange={inputChange}
                addClick={addClick}
                // setId={setId}
                handleClick={deleteEntry}
                checkItem={checkItem}
                orderButton={orderButton}
              />
              <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity={errStatus}>
                  {message}
                </Alert>
              </Snackbar>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <OrderedList
                orderedList={orderedList}
                getOrderedList={fetchOrderdList}
              />
            </div>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // itemsData: state.listItems,
    input: state.listInputs.input,
    message: state.listInputs.message,
    open: state.listInputs.open,
    errStatus: state.listInputs.errorStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeInput: (newinput) => dispatch(changeInput(newinput)),
    changeMessage: (message) => dispatch(changeMessage(message)),
    toggleSnackbar: (value) => dispatch(toggleSnackbar(value)),
    changeErrorStatus: (status) => dispatch(changeErrorStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
