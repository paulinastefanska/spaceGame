<template>
  <v-card
    class="mx-auto mt-5 py-5"
    max-width="400"
    :color="color"
    :loading="loading"
  >
    <v-card-title class="font-weight-bold">{{ playerName }}</v-card-title>
    <v-card-subtitle class="font-weight-medium">Score:</v-card-subtitle>
    <v-card-text class="text-h6">{{ score }}</v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: ""
  },
  loading: {
    type: Boolean,
    default: false
  },
  playerName: {
    type: String,
    default: ""
  },
  score: {
    type: Number,
    default: 0
  }
})
</script>
