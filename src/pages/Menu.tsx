import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
      onFetchPlace();
    }, []);
    return (
      <Container>
        <Row>
          <Col>
            <MenuList place={place} />
          </Col>
        </Row>

        <OrderButton>
          <IoCloseOutline size={25} />
        </OrderButton>
      </Container>
    );
};

export default Menu;
