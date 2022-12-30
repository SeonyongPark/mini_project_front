import { sidoList, gugunList, dongList, makeList } from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "시/도를 선택하세요" }],
    guguns: [{ value: null, text: "구/군을 선택하세요" }],
    dongs: [{ value: null, text: "동을 선택하세요" }],
    dongCodeSave: null,
    houses: [],
    house: null,
  },
  getters: {},
  mutations: {
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "시/도를 선택하세요" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구/군을 선택하세요" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "동을 선택하세요" }];
    },
    CLEAR_APT_LIST(state) {
      state.houses = [];
      state.house = null;
    },
    CLEAR_HOUSE_LIST(state) {
      state.house = {
        apartmentName: "",
        aptCode: "",
        area: "",
        date: "",
        dealAmount: "",
        floor: "",
        lat: "37.4925808841498",
        like_id: null,
        lng: "127.037814671598",
        no: ""
      };
    },
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.code, text: sido.name });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.code, text: gugun.name });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.code, text: dong.name });
      });
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses =houses;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
    },
    SET_DONGCODE_HOUSE(state, d) {
      state.dongCodeSave = d;

    },
  },
  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      gugunList(
        sidoCode,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      dongList(
        gugunCode,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getHouseList: ({ commit }, result) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      // let year = String(date).substring(0, 4);
      // let month = String(date).substring(4);
      console.log(result);
      console.log(result.dongCode + " " + result.year + " " + result.month);
      // console.log("동코드 세이브 널? : " + this.dongCodeSave == null);
      commit("SET_DONGCODE_HOUSE", result);
      makeList(
        result.dongCode,
        result.year,
        result.month,
        ({ data }) => {
          if (data.aptCode != "") {
            commit("SET_HOUSE_LIST", data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
