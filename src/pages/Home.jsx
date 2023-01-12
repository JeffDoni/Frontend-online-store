import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories,
  getProductById,
  getProductsFromCategoryAndQuery } from '../services/api';
import DetailsProduct from './DetailsProduct';

export default class Home extends Component {
  state = {
    category: [],
    pesquisar: '',
    list: [],
    selectId: '',
    detailsId: [],
  };

  async componentDidMount() {
    const list = await getCategories();
    this.setState({
      category: list,
    });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      selectId: value,

    }, async () => {
      const { selectId, pesquisar } = this.state;
      const product = await getProductsFromCategoryAndQuery(selectId, pesquisar);
      this.setState({
        list: product.results,
      });
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { pesquisar } = this.state;
    const product = await getProductsFromCategoryAndQuery('', pesquisar);
    this.setState({
      list: product.results,
    });
  };

  captureId = (id) => {
    const details = getProductById(id);
    this.setState({
      detailsId: details,
    });
  };

  render() {
    const { category, pesquisar, list, detailsId } = this.state;
    return (
      <div>
        <form>
          {category.map((e) => (

            <label htmlFor={ e.id } data-testid="category" key={ e.id }>
              <input
                type="radio"
                id={ e.id }
                value={ e.id }
                name="category"
                onChange={ this.handleChange }
              />
              {e.name}
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
          <Link
            key={ e.id }
            data-testid="product"
            to="/detailsProduct"
            onClick={ () => this.captureId(e.id) }
          >
            <div>
              <p>{e.title}</p>
              <img src={ e.thumbnail } alt={ e.title } />
              <p>{e.price}</p>
            </div>
          </Link>

        ))}
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <DetailsProduct detailsId={ detailsId } />
      </div>
    );
  }
}
