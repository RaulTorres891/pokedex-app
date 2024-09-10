/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import Finder from "./components/Finder";
import PokemonButton from "./components/PokemonButton"; 
import "./styles.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [iniciarBusqueda, setIniciarBusqueda] = useState(false);
  const [showCard, setShowCard] = useState(false); 
  const [showButton, setShowButton] = useState(true); 

  useEffect(() => {
    if (iniciarBusqueda) {
      if (!searchQuery.trim()) {
        console.log("Llene el campo de búsqueda.");
        setPokemonData(null);
        setIniciarBusqueda(false);
        return;
      }

      if (searchQuery === searchQuery.toLowerCase()) {
        console.log("Escriba correctamente el nombre del Pokémon.");
        setIniciarBusqueda(false);
        return;
      }

      fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Pokémon no encontrado");
          }
          return response.json();
        })
        .then((data) => {
          const { name, id, sprites, types, weight, height, stats } = data;
          const formattedStats = stats.reduce((acc, stat) => {
            acc[stat.stat.name.toUpperCase()] = stat.base_stat;
            return acc;
          }, {});

          setPokemonData({
            name: capitalizeFirstLetter(name),
            id,
            imageUrl: sprites.other["official-artwork"].front_default,
            type: types[0].type.name,
            weight: `${weight / 10} kg`,
            height: `${height / 10} m`,
            description: "No description available",
            stats: formattedStats,
          });
          setIniciarBusqueda(false);
          setShowButton(true); 
          setShowCard(false); 
        })
        .catch(() => {
          console.log("Pokémon no encontrado.");
          setPokemonData(null);
          setIniciarBusqueda(false);
        });
    }
  }, [iniciarBusqueda, searchQuery]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div id="root">
      <Finder
        setBusqueda={setSearchQuery}
        setIniciarBusqueda={setIniciarBusqueda}
      />
      
      {showButton && pokemonData && (
        <PokemonButton
          name={pokemonData.name}
          imageUrl={pokemonData.imageUrl}
          onClick={() => {
            setShowCard(true); 
            setShowButton(false); 
          }}
        />
      )}
      
      {showCard && pokemonData && (
        <PokemonCard
          key={pokemonData.id}
          name={pokemonData.name}
          id={pokemonData.id}
          imageUrl={pokemonData.imageUrl}
          type={pokemonData.type}
          weight={pokemonData.weight}
          height={pokemonData.height}
          description={pokemonData.description}
          stats={pokemonData.stats}
        />
      )}
    </div>
  );
}

export default App;
