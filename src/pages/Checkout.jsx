import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CheckoutProductCard from '../components/CartProductCard/CheckoutProductCard';
import getItemsLocalStorage from '../services/localStorage';

export default class Checkout extends Component {
  state = {
    cartItems: getItemsLocalStorage() || [],
  };

  render() {
    const { cartItems } = this.state;
    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <div>
          <h2>Revise seus produtos</h2>
          <ul>
            {cartItems.map((item) => (
              <CheckoutProductCard
                key={ item.id }
                product={ item }
              />
            ))}
          </ul>
        </div>
        <form>
          <h2>Informações do comprador:</h2>
          <div>
            <input
              type="text"
              placeholder="Nome completo"
              data-testid="checkout-fullname"
              required
            />
            <input
              type="email"
              placeholder="Email"
              data-testid="checkout-email"
              required
            />
            <input
              type="text"
              placeholder="CPF"
              data-testid="checkout-cpf"
              required
            />
            <input
              type="text"
              placeholder="Telefone"
              data-testid="checkout-phone"
              required
            />
            <input
              type="text"
              placeholder="CEP"
              data-testid="checkout-cep"
              required
            />
            <input
              type="text"
              placeholder="Endereço"
              data-testid="checkout-adress"
              required
            />
          </div>
          <h2>Forma de pagamento:</h2>
          <div>
            <label htmlFor="boleto">
              <input
                type="radio"
                id="boleto"
                name="payment"
                data-testid="ticket-payment"
                required
              />
              Boleto
            </label>
            <label htmlFor="visa">
              <input
                type="radio"
                id="visa"
                name="payment"
                data-testid="visa-payment"
                required
              />
              Visa
            </label>
            <label htmlFor="master">
              <input
                type="radio"
                id="master"
                name="payment"
                data-testid="master-payment"
                required
              />
              MasterCard
            </label>
            <label htmlFor="elo">
              <input
                type="radio"
                id="elo"
                name="payment"
                data-testid="elo-payment"
                required
              />
              Elo
            </label>
          </div>
          <button
            data-testid="checkout-btn"
            type="submit"
          >
            Comprar
          </button>
        </form>
      </>
    );
  }
}
