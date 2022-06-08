import React, { useState, useEffect } from 'react';
import { Button, Container, Navbar, Row, Col, Badge } from 'react-bootstrap';
import Grocery from './components/Grocery/Grocery';
import GroceryForm from './components/GroceryForm/GroceryForm';
import Cart from './components/Cart/Cart';

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`http://192.168.1.2:3001/grocery`, {
        method: 'GET',
      })
        .then((result) => {
          if (result.ok) {
            return result.json();
          }

          throw Response;
        })
        .then((result) => {
          setGroceryList(result);
        });
    };

    fetchData();

    const fetchCartData = async () => {
      fetch(`http://192.168.1.2:3001/cart`, {
        method: 'GET',
      })
        .then((result) => {
          if (result.ok) {
            return result.json();
          }

          throw Response;
        })
        .then((result) => {
          setCartList(result);
        });
    };

    fetchCartData();
  }, []);

  const addGroceryItemHandler = (groceryItem) => {
    fetch('http://192.168.1.2:3001/grocery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groceryItem),
    });

    setGroceryList((prevState) => {
      return [...prevState, groceryItem];
    });
  };

  const addToCartHandler = (data) => {
    fetch(`http://192.168.1.2:3001/grocery?id=${data.id}`, {
      method: 'DELETE',
    });

    fetch('http://192.168.1.2:3001/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const filterGroceryList = groceryList.filter(
      (grocery) => grocery.id !== data.id
    );

    setGroceryList(filterGroceryList);
    setCartList((prevState) => [...prevState, data]);
  };

  const deleteItemHandler = (id) => {
    fetch(`http://192.168.1.2:3001/grocery?id=${id}`, {
      method: 'DELETE',
    });

    const filterGroceryList = groceryList.filter(
      (grocery) => grocery.id !== id
    );
    setGroceryList(filterGroceryList);
  };

  const cartItemDeleteHandler = (id) => {
    fetch(`http://192.168.1.2:3001/cart?id=${id}`, {
      method: 'DELETE',
    });

    const filterCartList = cartList.filter((cartItem) => cartItem.id !== id);

    setCartList(filterCartList);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <Navbar fixed="top" expand="lg" variant="dark" bg="dark">
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
            <Navbar fixed="bottom" expand="lg" variant="dark" bg="dark">
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
