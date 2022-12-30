import { apiInstance } from "./index.js";

const api = apiInstance();
// api.defaults.withCredentials = true;

async function login(user, success, fail) {
  await api
    .post(
      `/members/login`,
      {
        userId: user.userId,
        userPassword: user.userPassword,
      }
      // , {
      //     withCredentials: true
      // }
    )
    .then(success)
    .catch(fail);
}

async function findById(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/members/${userId}`).then(success).catch(fail);
}

// async function logout(userId, success, fail) {
//   await api.get(`/members/logout/${userId}`).then(success).catch(fail);
// }

export { login, findById };
