# Twitch PokeGuess
Guess who's this Pokemon? on your Twitch stream.

## Installation
```bash
# Install project dependencies
yarn

# Install packages dependencies
yarn bootstrap

# Start packages
yarn start
```

## Configuration
Update `/packages/server/constants.ts` file with your channel and token (you can get your token [here](https://twitchapps.com/tmi/)).

## Setup
Go to OBS or Streamlabs and add a `Browser source` pointing to `http://localhost:1234`, set a `white` background for body or place the widget on a clear background.

## Disclaimer
Texts are in Spanish, you can change those on `/packages/server/app.ts`

## Commands
| Command | Description |
|---|---|
| !guess vulpix | Guess a Pokemon |
| !hint | Get a hint for current Pokemon |

## Pokemon list
First generation Pokemon are present, to get more, uncomment, in order, Pokemons on `/packages/server/constants.ts`