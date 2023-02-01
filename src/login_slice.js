import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginService = axios.create({
  baseURL: "http://localhost:8080/login",
  headers: {
    "Content-Type": "application/json",
  },
});
// function setJWT(jwt) {
//   loginService.defaults.headers = {
//     ...loginService.defaults.headers,
//     Authorization: `Bearer ${jwt}`,
//   };
// }

export const loginSlice = createSlice({
  name: "login",
  initialState: () => {
    const jwt = sessionStorage.getItem("JWT");
    const stateLogged = jwt !== null;
    return { jwt: jwt, loggedIn: stateLogged };
  },
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.jwt = null;
      state.loggedIn = false;
      sessionStorage.removeItem("JWT");
    },
  },
});

export const loginAsync = (cre, success, fail) => (dispatch) => {
  loginService
    .post("/", cre)
    .then((res) => {
      dispatch(login(res.data.jwt));
      console.log(res.data.jwt);
      success();
    })
    .catch((error) => {
      console.log(error);
      fail(error);
    });
};
const { login } = loginSlice.actions;
export const { logout } = loginSlice.actions;
export const loggedInSelect = (state) => state.login.loggedIn;
export default loginSlice.reducer;
