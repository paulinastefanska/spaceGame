import { defineStore } from "pinia";
import { PLAYERS, GAME_OPTION } from "../constants/game";

const RESPONSE_OK = 200;
const RESPONSE_NOT_FOUND = 404;
const MAX_NUMBER = 50;

interface FetchResponse {
  status: number;
  json: () => Promise<ResponseData>;
}

interface Player {
  name: string;
  mass: string;
  crew: string;
}

interface ResponseData {
  message: string;
  result: {
    properties: Player;
  };
}

interface GameStore {
  gameOption: string | null;
  leftPlayer: Player | null;
  rightPlayer: Player | null;
  scoreLeftPlayer: number;
  scoreRightPlayer: number;
  loading: boolean;
  winner: string | null;
  draw: boolean;
  notFoundPeople: number[];
  notFoundStarships: number[];
}

export const useGameStore = defineStore({
  id: "game-store",
  state: (): GameStore => ({
    gameOption: null,
    leftPlayer: null,
    rightPlayer: null,
    scoreLeftPlayer: 0,
    scoreRightPlayer: 0,
    loading: false,
    winner: null,
    draw: false,
    notFoundPeople: [],
    notFoundStarships: [],
  }),

  actions: {
    async fetchPlayerData() {
      let player: Player | null = null;

      // TO DO if too many calls - add every player to the store
      while (!player) {
        let number: number;

        do {
          number = Math.floor(Math.random() * MAX_NUMBER) + 1;
        } while (
          this.gameOption === GAME_OPTION.PEOPLE
            ? this.notFoundPeople.includes(number)
            : this.notFoundStarships.includes(number)
        );

        try {
          let response: FetchResponse = await fetch(
            `https://www.swapi.tech/api/${this.gameOption}/${number}/`
          );

          if (response.status === RESPONSE_NOT_FOUND) {
            this.gameOption === GAME_OPTION.PEOPLE
              ? this.notFoundPeople.push(number)
              : this.notFoundStarships.push(number);
          }
          if (response.status === RESPONSE_OK) {
            const data: ResponseData = await response.json();
            player = data.result.properties;
          }
        } catch (error) {
          console.error(error);
        }
      }

      return player;
    },

    async fetchGameData() {
      this.loading = true;

      this.leftPlayer = await this.fetchPlayerData();
      this.rightPlayer = await this.fetchPlayerData();

      const getPlayerValue = (player: Player, gameOption: string | null) => {
        return gameOption === GAME_OPTION.PEOPLE
          ? Number(player.mass.replace(/,/g, ""))
          : Number(player.crew.replace(/,/g, ""));
      };

      const playerLeftScore = getPlayerValue(this.leftPlayer, this.gameOption);
      const playerRightScore = getPlayerValue(
        this.rightPlayer,
        this.gameOption
      );

      this.draw = false;

      if (playerLeftScore === playerRightScore) {
        this.draw = true;
        this.winner = null;
      } else if (playerLeftScore > playerRightScore) {
        this.winner = PLAYERS.LEFT_PLAYER;
        this.scoreLeftPlayer++;
      } else {
        this.winner = PLAYERS.RIGHT_PLAYER;
        this.scoreRightPlayer++;
      }

      this.loading = false;
    },

    startNewGame() {
      this.leftPlayer = null;
      this.rightPlayer = null;
      this.scoreLeftPlayer = 0;
      this.scoreRightPlayer = 0;
      this.winner = null;
    },

    selectOption(data: string) {
      this.gameOption = data;
    },
  },
});
