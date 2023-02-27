import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from "../images/logo.png";
import { BsCart3 } from "react-icons/bs";
import { getProductById } from '../services/api';
import { getAllCartItemsLocalStorage } from '../services/localStorage';

const stateInicial = {
  email: '',
  inputChecked: '',
  comment: '',
  invalidationInfo: true,

};

export default class DetailsProduct extends Component {
  state = {
    ...stateInicial,
    evaluation: [],
    productID: {},
    rate: ['1', '2', '3', '4', '5'],
    quantityItensCart: getAllCartItemsLocalStorage() || [],
    frete: null,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    const details = await getProductById(id);
    console.log('testand', details);
    this.setState({
      productID: details,
      evaluation: JSON.parse(localStorage.getItem(id) || '[]'),
      frete: details.shipping.free_shipping,
    });
  }

  validation = () => {
    const { email, inputChecked } = this.state;
    const radio = inputChecked.length > 0;
    const regexEmail = /\S+@\S+\.\S+/;
    console.log(email);
    console.log(regexEmail.test(email));
    if (regexEmail.test(email) && radio) {
      this.setState({
        invalidationInfo: true,
      }, this.saveComment);
    } else {
      this.setState({
        invalidationInfo: false,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { value, name, checked } = target;
    const newCard = name === 'rate' ? checked : value;
    this.setState({
      [name]: newCard,
    });
  };

  saveComment = async () => {
    // event.preventDefault();
    this.validation();
    const {
      email,
      comment,
      inputChecked,
      frete,
    } = this.state;
    const { match: { params: { id } } } = this.props;

    const recover = JSON.parse(localStorage.getItem(id) || '[]');

    localStorage.setItem(`${id}`, JSON
      .stringify([...recover, { email, comment, inputChecked, frete }]));

    this.setState({
      evaluation: JSON.parse(localStorage.getItem(id)),
      ...stateInicial,
    });
  };

  render() {
    const {
      productID,
      rate,
      email,
      comment,
      inputChecked,
      invalidationInfo,
      evaluation,
      quantityItensCart,
      frete,
    } = this.state;

    return (
      <div className='flex flex-col'>
        <header className="flex items-center  align-center h-24 bg-[#003BE5] justify-around">
        <img src={logo} alt="logo" />
          <Link to="/shoppingCart" data-testid="shopping-cart-button">
            <BsCart3 className="w-20 h-10 text-slate-50" />
            <p
              data-testid="shopping-cart-size"
              className="bg-[#31c28d] rounded-full h-5 w-5 text-center translate-y-[-3rem] translate-x-[3rem]"
            >
              {quantityItensCart.length}
            </p>
          </Link>
        </header>
        <div data-testid="product" className='container-details'>
          <p data-testid="product-detail-name" className='title-product'>{productID.title}</p>
          <img
            src={ productID.thumbnail }
            alt={ productID.title }
            data-testid="product-detail-image"
            className='w-[300px]'
            
          />
          <p data-testid="product-detail-price">{`R$ ${productID.price}`}</p>
          {frete === true
          && <p data-testid="free-shipping">Frete grátis</p>}
          <button
            type="button"
            className='btn'
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              const currentCart = JSON
                .parse(localStorage.getItem('cartProduct')) || [];
              const newCart = [...currentCart, productID];
              localStorage.setItem('cartProduct', JSON.stringify(newCart));

              const allCartProducts = JSON
                .parse(localStorage.getItem('allCartProducts')) || [];
              const newOtherCart = [...allCartProducts, productID];
              localStorage.setItem('allCartProducts', JSON.stringify(newOtherCart));
              this.setState({ quantityItensCart: getAllCartItemsLocalStorage() });
            } }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <form className='flex flex-col items-center mt-20'>
          <h1>Avaliações</h1>
          <fieldset>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              data-testid="product-detail-email"
              value={ email }
              onChange={ this.onInputChange }
              placeholder="E-mail"
              className='border-[1px] border-slate-500 w-[18rem] mb-2'
            />
          </label>
          {rate.map((e, index) => (
            <label htmlFor={ inputChecked } key={ index + 1 }>
              {' '}
              {e}
              <input
                type="radio"
                id={ inputChecked }
                name="inputChecked"
                data-testid={ `${index + 1}-rating` }
                value={ e }
                onChange={ this.onInputChange }
              />
            </label>
          ))}
          </fieldset>
          <label htmlFor="comment">
            <textarea
              name="comment"
              cols="40"
              rows="5"
              data-testid="product-detail-evaluation"
              value={ comment }
              onChange={ this.onInputChange }
              className='border-[1px] border-slate-500'
            />
          </label>
          {!invalidationInfo && <p data-testid="error-msg">Campos inválidos</p>}
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.validation }
            className='btn w-[15rem]'
          >
            Avaliar

          </button>

        </form>
        {evaluation.length > 0 && evaluation.map((e, index) => (
          <div key={ `${e.email}${index}` }>
            <p data-testid="review-card-email">{e.email}</p>
            <p data-testid="review-card-evaluation">{e.comment}</p>
            <p data-testid="review-card-rating">{e.inputChecked}</p>

          </div>
        ))}
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
}.isRequired;
