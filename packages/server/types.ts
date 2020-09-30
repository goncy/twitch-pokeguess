export interface Game {
  status: "playing" | "finished";
  pokemon: {
    id: number;
    name: string;
    image: string;
    isShiny: boolean;
  };
}
