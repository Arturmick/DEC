const fetch = require('node-fetch');

const getPokemon = async (pokemonName) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const pokemonData = await response.json();
        console.log(pokemonData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

// Example usage:
getPokemon('pikachu');