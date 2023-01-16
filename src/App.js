import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import DetailsProduct from './pages/DetailsProduct';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/shoppingCart" component={ CartPage } />
      <Route path="/detailsProduct/:id" component={ DetailsProduct } />
    </Switch>
  );
}

export default App;
