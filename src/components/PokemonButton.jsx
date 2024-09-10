/* eslint-disable no-unused-vars */

import React from "react";
import PropTypes from "prop-types"; 

const PokemonButton = ({ name, imageUrl, onClick }) => {
  return (
    <button onClick={onClick} className="pokemon-button">
      <img src={imageUrl} alt={name} className="pokemon-button-image" />
      <span>{name}</span>
    </button>
  );
};

PokemonButton.propTypes = {
  name: PropTypes.string.isRequired, 
  imageUrl: PropTypes.string.isRequired, 
  onClick: PropTypes.func.isRequired, 
};

export default PokemonButton;