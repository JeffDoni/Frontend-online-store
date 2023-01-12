import propTypes from 'prop-types';
import React, { Component } from 'react';

export default class ProductCard extends Component {
  render() {
    const { product } = this.props;
    return (
      <li>{product.title}</li>
    );
  }
}

ProductCard.propTypes = {
  product: propTypes.shape({
    title: propTypes.string.isRequired,
  }).isRequired,
};
