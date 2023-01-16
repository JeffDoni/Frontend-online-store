import propTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';
import removeButton from '../../assets/removeButton.png';
import UnityProductChanger from '../UnityProductChanger';

export default class CartProductCard extends Component {
  render() {
    const { product, removeItem, removeLocalStorage,
      addQuantityLocalStorage } = this.props;
    return (
      <li className={ styles.card }>
        <button
          data-testid="remove-product"
          className={ styles.removeButton }
          onClick={ removeItem }
          type="button"
        >
          <img
            src={ removeButton }
            alt="remover item"
          />
        </button>
        <img className={ styles.thumb } src={ product.thumbnail } alt={ product.title } />
        <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
        <UnityProductChanger
          product={ product }
          removeLocalStorage={ removeLocalStorage }
          addQuantityLocalStorage={ addQuantityLocalStorage }
        />
      </li>
    );
  }
}

CartProductCard.propTypes = {
  product: propTypes.shape({
    title: propTypes.string.isRequired,
    thumbnail: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    available_quantity: propTypes.number.isRequired,
  }).isRequired,
  removeItem: propTypes.func.isRequired,
  removeLocalStorage: propTypes.func.isRequired,
  addQuantityLocalStorage: propTypes.func.isRequired,
};
