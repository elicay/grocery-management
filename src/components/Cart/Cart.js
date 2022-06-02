import React from 'react';
import CartList from './CartList';

const Cart = (props) => {
  const cartItemDeleteHandler = (id) => {
    props.onCartItemDelete(id);
  };
  return (
    <React.Fragment>
      <CartList
        cartList={props.cart}
        onCartItemDelete={cartItemDeleteHandler}
      ></CartList>
    </React.Fragment>
  );
};

export default Cart;
