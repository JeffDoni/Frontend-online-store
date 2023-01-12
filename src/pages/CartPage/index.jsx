import React, { Component } from 'react';
import CartProductCard from '../../components/CartProductCard';
// import PropTypes from 'prop-types'
// import styles from './style.module.css';
import getItemsLocalStorage from '../../services/localStorage';
import tempLocal from '../../services/tempLocal.json';

export default class CartPage extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    localStorage.setItem('cartItems', JSON.stringify(tempLocal));
    const getCartItems = getItemsLocalStorage();
    this.setState({ cartItems: getCartItems });
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        <ul>
          { cartItems.map((item) => (
            <CartProductCard key={ item.id } product={ item } />
          )) }
        </ul>
      </div>
    );
  }
}
