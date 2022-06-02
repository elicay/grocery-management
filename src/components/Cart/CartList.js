import React from 'react';
import CartListItem from './CartListItem';

const CartList = (props) => {
  const cartItemDeleteHandler = (id) => {
    props.onCartItemDelete(id);
  };

  return (
    <React.Fragment>
      {props.cartList.length > 0 && <h1>CART</h1>}

      {props.cartList.length > 0 &&
        props.cartList.map((cartItem) => (
          <CartListItem
            key={cartItem.id}
            id={cartItem.id}
            item={cartItem.item}
            amount={cartItem.amount}
            onCartItemDelete={cartItemDeleteHandler}
          ></CartListItem>
        ))}
    </React.Fragment>
  );
};

export default CartList;
