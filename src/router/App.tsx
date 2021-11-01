import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Places from '../pages/Places';
import Place from '../pages/Place';
import Register from '../pages/Register';
import Menu from '../pages/Menu';
import Orders from '../pages/Orders';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/menu/:id/:table">
          <Menu />
        </Route>
        <PrivateRoute exact path="/places/:id">
          <Place />
        </PrivateRoute>
        <PrivateRoute exact path="/places">
          <Places />
        </PrivateRoute>
        <PrivateRoute exact path="/places/:id/orders">
          <Orders />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
    <ToastContainer />
  </AuthProvider>
);

export default App;
