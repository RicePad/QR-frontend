import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { fetchPlace } from '../apis';
import MenuList from '../components/MenuList';

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
  const [place, setPlace] = useState({});
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

    const totalQuantity = useMemo(() => Object.keys(shoppingCart)
      .map((i) => shoppingCart[i].quantity)
      .reduce((a, b) => a + b, 0),
    [shoppingCart]);

    useEffect(() => {
      onFetchPlace();
    }, []);
    return (
      <Container>
        <Row>
          <Col>
            <MenuList
              place={place}
              shoppingCart={shoppingCart}
              onOrder={onAddItemtoShoppingCart}
            />
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
