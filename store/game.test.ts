import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '../store/game'

describe('GameStore', () => {
  let store: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameStore()
  })

  test('store renders properly', () => {
    console.log("store", store)
    expect(store).toBeDefined();
  })

  test('start new game resets data properly', async () => {
    store.scoreLeftPlayer = 10
    store.scoreRightPlayer = 20
    expect(store.scoreLeftPlayer).toBe(10)
    expect(store.scoreRightPlayer).toBe(20)
    await store.startNewGame()
    expect([store.scoreLeftPlayer, store.scoreRightPlayer]).toContain(0)
  })

  test('game option selects properly', async () => {
    expect(store.gameOption).toBe(null)
    await store.selectOption('people')
    expect(store.gameOption).toBe('people')
  })
})