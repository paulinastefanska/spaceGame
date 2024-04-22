import { defineStore } from "pinia";

const PEOPLE = "people";
const LEFT_PLAYER = "leftPlayer";
const RIGHT_PLAYER = "rightPlayer";
const NOT_FOUND = "Not found";
const OK = "ok";
const MAX_NUMBER = 50;

interface MainStore {
  gameOption: string | null;
  leftPlayer: any;
  rightPlayer: any;
  scoreLeftPlayer: number;
  scoreRightPlayer: number;
  loading: boolean;
  winner: string;
  notFoundPeople: number[];
  notFoundStarships: number[];
}

export const useMainStore = defineStore("main", {
  state: (): MainStore => ({
    gameOption: null,
    leftPlayer: null,
    rightPlayer: null,
    scoreLeftPlayer: 0,
    scoreRightPlayer: 0,
    loading: false,
    winner: "",
    notFoundPeople: [],
    notFoundStarships: [],
  }),

  actions: {
    async fetchPlayerData() {
      let player: any;

      while (!player) {
        let number: number;

        do {
          number = Math.floor(Math.random() * MAX_NUMBER) + 1;
        } while (
          this.gameOption === PEOPLE
            ? this.notFoundPeople.includes(number)
            : this.notFoundStarships.includes(number)
        );

        try {
          let response: any = await fetch(
            `https://www.swapi.tech/api/${this.gameOption}/${number}/`
          );
          response = await response.json();

          if (response.message === NOT_FOUND) {
            this.gameOption === PEOPLE
              ? this.notFoundPeople.push(number)
              : this.notFoundStarships.push(number);
          }
          if (response.message === OK) {
            player = response.result.properties;
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

      const getPlayerValue = (player: any, gameOption: string | null) => {
        return gameOption === PEOPLE
          ? Number(player.mass.replace(/,/g, ""))
          : Number(player.crew.replace(/,/g, ""));
      };

      const playerLeftScore = getPlayerValue(this.leftPlayer, this.gameOption);
      const playerRightScore = getPlayerValue(
        this.rightPlayer,
        this.gameOption
      );

      if (playerLeftScore > playerRightScore) {
        this.winner = LEFT_PLAYER;
        this.scoreLeftPlayer++;
      } else {
        this.winner = RIGHT_PLAYER;
        this.scoreRightPlayer++;
      }

      this.loading = false;
    },

    startNewGame() {
      this.leftPlayer = null;
      this.rightPlayer = null;
      this.scoreLeftPlayer = 0;
      this.scoreRightPlayer = 0;
      this.winner = "";
    },

    selectOption(resource: string) {
      this.gameOption = resource;
    },
  },
});
