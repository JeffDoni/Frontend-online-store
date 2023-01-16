import propTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../CartProductCard/styles.module.css';

export default class UnityProductChanger extends Component {
  state = {
    unity: 1,
    isDisabledIncrease: false,
    isDisabledDecrease: true,
  };

  componentDidMount() {
    const { product } = this.props;
    if (product.available_quantity === 1) {
      this.setState({ isDisabledIncrease: true });
    }
  }

  render() {
    const { product, removeLocalStorage, addQuantityLocalStorage } = this.props;
    const { unity, isDisabledIncrease, isDisabledDecrease } = this.state;
    const result = product.price * unity;
    return (
      <div className={ styles.itemUnity }>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          disabled={ isDisabledDecrease }
          onClick={ () => {
            const limit = 3;
            if (unity < limit) {
              this.setState({ isDisabledDecrease: true });
              this.setState({ unity: 1 });
            } else {
              this.setState({ unity: unity - 1 });
              removeLocalStorage();
            }
          } }
        >
          -
        </button>
        <h4 data-testid="shopping-cart-product-quantity">{unity <= 1 ? 1 : unity}</h4>
        <button
          type="button"
          disabled={ isDisabledIncrease }
          data-testid="product-increase-quantity"
          onClick={ () => {
            if (unity < product.available_quantity) {
              this.setState({ unity: unity + 1, isDisabledDecrease: false });
            }
            addQuantityLocalStorage();
          } }
        >
          +
        </button>
        <h4>{result.toFixed(2)}</h4>
      </div>
    );
  }
}

UnityProductChanger.propTypes = {
  product: propTypes.shape({
    available_quantity: propTypes.number.isRequired,
    price: propTypes.number.isRequired,
  }).isRequired,
  removeLocalStorage: propTypes.func.isRequired,
  addQuantityLocalStorage: propTypes.func.isRequired,
};
