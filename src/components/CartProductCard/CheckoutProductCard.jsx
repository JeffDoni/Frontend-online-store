import propTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';

export default class CheckoutProductCard extends Component {
  render() {
    const { product } = this.props;
    return (
      <li className={ styles.card }>
        <img
          className={ styles.thumb }
          src={ product.thumbnail }
          alt={ product.title }
        />
        <h3>{product.title}</h3>
        <h4>{product.price}</h4>
      </li>
    );
  }
}

CheckoutProductCard.propTypes = {
  product: propTypes.shape({
    title: propTypes.string.isRequired,
    thumbnail: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
  }).isRequired,
};
