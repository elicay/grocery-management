import React, { useState } from 'react';
import { Button, Container, Navbar, Row, Col, Badge } from 'react-bootstrap';
import Grocery from './components/Grocery/Grocery';
import GroceryForm from './components/GroceryForm/GroceryForm';
import Cart from './components/Cart/Cart';

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const [cartList, setCartList] = useState([]);

  const addGroceryItemHandler = (groceryItem) => {
    setGroceryList((prevState) => {
      return [...prevState, groceryItem];
    });
  };

  const addToCartHandler = (data) => {
    const filterGroceryList = groceryList.filter(
      (grocery) => grocery.id !== data.id
    );

    setGroceryList(filterGroceryList);
    setCartList((prevState) => [...prevState, data]);
  };

  const deleteItemHandler = (id) => {
    const filterGroceryList = groceryList.filter(
      (grocery) => grocery.id !== id
    );
    setGroceryList(filterGroceryList);
  };

  const cartItemDeleteHandler = (id) => {
    const filterCartList = cartList.filter((cartItem) => cartItem.id !== id);

    setCartList(filterCartList);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <Navbar fixed="top" expand="lg" variant="light" bg="light">
              <Container>
                <GroceryForm
                  onAddGroceryItem={addGroceryItemHandler}
                ></GroceryForm>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>

      <Container style={{ marginBottom: '6rem', marginTop: '6rem' }}>
        <Row>
          <Col>
            <Grocery
              grocery={groceryList}
              onAddToCart={addToCartHandler}
              onDeleteItem={deleteItemHandler}
            ></Grocery>
          </Col>
        </Row>
        <Row>
          <Col>
            <Cart
              cart={cartList}
              onCartItemDelete={cartItemDeleteHandler}
            ></Cart>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Navbar fixed="bottom" expand="lg" variant="light" bg="light">
              <Container>
                <Navbar.Brand>
                  TOTAL &nbsp;
                  <Badge bg="warning">
                    &#8369;
                    {cartList
                      .map((item) => item.amount)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </Badge>
                </Navbar.Brand>
                <Button
                  variant="success"
                  disabled={
                    cartList
                      .map((item) => item.amount)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2) > 0
                      ? false
                      : true
                  }
                >
                  Checkout
                </Button>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
