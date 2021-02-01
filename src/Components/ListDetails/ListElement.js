import React, { useState, useEffect } from "react";
import { FormControlLabel, Checkbox, Paper, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function ListElement({
  item,
  handleClick,
  CheckedState,
  
  listId,
  checkItem,
}) {
  let [check, setChecked] = useState(CheckedState);
  const handleChange = (event) => {
    const itemId = event.target.name;
    if (item.listtype == "To Order") {
      setChecked(false || event.target.checked);
      checkItem(itemId, "Added to Cart");
    } else if (item.listtype == "Added to Cart") {
      setChecked(false || event.target.checked);
      checkItem(itemId, "To Order");
    }
    // console.log(event.target.checked);

    // checkItem(itemId);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <div>
            <Checkbox checked={check} onChange={handleChange} name={item._id} />
          </div>
        }
        label={item.item}
      />
      <Button value={item._id} onClick={handleClick}>
        <DeleteIcon />
      </Button>
    </div>
  );
}

export default ListElement;
