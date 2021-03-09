import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import axios from "axios";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Button,
} from "@material-ui/core";
import ListElement from "./ListElement";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import Grid from "@material-ui/core/Grid";

// Component
function ListForm({
  // listDetails,
  listId,
  username,
  input,
  inputChange,
  addClick,

  handleClick,

  checkItem,
  orderButton,
}) {
  // let CheckedState = true;
  // const lists = ["To Order", "Added to Cart"];
  const [toOrderItems, setToOrderItems] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const [toOrderSelected, setToOrderSelected] = useState([]);
  const [addToCartSelected, setaddToCartSelected] = useState([]);
  const handleToOrderItemAdd = async (newItem, resolve) => {
    // console.log(newItem);
    await axios({
      method: "post",
      url: "/listdetails/additem",
      baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
      data: {
        listid: listId,
        username: username,
        itemname: newItem.item,
      },
    })
      
      .then((res) => {
        console.log(res.data);
        fetchListItems(listId, "To Order");
        resolve();
      });
   
  };
  async function fetchListItems(listId, itemType) {
    await axios({
      method: "get",
      url: "/listdetails/getlist",
      baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
      params: {
        listid: listId,
        listtype: itemType,
      },
    })
      // await axios
      //   .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/listdetails/getlist`, {
      //     params: {
      //       listid: listId,
      //       listtype: itemType,
      //     },
      //   })
      .then((res) => {
        if (res.data[0].items.length === 0) {
          if (itemType === "To Order") {
            setToOrderItems([]);
          } else {
            setAddToCart([]);
          }
        } else {
          if (itemType === "To Order") {
            setToOrderItems(res.data[0].items);
          } else {
            setAddToCart(res.data[0].items);
          }
        }
      });
  }
  async function transferItems(listItems, listType) {
    if (listItems.length === 0) {
      console.log("Empty List");
    } else {
      axios({
        method: "patch",
        url: "/listdetails/checkeditem",
        baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
        data: {
          listid: listId,
          items: listItems,
          listtype: listType,
        },
      })
        // await axios
        //   .patch(
        //     `${process.env.REACT_APP_BACKEND_ENDPOINT}/listdetails/checkeditem`,
        //     {
        //       listid: listId,
        //       items: listItems,
        //       listtype: listType,
        //     }
        //   )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  async function handleRowUpdate(newData, resolve) {
    const itemId = newData._id;
    const itemName = newData.item;
    await axios({
      method: "patch",
      url: "/listdetails/updateitem",
      baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
      data: {
        listid: listId,
        itemid: itemId,
        item: itemName,
      },
    })
      .then((res) => {
        if (newData.listtype === "Added to Cart") {
          fetchListItems(listId, "Added to Cart");
        } else {
          fetchListItems(listId, "To Order");
        }
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleRowDelete(oldData, resolve, reject) {
    const itemId = oldData._id;
    await axios({
      method: "put",
      url: "/listdetails/deleteitem",
      baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
      data: {
        listid: listId,
        itemid: itemId,
      },
    })
      .then((res) => {
        if (oldData.listtype === "Added to Cart") {
          fetchListItems(listId, "Added to Cart");
        } else {
          fetchListItems(listId, "To Order");
        }
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  }
  function checkItems(listType) {
    if (listType === "Added to Cart") {
      transferItems(toOrderSelected, listType);
      setToOrderSelected([]);
    } else {
      transferItems(addToCartSelected, listType);
      setaddToCartSelected([]);
    }
    fetchListItems(listId, "To Order");
    fetchListItems(listId, "Added to Cart");
  }

  useEffect(() => {
    fetchListItems(listId, "To Order");
    fetchListItems(listId, "Added to Cart");
  }, []);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <MaterialTable
          title="To Order List"
          icons={tableIcons}
          columns={[
            { title: "Item", field: "item" },
            { title: "Added by", field: "addedby", editable: "never" },
            {
              title: "Added on",
              field: "addedon",
              type: "date",
              editable: "never",
            },
          ]}
          data={toOrderItems}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleToOrderItemAdd(newData, resolve);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                handleRowDelete(oldData, resolve, reject);
              }),
          }}
          options={{
            selection: true,
            rowStyle: (rowData) => ({
              backgroundColor: rowData.tableData.checked ? "#37b15933" : "",
            }),
            sorting: true,
          }}
          onSelectionChange={(rows) => setToOrderSelected(rows)}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <Button onClick={(event) => checkItems("Added to Cart")}>
                  Add to Cart
                </Button>
              </div>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <MaterialTable
          title="Cart"
          icons={tableIcons}
          columns={[
            { title: "Item", field: "item" },
            { title: "Added by", field: "addedby", editable: "never" },
            {
              title: "Added on",
              field: "addedon",
              type: "date",
              editable: "never",
            },
          ]}
          data={addToCart}
          options={{
            selection: true,
          }}
          onSelectionChange={(rows) => setaddToCartSelected(rows)}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Button onClick={(event) => checkItems("To Order")}>
                      Back to Order List
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={(event) => checkItems("Ordered")}>
                      Order
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

export default ListForm;
