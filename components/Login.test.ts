import { mount } from "@vue/test-utils";
import { createVuetify } from 'vuetify'
import Login from "../components/Login.vue";
import SpaceGame from "../components/SpaceGame.vue";
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useGameStore } from '../store/game'

const vuetify = createVuetify()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/game', component: SpaceGame },
  ], 
});

const pinia = createPinia()
const gameStore = useGameStore(pinia)

gameStore.$reset()

describe("LoginComponent", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Login, {
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
    expect(Login).toBeDefined();
  });
});
