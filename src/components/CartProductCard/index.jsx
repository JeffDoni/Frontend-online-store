import propTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';
import removeButton from '../../assets/removeButton.png';

export default class CartProductCard extends Component {
  state = {
    unity: 1,
    isDisabled: true,
  };

  render() {
    const { product, removeItem } = this.props;
    const { unity, isDisabled } = this.state;
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
        <div className={ styles.itemUnity }>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            disabled={ isDisabled }
            onClick={ () => {
              if (unity < 2) {
                this.setState({ isDisabled: true });
                this.setState({ unity: 1 });
              } else {
                this.setState({ unity: unity - 1 });
              }
            } }
          >
            -
          </button>
          <h4 data-testid="shopping-cart-product-quantity">{unity <= 1 ? 1 : unity}</h4>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ () => {
              this.setState({ unity: unity + 1 });
              this.setState({ isDisabled: false });
            } }
          >
            +
          </button>
          <h4>{product.price * unity}</h4>
        </div>
      </li>
    );
  }
}

CartProductCard.propTypes = {
  product: propTypes.shape({
    title: propTypes.string.isRequired,
    thumbnail: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
  }).isRequired,
  removeItem: propTypes.func.isRequired,
};
