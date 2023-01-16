import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';
import CheckoutProductCard from '../components/CartProductCard/CheckoutProductCard';

export default class Checkout extends Component {
  state = {
    cartItems: [],
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    adress: '',
    payMethod: '',
    error: false,
  };

  componentDidMount() {
    this.importLocalStorage();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState(() => ({
      [id]: value,
    }));
  };

  importLocalStorage = () => {
    const info = localStorage.getItem('cartProduct');
    const condition = info ? JSON.parse(info) : [];
    this.setState(() => ({
      cartItems: condition,
    }));
  };

  submitBtn = () => {
    const { name, email, cpf, phone, cep, adress, payMethod } = this.state;
    const { history } = this.props;
    const checkName = name.length > 0;
    const checkEmail = email.length > 0;
    const checkCPF = cpf.length > 0;
    const checkPhone = phone.length > 0;
    const checkCep = cep.length > 0;
    const checkAdress = adress.length > 0;
    const checkPayMethod = payMethod.length > 0;
    const condition = (checkAdress && checkCPF && checkCep
      && checkEmail && checkName && checkPayMethod && checkPhone);
    if (!condition) {
      return this.setState(() => ({
        error: true,
      }));
    }
    this.setState(() => ({
      error: false,
    }));
    localStorage.removeItem('cartProduct');
    history.push('/');
  };

  render() {
    const { cartItems, error } = this.state;
    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        {cartItems.length > 0
          ? (
            <>
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
                    id="name"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    data-testid="checkout-email"
                    id="email"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  <input
                    type="text"
                    placeholder="CPF"
                    data-testid="checkout-cpf"
                    id="cpf"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  <input
                    type="text"
                    placeholder="Telefone"
                    data-testid="checkout-phone"
                    id="phone"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  <input
                    type="text"
                    placeholder="CEP"
                    data-testid="checkout-cep"
                    id="cep"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  <input
                    type="text"
                    placeholder="Endereço"
                    data-testid="checkout-address"
                    id="adress"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                </div>
                <h2>Forma de pagamento:</h2>
                <div>
                  <input
                    type="radio"
                    id="payMethod"
                    name="payment"
                    value="Boleto"
                    data-testid="ticket-payment"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  Boleto
                  <input
                    type="radio"
                    id="payMethod"
                    name="payment"
                    value="Visa"
                    data-testid="visa-payment"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  Visa
                  <input
                    type="radio"
                    id="payMethod"
                    name="payment"
                    value="Master Card"
                    data-testid="master-payment"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  MasterCard
                  <input
                    type="radio"
                    id="payMethod"
                    name="payment"
                    value="Elo"
                    data-testid="elo-payment"
                    onChange={ async (event) => {
                      await this.handleChange(event);
                    } }
                  />
                  Elo
                </div>
                <button
                  data-testid="checkout-btn"
                  type="submit"
                  onClick={ (event) => {
                    event.preventDefault();
                    this.submitBtn();
                  } }
                >
                  Comprar
                </button>
              </form>
              {error ? (
                <h1 data-testid="error-msg">Campos inválidos</h1>
              ) : ('')}
            </>
          ) : ''}
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape([object]).isRequired,
};
