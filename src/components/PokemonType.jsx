/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';

function PokemonType({ type }) {
  return (
    <div className={`type ${type.toLowerCase()}`}>
      {type}
    </div>
  );
}

PokemonType.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PokemonType;