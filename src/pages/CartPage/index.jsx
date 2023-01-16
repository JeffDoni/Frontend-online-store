import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartProductCard from '../../components/CartProductCard';
// import styles from './style.module.css';
import getItemsLocalStorage,
{ getAllCartItemsLocalStorage } from '../../services/localStorage';

export default class CartPage extends Component {
  state = {
    cartItems: getItemsLocalStorage() || [],
    quantityItensCart: getAllCartItemsLocalStorage() || [],
  };

  render() {
    const { cartItems, quantityItensCart } = this.state;
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
          <span data-testid="shopping-cart-size">{quantityItensCart.length }</span>
        </Link>
        <ul>
          { cartItems.length === 0 ? (
            <li data-testid="shopping-cart-empty-message">Seu carrinho está vazio</li>
          ) : (
            cartItems.map((item, index) => (
              <CartProductCard
                key={ item.id }
                removeItem={ () => {
                  const currentCart = getItemsLocalStorage();
                  const temp = currentCart.filter((_item2, index2) => index2 !== index);
                  localStorage.setItem('cartProduct', JSON.stringify(temp));
                  this.setState({ cartItems: getItemsLocalStorage() });

                  const allCartProducts = getAllCartItemsLocalStorage();
                  const temp2 = allCartProducts.filter((_item3, index3) => (
                    index3 !== index));
                  localStorage.setItem('allCartProducts', JSON.stringify(temp2));
                  this.setState({ quantityItensCart: getAllCartItemsLocalStorage() });
                } }
                product={ item }
                removeLocalStorage={ () => {
                  const allCartProducts = getAllCartItemsLocalStorage();
                  const temp2 = allCartProducts.filter((_item3, index3) => (
                    index3 !== index));
                  localStorage.setItem('allCartProducts', JSON.stringify(temp2));
                  this.setState({ quantityItensCart: getAllCartItemsLocalStorage() });
                } }
                addQuantityLocalStorage={ () => {
                  const currentCart = JSON
                    .parse(localStorage.getItem('allCartProducts')) || [];
                  const newCart = [...currentCart, item];
                  localStorage.setItem('allCartProducts', JSON.stringify(newCart));
                  this.setState({ quantityItensCart: getAllCartItemsLocalStorage() });
                } }
              />
            ))
          ) }
        </ul>
        <Link to="/checkout" data-testid="checkout-products">Finalizar a compra</Link>
      </div>

    );
  }
}
