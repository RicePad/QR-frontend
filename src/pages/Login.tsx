/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Card, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { signIn } from '../apis';

import AuthContext from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.token) {
      history.replace('/places');
    }
  });

  const onClick = () => {
    auth.signIn(username, password, () => history.replace('/places'));
  };

  return (
    <MainLayout>
      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          <Card>
            <Card.Body>
              <h3 className="text-center">
                <b>LOGIN</b>
              </h3>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="standard" onClick={onClick} disabled={auth.loading}>
                {auth.loading ? (
                  <Spinner
                    variant="standard"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Sign In'
                )}
              </Button>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Login;
