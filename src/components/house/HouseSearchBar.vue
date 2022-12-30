<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
    <b-col class="sm-3">
      <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="gugunCode" :options="guguns" @change="dongList"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="dongCode" :options="dongs"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="year" :options="years" @change="getMonth"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="month" :options="months" ></b-form-select>
    </b-col>
    <b-button @click="searchApt">검색</b-button>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }  
*/
const houseStore = "houseStore";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      years: [{ value: null, text: "거래연도를 선택하세요" },{ value: "2015", text: "2015" },{ value: "2016", text: 2016 },{ value: "2017", text: 2017 },{ value: "2018", text: 2018 },{ value: "2019", text: 2019 },{ value: "2020", text: 2020 },{ value: "2021", text: 2021 },{ value: "2022", text: 2022 }],
      year: null,
      months: [{ value: null, text: "거래 월을 선택하세요" }],
      month: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_APT_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getDong", "getHouseList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST", "CLEAR_APT_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      console.log("시도 코드 : " + this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      console.log("구군 코드 : " + this.gugunCode);
      console.log("시도 코드 : " + (String)(this.gugunCode.substring(0,2)));
      console.log("구군 코드만 분리 : " + (String)(this.gugunCode.substring(2, 5)));
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    getMonth() {
      this.months = [{ value: null, text: "거래 월을 선택하세요" }];
      this.month = null;
      if (this.year) {
        if (this.year == 2022) {
          for (let i = 1; i <= 4; i++) {
            this.months.push({ value: i, text: i });
          }
        } else {
          for (let i = 1; i <= 12; i++) {
            this.months.push({ value: i, text: i });
          }
        }
      }
    },

    searchApt() {
      if (!this.dongCode) {
        alert("동까지 선택해주세요!");
      } else if (!this.month) {
        alert("거래 연/월을 선택해주세요!");
      } else {
        console.log(this.dongCode === "1111010100");
        console.log(this.year=== "2015");
        console.log(this.month === "1");
        // let result = ((String)(this.year)).concat((String)(this.month));
        let result = {
          dongCode: this.dongCode,
          year: this.year,
          month: this.month,
        };
        console.log(result);
        this.getHouseList(result);
      }
      // console.log("구군 코드 : " + this.dongCode);
      
    },
  },
};
</script>

<style></style>
