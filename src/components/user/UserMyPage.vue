<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>My Page</template>

          <template #lead> 내 정보 확인페이지입니다. </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userId }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userName }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userAddress }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.joinDate }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
        </b-jumbotron>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
    <div><p class="h2 mb-2"><b-icon icon="suit-heart-fill" variant="danger"></b-icon> 관심정보 등록 내용 </p></div> <br/> <br/><br/>
    <b-row>
      <b-col cols="6" align="left">
      <div v-if="houses.length >0" style="max-height:600px; overflow-y:auto;">
          <p class="h2 mb-2"><b-icon icon="bookmark-heart-fill" variant="danger"></b-icon> 등록된 관심정보입니다. </p>
          <User-page-item v-for="(house, index) in houses" :key="index" :house="house" @choice="cho"/>
      </div>
      <div v-else>
        <p class="h2 mb-2"><b-icon icon="bookmark-heart" variant="danger"></b-icon> 등록된 관심정보가 없습니다. </p>
      </div>
      </b-col>
      <b-col cols="6">
        <user-page-detail :houseC="housechoice" @refresh="refresh"></user-page-detail>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import UserPageItem from "@/components/user/item/UserPageItem.vue";
import UserPageDetail from "@/components/user/item/UserPageDetail.vue";
import { mapState, mapActions } from "vuex";
import http from "@/api/http.js";

const memberStore = "memberStore";
const houseStore = "houseStore";

export default {
  name: "UserMyPage",
  data() {
    return {
      houses: [],
      housechoice: [],
    };
  },
  components: {UserPageItem,UserPageDetail,},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(houseStore,["detailHouse"]),
    temp() {
      this.CLEAR_HOUSE_LIST();
      this.detailHouse(this.house);
    },
    cho(choice) {
            this.housechoice = [];
      this.housechoice = choice;
      console.log("선택 하우스 정보");
      console.log(this.housechoice);
    },
    refresh(refresh) {
      console.log(refresh);
      this.init();
    },
    init() {
      http.get(`/bookmark/${this.userInfo.userId}`)
      .then(({ data }) => {
        if (data.msg == "success") {
          this.houses = data.list;
          console.log(this.houses);
      }
    })
      },
  },
  mounted() {
    this.init();
  }
};
</script>

<style></style>
