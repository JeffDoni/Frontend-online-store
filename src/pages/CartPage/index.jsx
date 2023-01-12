import React, { Component } from 'react';
import CartProductCard from '../../components/CartProductCard';
// import styles from './style.module.css';
import getItemsLocalStorage from '../../services/localStorage';

export default class CartPage extends Component {
  state = {
    cartItems: getItemsLocalStorage() || [],
  };

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        <ul>
          { cartItems.length === 0 ? (
            <li data-testid="shopping-cart-empty-message">Seu carrinho está vazio</li>
          ) : (
            cartItems.map((item) => (
              <CartProductCard
                key={ item.id }
                removeItem={ () => {
                  const currentCart = getItemsLocalStorage();
                  const temp = currentCart.filter((item2) => item2.id !== item.id);
                  localStorage.setItem('cartProduct', JSON.stringify(temp));
                  this.setState({ cartItems: getItemsLocalStorage() });
                } }
                product={ item }
              />
            ))
          ) }
        </ul>
      </div>

    );
  }
}
