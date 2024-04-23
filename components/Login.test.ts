import { mount } from "@vue/test-utils";
import { createVuetify } from 'vuetify'
import Login from "../components/Login.vue";

const vuetify = createVuetify()

describe("SpaceGameCard", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  test("component Login renders properly", () => {
    expect(Login).toBeDefined();
  });

  test("component renders v-card properly", () => {
    expect(wrapper.find("v-card").exists()).toBe(true);
  });
});
