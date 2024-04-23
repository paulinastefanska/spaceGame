import { mount } from "@vue/test-utils";
import { createVuetify } from 'vuetify'
import LoginCard from "./LoginCard.vue";
import SpaceGame from "../components/SpaceGame.vue";
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useGameStore } from '../store/game'

const vuetify = createVuetify()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginCard },
    { path: '/game', component: SpaceGame },
  ], 
});

const pinia = createPinia()
const gameStore = useGameStore(pinia)

gameStore.$reset()

describe("LoginCard", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(LoginCard, {
      global: {
        plugins: [vuetify, pinia],
        mocks: {
          $router: router,
          $store: {
            game: gameStore,
          },
        },
      },
    });
  });

  test("component Login renders properly", () => {
    console.log('wrapper', wrapper);
    expect(LoginCard).toBeDefined();
  });
});
