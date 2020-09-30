import * as io from "socket.io";
import * as tmi from "tmi.js";

import api from "./api";
import {CHANNEL, POKEMON, PORT, TOKEN} from "./constants";
import {Game} from "./types";

let game: Game = {
  status: "playing",
  pokemon: api.random(),
};
let hints = 0;
let scores = new Map<string, Set<Game["pokemon"]>>();

const server = io.listen(PORT);
const client = tmi.client({
  identity: {
    username: CHANNEL,
    password: TOKEN,
  },
  channels: [CHANNEL],
});

server.on("connection", (socket) => socket.emit("game", game));

client.on("message", (_target, context, message) => {
  if (game.status === "finished") return;

  if (message.includes("!hint")) {
    hints++;

    client.say(
      CHANNEL,
      `Pista: ${game.pokemon.name.slice(0, hints).padEnd(game.pokemon.name.length, "_")}`,
    );
  }

  if (message.includes("!guess")) {
    const guess = message.split("!guess")[1];

    if (api.matches(guess, game.pokemon.name)) {
      if (!scores.has(context.username)) {
        scores.set(context.username, new Set());
      }

      const score = scores.get(context.username);

      score.add(game.pokemon);

      game.status = "finished";
      hints = 0;
      client.say(
        CHANNEL,
        `${context.username} adivinó, era ${game.pokemon.name} (https://pokemon.gameinfo.io/es/pokemon/${game.pokemon.id}-${game.pokemon.name}). Y ya atrapo ${score.size} / ${POKEMON.length}`,
      );

      if (score.size === POKEMON.length) {
        client.say(CHANNEL, `${context.username}, los atrapaste a todos!`);
        scores = new Map<string, Set<Game["pokemon"]>>();
      }

      server.emit("game", game);

      setTimeout(() => {
        game = {
          status: "playing",
          pokemon: api.random(),
        };

        server.emit("game", game);
      }, 3000);
    }
  }
});

client.connect();
