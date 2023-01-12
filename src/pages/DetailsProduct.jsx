import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DetailsProduct extends Component {
  render() {
    const { detailsId } = this.props;
    return (
      <div>
        {detailsId.map((e) => (

          <div key={ e.id } data-testid="product">
            <p>{e.title}</p>
            <img src={ e.thumbnail } alt={ e.title } />
            <p>{e.price}</p>
          </div>

        ))}
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  detailsId: PropTypes.arrayOf(
    propTypes.string,
  ),
}.isRequired;
