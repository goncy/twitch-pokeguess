export interface Game {
  status: "playing" | "finished";
  pokemon: {
    name: string;
    image: string;
  };
}
