import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class DetailsProduct extends Component {
  state = {
    productID: {},
  };

  async componentDidMount() {
    const id = JSON.parse(localStorage.getItem('detailsId'));
    const details = await getProductById(id);
    console.log('testand', details);
    this.setState({
      productID: details,
    });
  }

  render() {
    const { productID } = this.state;
    return (
      <div>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <div data-testid="product">
          <p data-testid="product-detail-name">{productID.title}</p>
          <img
            src={ productID.thumbnail }
            alt={ productID.title }
            data-testid="product-detail-image"
          />
          <p data-testid="product-detail-price">{productID.price}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              const currentCart = JSON
                .parse(localStorage.getItem('cartProduct')) || [];
              const newCart = [...currentCart, productID];
              localStorage.setItem('cartProduct', JSON.stringify(newCart));
            } }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    );
  }
}
