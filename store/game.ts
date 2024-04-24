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
  lostLeftPlayer: number;
  lostRightPlayer: number;
  valuePlayerLeft: number;
  valuePlayerRight: number;
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
    lostLeftPlayer: 0,
    lostRightPlayer: 0,
    valuePlayerLeft: 0,
    valuePlayerRight: 0,
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

      const getNumericValue = (value: string | undefined) => {
        return value && !isNaN(Number(value.replace(/,/g, ""))) 
          ? Number(value.replace(/,/g, "")) 
          : 0;
      };

      const getPlayerValue = (player: Player, gameOption: string | null) => {
        if (gameOption === GAME_OPTION.PEOPLE) {
          return getNumericValue(player.mass);
        } else {
          return getNumericValue(player.crew);
        }
      };

      this.valuePlayerLeft = getPlayerValue(this.leftPlayer, this.gameOption);
      this.valuePlayerRight = getPlayerValue(
        this.rightPlayer,
        this.gameOption
      );

      this.draw = false;

      if (this.valuePlayerLeft === this.valuePlayerRight) {
        this.draw = true;
        this.winner = null;
      } else if (this.valuePlayerLeft > this.valuePlayerRight) {
        this.winner = PLAYERS.LEFT_PLAYER;
        this.scoreLeftPlayer++;
        this.lostRightPlayer++;
      } else {
        this.winner = PLAYERS.RIGHT_PLAYER;
        this.scoreRightPlayer++;
        this.lostLeftPlayer++;
      }

      this.loading = false;
    },

    startNewGame() {
      this.leftPlayer = null;
      this.rightPlayer = null;
      this.scoreLeftPlayer = 0;
      this.scoreRightPlayer = 0;
      this.lostLeftPlayer = 0;
      this.lostRightPlayer = 0;
      this.valuePlayerLeft = 0;
      this.valuePlayerRight = 0;
      this.winner = null;
    },

    selectOption(data: string) {
      this.gameOption = data;
    },
  },
});
