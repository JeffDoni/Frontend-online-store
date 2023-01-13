import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/">Home</Link>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
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
        <Link to="/checkout" data-testid="checkout-products">Finalizar a compra</Link>
      </div>

    );
  }
}
