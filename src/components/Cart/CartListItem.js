import React from 'react';
import { Badge, Toast } from 'react-bootstrap';

const CartListItem = (props) => {
  const closeHandler = () => {
    props.onCartItemDelete(props.id);
  };

  return (
    <React.Fragment>
      <Toast className="mb-2" show={true} onClose={closeHandler}>
        <Toast.Header>
          <strong className="me-auto">
            <span>{props.item.toUpperCase()} </span>
            <Badge bg="danger">&#8369;{props.amount}</Badge>
          </strong>
        </Toast.Header>
      </Toast>
    </React.Fragment>
  );
};

export default CartListItem;
