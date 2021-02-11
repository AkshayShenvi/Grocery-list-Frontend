const axios = require("axios");

const addItem = async (
  lid,
  input,
  username,
  listname,
  setOpen,
  fetchListItems,
  setErrStatus,
  setMessage
) => {
  await axios
    .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/additem`, {
      id: lid,
      itemname: input,
      username: username,
    })
    .then((res) => {
      // fetchNames();
      fetchListItems(listname, lid);
      if (res.status !== 200) {
        setErrStatus("error");
        setMessage("Could not Add Item");
        setOpen(true);
      } else {
        setErrStatus("success");
        setMessage("Item Added Successfully!");
        setOpen(true);
      }
    });
};

export { addItem };
