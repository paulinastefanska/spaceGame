import { mount } from "@vue/test-utils";
import { createVuetify } from 'vuetify'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '../store/game'
import SpaceGame from "../components/SpaceGame.vue";

const vuetify = createVuetify()

describe('SpaceGame', () => {
  let wrapper: any;
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameStore()
    store.selectOption = vi.fn()
    store.fetchGameData = vi.fn()
    store.startNewGame = vi.fn()

    wrapper = mount(SpaceGame, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  test('component SpaceGame renders properly', () => {
    expect(SpaceGame).toBeDefined();
  })

  test('calls store.selectOption when a game option is selected', async () => {
    await wrapper.find('#people-radio').trigger('click')
    expect(store.selectOption).toHaveBeenCalledWith('people')
  })

  test('calls store.startNewGame when the play again button is clicked', async () => {
    await wrapper.find('#play-button').trigger('click')
    expect(store.startNewGame).toHaveBeenCalled()
  })
})