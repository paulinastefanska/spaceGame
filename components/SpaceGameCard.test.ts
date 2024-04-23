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
    expect(SpaceGameCard).toBeDefined();
  });

  test("component renders v-card properly", () => {
    expect(wrapper.find("v-card").exists()).toBe(true);
  });

  test("component renders v-card-title properly", () => {
    expect(wrapper.find("v-card-title").exists()).toBe(true);
  });
});
