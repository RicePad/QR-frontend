import React from 'react';
import { Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';

const Container = styled.div`
  border-radius: 5px;
  background-color: white;
  margin-bottom: 30px;
  box-shadow: 1px 1px 8px rgba(0,0,0,0.1);
  display: flex;
  > div:first-child {
    width: 40%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-size: cover;
  }
  > div:last-child {
    padding: 15px 20px;
    min-height: 150px;
  }
`;

interface MenuItemProps {
    item: any
    onEdit: any
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onEdit }) => (
  <Container>
    <Col xs={5} style={{ backgroundImage: `url(${item.image})` }} />
    <Col xs={7} className="d-flex flex-column justify-content-between w-100">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="mb-0">
            <b>{item.name}</b>
          </h4>
          <div>
            { onEdit ? (
              <Button variant="link" onClick={onEdit}>
                <BiEdit size={20} />
              </Button>
            ) : null }

          </div>
        </div>
        <p className="mb-4">{item.description}</p>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        {!item.is_available ? (<small className="text-secondary">Not Available</small>) : null}
      </div>
    </Col>
  </Container>
);

export default MenuItem;
