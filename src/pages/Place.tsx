import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  Row, Col, Button, Modal,
} from 'react-bootstrap';
import { fetchPlace } from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import MenuItemForm from '../containers/MenuItemForm';
import MenuItem from '../components/MenuItem';

interface PlaceProps {
    [key: string]: string | any
}

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rxwgba(0,0,0,0.05);
`;

const Page: React.FC = () => {
  const [place, setPlace] = useState<PlaceProps>({});
  const [menuItemFormShow, setMenuItemForShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

    interface ParamTypes {
      id: any
    }

    const auth = useContext(AuthContext);
    const params = useParams<ParamTypes>();
    const history = useHistory();

    const hideModal = () => {
      setMenuItemForShow(false);
    };

    const showModal = () => {
      setMenuItemForShow(true);
    };

    const onBack = () => {
      history.push('/places');
    };

    const onFetchPlace = async () => {
      const json = await fetchPlace(params.id, auth.token);
      if (json) {
        setPlace(json);
        console.log('json: ', json);
      }
    };

    useEffect(() => {
      onFetchPlace();
    }, []);

    return (
      <MainLayout>
        <h1>Place Page</h1>
        <Row lg={12}>
          <Col lg={12}>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Button variant="link" onClick={onBack}>
                  <IoMdArrowBack size={25} color="black" />
                </Button>
                <h3 className="mb-0 ml-2 mr-2">{place.name}</h3>

                <Button variant="link">
                  <AiOutlineDelete size={25} color="red" />
                </Button>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <Panel>
              <MenuItemForm place={place} onDone={onFetchPlace} item="" />
            </Panel>
          </Col>

          <Col md={8}>
            {place?.categories?.map((category: any) => (
              <div key={category.id} className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <h4 className="mb-0 mr-2">
                    <b>{category.name}</b>
                  </h4>
                </div>
                {category.menu_items.map((item: any) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onEdit={() => {
                      setSelectedItem(item);
                      showModal();
                    }}
                  />
                ))}
              </div>
            ))}
          </Col>
        </Row>
        <Modal show={menuItemFormShow} onHide={hideModal} centered>
          <Modal.Body>
            <h4 className="text-center">Menu Item</h4>
            <MenuItemForm
              place={place}
              onDone={() => {
                onFetchPlace();
                hideModal();
              }}
              item={selectedItem}
            />
          </Modal.Body>
        </Modal>
      </MainLayout>
    );
};

export default Page;
