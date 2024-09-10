/* eslint-disable no-unused-vars */

import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PokemonType from "./PokemonType";

function PokemonCard({
  name,
  id,
  imageUrl,
  type,
  weight,
  height,
  description,
  stats,
}) {
  const imageRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState("100%");
  const [formattedName, setFormattedName] = useState(name);

  useEffect(() => {
    const capitalizeName = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    setFormattedName(capitalizeName(name));

    const typeColorMap = {
      grass: "#7bc74d",
      poison: "#a55eb5",
      water: "#6493eb",
      fire: "#F08030",
      bug: "#A8B820",
      normal: "#A8A878",
      electric: "#F8D030",
      ground: "#E0C068",
      fairy: "#EE99AC",
      fighting: "#C03028",
      psychic: "#F85888",
      rock: "#B8A038",
      ghost: "#705898",
      ice: "#98D8D8",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      flying: "#A890F0",
    };

    const color = typeColorMap[type] || "#6493eb";

    const colorWithOpacity = `${color}66`;

    const cardElement = document.querySelector(".card");
    const statElements = document.querySelectorAll(
      ".stat-fill, .stat-info, .types-container"
    );
    const statBars = document.querySelectorAll(".stat-bar");

    if (cardElement) {
      cardElement.style.setProperty("--type-color", color);
    }

    statElements.forEach((el) => {
      el.style.setProperty("--type-color", color);
    });

    statBars.forEach((el) => {
      el.style.setProperty("background", colorWithOpacity);
    });
  }, [name, type]);

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      image.onload = () => {
        const imageWidth = image.naturalWidth;
        if (imageWidth > 400) {
          setContainerWidth("150%");
        } else {
          setContainerWidth("100%");
        }
      };
    }
  }, [imageUrl]);

  return (
    <div className="card" style={{ maxWidth: containerWidth }}>
      <div className="header">
        <div className="pokemon-name">{formattedName}</div>
        <div className="pokemon-id">#{id}</div>
      </div>
      <div className="image-container">
        <div className="circular-progress">
          <img ref={imageRef} src={imageUrl} alt={formattedName} width="200" />
        </div>
      </div>
      <div className="poke-info">
        <div className="basics-info">
          <div className="info-block">
            <i className="fas fa-weight"></i>
            <span>{weight}</span>
          </div>
          <div className="info-block">
            <i className="fas fa-ruler-vertical"></i>
            <span>{height}</span>
          </div>
          <div className="info-block">
            <PokemonType type={type} />
          </div>
        </div>
        <p className="description">{description}</p>
        <div className="base-stats">
          <h4 className="base-stats-title">Base Stats</h4>
          {Object.entries(stats).map(([stat, value]) => (
            <div className="stat" key={stat}>
              <span className="stat-info">{stat}</span>
              <span className="stat-percentage">{value}</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(value * 100)/200}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stats: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default PokemonCard;