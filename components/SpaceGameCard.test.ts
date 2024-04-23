import { mount } from "@vue/test-utils";
import { createVuetify } from 'vuetify'
import SpaceGameCard from "../components/SpaceGameCard.vue";

const vuetify = createVuetify()

describe("SpaceGameCard", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(SpaceGameCard, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  test("component SpaceGameCard renders properly", () => {
    console.log('wrapper', wrapper);
    expect(SpaceGameCard).toBeDefined();
  });

  test('renders props properly', () => {
    const color = 'yellow'
    const loading = true
    const playerName = 'Player 1'
    const score = 100

    const wrapper = mount(SpaceGameCard, {
      props: {
        color,
        loading,
        playerName,
        score
      }
    })

    expect(wrapper.props().color).toBe(color)
    expect(wrapper.props().loading).toBe(loading)
    expect(wrapper.props().playerName).toBe(playerName)
    expect(wrapper.props().score).toBe(score)
  })
});
