<template>
  <v-card class="mx-auto mt-5 py-10" :color="color" :loading="loading">
    <v-card-title class="font-weight-bold">{{ playerName }}</v-card-title>
    <!-- TODO add right labels mass/crew -->
    <v-card-text class="text-h6">{{ playerValue }}</v-card-text>
    <v-card-subtitle class="font-weight-medium">Score:</v-card-subtitle>
    <v-card-text class="text-h6">{{ score }}</v-card-text>
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  playerName: {
    type: String,
    default: "",
  },
  playerValue: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
});
</script>
