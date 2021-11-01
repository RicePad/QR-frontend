import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { fetchPlace } from '../apis';
import MenuList from '../components/MenuList';
import ShoppingCart from '../components/ShoppingCart';

interface MenuProps {
    id?: number
}

const OrderButton = styled(Button)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    box-shadow: 1px 1px 8px rgba(0,0,0,0.2);
    width: 60px;
    height: 60px;
    `;

const Menu: React.FC<MenuProps> = () => {
  const [place, setPlace] = useState<any>({});
  const [shoppingCart, setShoppingCart] = useState<any>({});
  const [showShoppingCart, setShowShoppingCart] = useState(false);

    interface ParamTypes {
        id: string
    }

    const params = useParams<ParamTypes>();

    const onFetchPlace = async () => {
      const json = await fetchPlace(params.id);
      console.log('jsonMenu: ', json);
      if (json) {
        setPlace(json);
      }
    };

    const onAddItemtoShoppingCart = (item: { id: string | number; }) => {
      setShoppingCart({
        ...shoppingCart,
        [item.id]: {
          ...item,
          quantity: (shoppingCart[item.id]?.quantity || 0) + 1,
        },
      });
    };
    const onRemoveItemToShoppingCart = (item: { id: string | number; }) => {
      if (totalQuantity === 1) {
        setShowShoppingCart(false);
      }

      setShoppingCart({
        ...shoppingCart,
        [item.id]: {
          ...item,
          quantity: (shoppingCart[item.id]?.quantity || 0) - 1,
        },
      });
    };

    const totalQuantity = useMemo(() => Object.keys(shoppingCart)
      .map((i) => shoppingCart[i].quantity)
      .reduce((a, b) => a + b, 0),
    [shoppingCart]);

    const onPaymentDone = () => {
      setShoppingCart({});
      setShowShoppingCart(false);
    };

    useEffect(() => {
      onFetchPlace();
    }, []);
    return (
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            {showShoppingCart ? (
              <ShoppingCart
                items={Object.keys(shoppingCart)
                  .map((key) => shoppingCart[key])
                  .filter((item) => item.quantity > 0)}
                onAdd={onAddItemtoShoppingCart}
                onRemove={onRemoveItemToShoppingCart}
                onPaymentDone={onPaymentDone}
                color={place.color}
              />
            ) : (
              <MenuList
                place={place}
                shoppingCart={shoppingCart}
                onOrder={onAddItemtoShoppingCart}
                color={place.color}
                font={place.font}
              />
            )}

          </Col>
        </Row>

        {totalQuantity ? (
          <OrderButton
            variant="standard"
            onClick={() => setShowShoppingCart(!showShoppingCart)}
          >
            {showShoppingCart ? <IoCloseOutline size={25} /> : totalQuantity}
          </OrderButton>
        ) : null}
      </Container>
    );
};

export default Menu;
