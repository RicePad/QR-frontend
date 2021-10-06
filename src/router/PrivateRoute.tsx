/* eslint-disable react/jsx-props-no-spreading */

import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../contexts/AuthContext';

interface Props {
  exact: boolean
  path: string
  children: any
}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) => (auth.token ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
