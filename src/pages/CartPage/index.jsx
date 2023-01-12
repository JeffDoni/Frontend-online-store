import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import styles from './style.module.css';
import tempLocal from '../../services/tempLocal.json';

export default class CartPage extends Component {
  componentDidMount() {
    localStorage.setItem('cartItems', JSON.stringify(tempLocal));
  }

  render() {
    return (
      <div>
        <h1>carrinho</h1>
      </div>
    );
  }
}
