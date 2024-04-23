<template>
  <h2 class="text-center text-h4 text-capitalize mt-2">
    <span class="text-primary">{{ selectedOption }}</span> battle
  </h2>

  <v-row class="text-center mt-1">
    <v-col cols="6">
      <SpaceGameCard
        :color="winner === PLAYERS.LEFT_PLAYER ? 'primary' : 'default'"
        :loading="loading"
        playerName="Player Left"
        :score="scoreLeftPlayer"
      />
    </v-col>
    <v-col cols="6">
      <SpaceGameCard
        :color="winner === PLAYERS.RIGHT_PLAYER ? 'primary' : 'default'"
        :loading="loading"
        playerName="Player Right"
        :score="scoreRightPlayer"
      />
    </v-col>
  </v-row>

  <div class="custom-height mt-5">
    <p
      v-show="winnerName"
      class="text-center text-h6"
      :class="{ 'text-disabled': loading }"
    >
      <span class="font-weight-bold">{{ winnerName }}</span> won!
    </p>
    <p
      class="text-center text-h6 font-weight-bold"
      :class="{ 'text-disabled': loading }"
      v-show="draw"
    >
      DRAW!
    </p>
  </div>

  <div class="d-flex flex-column mx-auto w-50 mt-2">
    <v-btn
      text="Fight"
      color="primary"
      size="large"
      :loading="loading"
      @click="fight"
    />
    <v-btn
      text="START NEW GAME"
      variant="outlined"
      color="primary"
      size="large"
      class="mt-2"
      @click="playAgain"
    />
  </div>

  <!-- dialogs -->
  <v-dialog v-model="dialog" max-width="480">
    <v-card class="pa-2">
      <v-card-title class="text-h5 font-weight-medium text-primary"
        >Select a character</v-card-title
      >
      <v-radio-group inline v-model="selectedOption" class="px-2">
        <v-radio
          label="People"
          :value="GAME_OPTION.PEOPLE"
          color="primary"
          @click="selectOption(GAME_OPTION.PEOPLE)"
        />
        <v-radio
          label="Starships"
          :value="GAME_OPTION.STARSHIPS"
          color="primary"
          @click="selectOption(GAME_OPTION.STARSHIPS)"
        />
      </v-radio-group>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="START GAME"
          color="primary"
          variant="elevated"
          @click="dialog = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useGameStore } from "@/store/game";
import { PLAYERS, GAME_OPTION } from "@/constants/game";

const store = useGameStore();
const scoreLeftPlayer = computed(() => store.scoreLeftPlayer);
const scoreRightPlayer = computed(() => store.scoreRightPlayer);
const loading = computed(() => store.loading);
const winner = computed(() => store.winner);
const draw = computed(() => store.draw);
const winnerName = computed(() => {
  if (store.winner) {
    return store.winner === PLAYERS.LEFT_PLAYER
      ? "Player Left"
      : "Player Right";
  }
});
const selectedOption = computed(() => store.gameOption);
const dialog = selectedOption.value ? ref(false) : ref(true);

const selectOption = (value: string) => {
  store.selectOption(value);
};

const fight = () => {
  if (!store.gameOption) {
    dialog.value = true;
    return;
  }
  store.fetchGameData();
};

const playAgain = () => {
  store.startNewGame();
  dialog.value = true;
};
</script>
<style scoped>
.custom-height {
  height: 32px;
}
</style>
