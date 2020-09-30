import {Game} from "./types";
import {POKEMON} from "./constants";

export default {
  matches: (guess: string, pokemon: string) => {
    const _guess = guess.replace(/\W/g, "").toLowerCase();
    const _pokemon = pokemon.replace(/\W/g, "").toLowerCase();

    return _guess === _pokemon;
  },
  random: (): Game["pokemon"] => {
    const match = Math.round(Math.random() * (POKEMON.length - 1) + 1);
    const isShiny = Math.round(Math.random() * (100 - 1) + 1) < 25;

    return {
      id: match,
      isShiny,
      name: POKEMON[match - 1],
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
        isShiny ? "/shiny" : "/"
      }/${match}.png`,
    };
  },
};
