import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { BsCart3 } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from "../services/api";
import { getAllCartItemsLocalStorage } from "../services/localStorage";

export default class Home extends Component {
  state = {
    category: [],
    pesquisar: "",
    list: [],
    selectId: "",
    quantityItensCart: getAllCartItemsLocalStorage() || [],
  };

  async componentDidMount() {
    const list = await getCategories();
    this.setState({
      category: list,
    });
  }

  handleChange = ({ target: { value } }) => {
    this.setState(
      {
        selectId: value,
      },
      async () => {
        const { selectId, pesquisar } = this.state;
        const product = await getProductsFromCategoryAndQuery(
          selectId,
          pesquisar
        );
        this.setState({
          list: product.results,
        });
      }
    );
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { pesquisar } = this.state;
    const product = await getProductsFromCategoryAndQuery("", pesquisar);
    this.setState({
      list: product.results,
    });
  };

  render() {
    const { category, pesquisar, list, quantityItensCart } = this.state;
    return (
      <div>
        <header className="flex items-center  align-center h-24 bg-[#003BE5] justify-around">
          <form className="flex">
            <input
              type="text"
              data-testid="query-input"
              name="pesquisar"
              value={pesquisar}
              onChange={({ target }) =>
                this.setState({
                  pesquisar: target.value,
                })
              }
            />
            <button
              data-testid="query-button"
              type="submit"
              onClick={this.handleClick}
            >
              <FcSearch className="h-10 w-10" />
            </button>
          </form>
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
        <div className="flex gap-[20%]">
        <form className="flex flex-col gap-4 bg-slate-200 w-[310px]">
          <h1 className='ml-4 font-bold'>Categorias</h1>
          {category.map((e) => (
            <label htmlFor={e.id} data-testid="category" className='ml-4' key={e.id}>
              <input
                type="radio"
                id={e.id}
                value={e.id}
                name="category"
                onChange={this.handleChange}
              />
              {e.name}
            </label>
          ))}
        </form>
        <div>
        <p data-testid="home-initial-message">
         {list.length === 0 && "Digite algum termo de pesquisa ou escolha uma categoria."}
        </p>
        {list.length === 0 && <p>Nenhum produto foi encontrado</p>}
        <div className="grid grid-cols-3 gap-5 mt-8">
        {list.map((e) => (
          <div key={e.id} className='flex flex-col justify-center items-center h-full'>
            <Link
              data-testid="product-detail-link"
              to={`/detailsProduct/${e.id}`}
              className='w-max h-full'
            >
              <div data-testid="product" className=" rounded-lg shadow-md overflow-hidden h-full  w-[200px] flex flex-col text-sm gap-2 items-center">
                <img src={e.thumbnail} alt={e.title} className='w-[150px]'/>
                <p className="font-semibold mb-2 w-full h-[20%] flex-nowrap">{e.title}</p>
                <p className="text-gray-900 text-lg font-medium mb-2">{`R$ ${e.price}`}</p>
                {e.shipping.free_shipping === true && (
                  <p data-testid="free-shipping" className="text-gray-900 text-lg font-medium mb-2">Frete grátis</p>
                )}
              </div>
            </Link>
            <button
              type="button"
              data-testid="product-add-to-cart"
              className="btn"
              onClick={() => {
                const currentCart =
                  JSON.parse(localStorage.getItem("cartProduct")) || [];
                const newCart = [...currentCart, e];
                localStorage.setItem("cartProduct", JSON.stringify(newCart));

                const allCartProducts =
                  JSON.parse(localStorage.getItem("allCartProducts")) || [];
                const newOtherCart = [...allCartProducts, e];
                localStorage.setItem(
                  "allCartProducts",
                  JSON.stringify(newOtherCart)
                );
                this.setState({
                  quantityItensCart: getAllCartItemsLocalStorage(),
                });
              }}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
        </div>
        </div>
        </div>
      </div>
    );
  }
}
