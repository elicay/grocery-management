import React from 'react';
import GroceryList from './GroceryList';
const Grocery = (props) => {
  const addToCartHander = (data) => {
    props.onAddToCart(data);
  };

  const deleteItemHandler = (id) => {
    props.onDeleteItem(id);
  };

  return (
    <React.Fragment>
      <GroceryList
        groceryList={props.grocery}
        onAddToCart={addToCartHander}
        onDeleteItem={deleteItemHandler}
      ></GroceryList>
    </React.Fragment>
  );
};

export default Grocery;
