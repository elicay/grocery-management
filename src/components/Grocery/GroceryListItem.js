import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup, Toast } from 'react-bootstrap';
import { CartPlusFill } from 'react-bootstrap-icons';

const GroceryListItem = (props) => {
  const [disabledAmount, setDisabledAmount] = useState(false);
  const [disabledCheckout, setDisabledCheckout] = useState(true);
  const [show, setshow] = useState(true);
  const [amount, setAmount] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    setDisabledAmount(true);
    setDisabledCheckout(true);
    setshow(false);
    props.onAddToCart({
      id: props.id,
      item: props.item,
      amount: amount,
    });
  };

  const changeHandler = (event) => {
    const newAmount = +parseFloat(event.target.value);
    setAmount(newAmount);
    setDisabledCheckout(newAmount > 0 ? false : true);
  };

  const closeHandler = () => {
    setshow(false);
    props.onDeleteItem(props.id);
  };

  return (
    <React.Fragment>
      <Toast className="mb-2" show={show} onClose={closeHandler}>
        <Toast.Header>
          <strong className="me-auto">{props.item.toUpperCase()}</strong>
        </Toast.Header>
        <Toast.Body>
          <Form onSubmit={submitHandler}>
            <InputGroup className="mb-3">
              <FormControl
                step="0.01"
                min="1"
                value={amount}
                onChange={changeHandler}
                disabled={disabledAmount}
                type="number"
                placeholder="&#8369; Price"
              />
              <InputGroup.Text>
                <Button
                  disabled={disabledCheckout}
                  variant="outline-none"
                  type="submit"
                >
                  <CartPlusFill size={23} color="#198754"></CartPlusFill>
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Toast.Body>
      </Toast>
    </React.Fragment>
  );
};

export default GroceryListItem;
