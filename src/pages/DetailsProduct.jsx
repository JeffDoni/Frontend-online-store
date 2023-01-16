import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
      <div>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
          <span data-testid="shopping-cart-size">{quantityItensCart.length }</span>
        </Link>
        <div data-testid="product">
          <p data-testid="product-detail-name">{productID.title}</p>
          <img
            src={ productID.thumbnail }
            alt={ productID.title }
            data-testid="product-detail-image"
          />
          <p data-testid="product-detail-price">{productID.price}</p>
          {frete === true
          && <p data-testid="free-shipping"> frete grátis</p>}
          <button
            type="button"
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
        <form>
          <label htmlFor="email">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              data-testid="product-detail-email"
              value={ email }
              onChange={ this.onInputChange }
              placeholder="Digite seu email"
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
          <label htmlFor="comment">
            <textarea
              name="comment"
              cols="30"
              rows="10"
              data-testid="product-detail-evaluation"
              value={ comment }
              onChange={ this.onInputChange }
            />
          </label>
          {!invalidationInfo && <p data-testid="error-msg">Campos inválidos</p>}
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.validation }
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
