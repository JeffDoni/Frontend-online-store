import propTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';

export default class CartProductCard extends Component {
  state = {
    unity: 1,
    isDisabled: true,
  };

  render() {
    const { product } = this.props;
    const { unity, isDisabled } = this.state;
    return (
      <li className={ styles.card }>
        <img src={ product.thumbnail } alt={ product.title } />
        <h3>{product.title}</h3>
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
          <h4>{unity <= 1 ? 1 : unity}</h4>
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
};
