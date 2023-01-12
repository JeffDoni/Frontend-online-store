import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import CartPage from './pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingCart" component={ ShoppingCart } />
        <Route path="/cart" component={ CartPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
