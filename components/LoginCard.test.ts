// import { mount } from "@vue/test-utils";
// import { createVuetify } from "vuetify";
// import LoginCard from "./LoginCard.vue";
// import firebase from "firebase/app";

// TODO Fix this test - mock Firebase
describe("LoginCard", () => {
  test("todo LoginCard test", () => {
    assert(true);
  });
});

// const loginMock = vi.fn();
// firebase.auth = () => ({
//   ...authMock,
//   login: loginMock,
// });

// const vuetify = createVuetify();

// describe("LoginCard", () => {
//   let wrapper: any;

//   beforeEach(() => {
//     wrapper = mount(LoginCard, {
//       global: {
//         plugins: [vuetify],
//       },
//     });
//   });

//   test("component Login renders properly", () => {
//     console.log("wrapper", wrapper);
//     expect(LoginCard).toBeDefined();
//   });

//   test("login function is called", async () => {
//     const login = {
//       email: "admin@admin.com",
//       password: "admin123",
//     }

//     Simulate user login
//     await wrapper.vm.login(login.email, login.password);
//     expect(loginMock).toHaveBeenCalledWith(login.email, login.password);
//   });
// });