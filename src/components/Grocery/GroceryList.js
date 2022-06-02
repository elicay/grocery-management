import React from 'react';
import { Alert } from 'react-bootstrap';
import GroceryListItem from './GroceryListItem';

const GroceryList = (props) => {
  const addToCartHandler = (data) => {
    props.onAddToCart(data);
  };

  const deleteItemHandler = (id) => {
    props.onDeleteItem(id);
  };
  return (
    <React.Fragment>
      <h1>BUCKET</h1>
      {props.groceryList.length === 0 && (
        <Alert variant="warning">No Item in the bucket list</Alert>
      )}
      {props.groceryList.length > 0 &&
        props.groceryList.map((grocery) => (
          <GroceryListItem
            key={grocery.id}
            item={grocery.item}
            id={grocery.id}
            onAddToCart={addToCartHandler}
            onDeleteItem={deleteItemHandler}
          ></GroceryListItem>
        ))}
    </React.Fragment>
  );
};

export default GroceryList;
