import React from "react";
import io from "socket.io-client";
import {Game} from "types";

const socket = io("http://localhost:3000");

const App: React.FC = () => {
  const [game, setGame] = React.useState<null | Game>(null);

  React.useEffect(() => {
    socket.on("game", (game: Game) => setGame(game));
  }, []);

  if (!game) return null;

  return (
    <main>
      <img
        alt="Pokemon"
        height={512}
        src={game.pokemon.image}
        style={{filter: `brightness(${game.status === "playing" ? 0 : 1})`}}
        width={512}
      />
      {game.status === "finished" && <h2>{game.pokemon.name}</h2>}
    </main>
  );
};

export default App;
