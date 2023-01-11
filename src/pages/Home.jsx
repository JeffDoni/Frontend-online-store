import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    category: [],
    pesquisar: '',
    list: [],
  };

  async componentDidMount() {
    const list = await getCategories();
    this.setState({
      category: list,
    });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { pesquisar } = this.state;
    const product = await getProductsFromCategoryAndQuery('', pesquisar);
    this.setState({
      list: product,
    });
  };

  render() {
    const { category, pesquisar, list } = this.state;
    return (
      <div>
        <form>
          {category.map((e) => (

            <label htmlFor={ e.id } data-testid="category" key={ e.id }>
              {e.name}
              <input
                type="radio"
                id={ e.id }
                value={ e.name }
                name="category"
              />
            </label>
          ))}
        </form>
        <form>
          <input
            type="text"
            data-testid="query-input"
            name="pesquisar"
            value={ pesquisar }
            onChange={ ({ target }) => this.setState({
              pesquisar: target.value,
            }) }
          />
          <button
            data-testid="query-button"
            type="submit"
            onClick={ this.handleClick }
          >
            Pesquisar

          </button>
        </form>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {list.length === 0 && <p>Nenhum produto foi encontrado</p> }
        {list.map((e) => (
          <div key={ e.id } data-testid="product">
            <p>{e.title}</p>
            <img src={ e.thumbnail } alt={ e.title } />
            <p>{e.price}</p>
          </div>

        ))}
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
      </div>
    );
  }
}
