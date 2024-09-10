/* eslint-disable no-unused-vars */

import React from "react";
import PropTypes from "prop-types";

function PokemonDescription({ description, weight, height }) {
  return (
    <div className="pokemon-description">
      <p className="description">{description}</p>
      <div className="basics-info">
        <div className="info-block">
          <i className="fas fa-weight"></i>
          <span>{weight}</span>
        </div>
        <div className="info-block">
          <i className="fas fa-ruler-vertical"></i>
          <span>{height}</span>
        </div>
      </div>
    </div>
  );
}

PokemonDescription.propTypes = {
  description: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default PokemonDescription;