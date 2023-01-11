import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    category: [],
  };

  async componentDidMount() {
    const list = await getCategories();
    this.setState({
      category: list,
    });
  }

  render() {
    const { category } = this.state;
    return (
      <div>
        {category.map((e) => (
          <form key={ e.id }>
            <label htmlFor={ e.id } data-testid="category">{e.name}</label>
            <input
              type="radio"
              id={ e.id }
              value={ e.name }
            />
          </form>
        ))}
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
      </div>
    );
  }
}
