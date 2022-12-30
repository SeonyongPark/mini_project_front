import { apiInstance } from "./index.js";

const api = apiInstance();

function sidoList(success, fail) {
  api.get(`/aparts/codes`).then(success).catch(fail);
}

function gugunList(sidoCode, success, fail) {
  api.get(`/aparts/codes/${sidoCode}`).then(success).catch(fail);
}

function dongList(gugunCode, success, fail) {
  api
    .get(`/aparts/codes/${String(gugunCode.substring(0, 2))}/${String(gugunCode.substring(2, 5))}`)
    .then(success)
    .catch(fail);
}

function makeList(code, year, month, success, fail) {
  console.log(year + " " + month);
  api.get(`/aparts/${code}/${year}/${month}`).then(success).catch(fail);
}

export { sidoList, gugunList, dongList, makeList };
