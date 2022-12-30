import jwtDecode from "jwt-decode";
import { login, findById } from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          let msg = "로그인이 실패했습니다.";
          if (data.msg === "success") {
            msg = "로그인 되었습니다.";
            let accessToken = data["access-token"];
            console.log("login success token created!!!! >> ", accessToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getUserInfo({ commit }, token) {
      let decodeToken = jwtDecode(token);
      console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userId,
        ({ data }) => {
          if (data.msg == "success") {
            commit("SET_USER_INFO", data.userInfo);
            console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
        }
      );
    },

    async userLogout({ commit }) {
      // await logout(
      //   userid,
      //   ({ data }) => {
          // if (this.userInfo) {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
      commit("SET_IS_VALID_TOKEN", false);
      
          // } else {
          //   console.log("유저 정보 없음!!!!");
          // }
        // },
        // (error) => {
        //   console.log(error);
        // }
      // );
    },
  },
};

export default memberStore;
