import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Save } from 'react-bootstrap-icons';

const GroceryForm = (props) => {
  const [disbaled, setDisbaled] = useState(true);
  const [textEntered, setText] = useState('');

  const changeHandler = (event) => {
    setDisbaled(event.target.value.length === 0 ? true : false);
    setText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setDisbaled(true);
    setText('');
    props.onAddGroceryItem({
      id: Math.random().toString(),
      item: textEntered,
      date: new Date().toISOString(),
    });
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3 mt-3">
          <Form.Group xs={10} as={Col}>
            <Form.Control
              onChange={changeHandler}
              type="text"
              value={textEntered}
              placeholder="Add Grocery Item here!"
            />
          </Form.Group>
          <Form.Group xs={2} as={Col} className="d-grid gap-2">
            <Button disabled={disbaled} variant="primary" type="submit">
              <Save></Save>
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default GroceryForm;
