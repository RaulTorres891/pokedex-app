/* eslint-disable no-unused-vars */

import React from "react";
import PropTypes from "prop-types";

function Finder({
  finderLabel = "Buscador",
  buttonText = "Buscar",
  setBusqueda,
  setIniciarBusqueda,
}) {
    
  return (
    <div id = "finder-container">
      <h1 id="title">Pokedex</h1>
      <input
        type="text"
        id="search"
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <input
        type="button"
        value={buttonText}
        onClick={() => setIniciarBusqueda(true)}
      />
    </div>
  );
}

Finder.propTypes = {
  finderLabel: PropTypes.string,
  buttonText: PropTypes.string,
  setBusqueda: PropTypes.func.isRequired,
  setIniciarBusqueda: PropTypes.func.isRequired,
};

export default Finder;