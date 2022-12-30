<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style="background-color: black;">
      
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav style="background-color: black;">
        <b-navbar-nav>
          <b-nav-item href="#">
            <span style="color: azure;">|&nbsp;&nbsp;</span>
            <router-link :to="{ name: 'main' }" class="link">
            MAIN
            </router-link>
            <span style="color: azure;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <router-link :to="{ name: 'board' }" class="m-2 link"> 
            BOARD
            </router-link>
            <span style="color: azure;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <router-link :to="{ name: 'qna' }" class="m-2 link"> 
            QnA
            </router-link>
            <span style="color: azure;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <router-link :to="{ name: 'house' }" class="m-2 link">
            APART LIST
            </router-link>
            <span style="color: azure;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </b-nav-item>
        </b-navbar-nav>

        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            <span style="color: azure;font-size:18px">|&nbsp;&nbsp;</span>
            <span class="m-2 link">{{ userInfo.userName }}({{ userInfo.userId }})님 환영합니다.</span>
          
          <span style="color: azure;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          
            <router-link :to="{ name: 'mypage' }" class="m-2 link">내정보보기</router-link>
            <span style="color: azure;">&nbsp;&nbsp;|</span>
          </b-nav-item>
          <b-nav-item class="m-2 link" style="color:azure;" @click.prevent="onClickLogout"><span style="color:azure;">로그아웃&nbsp;</span>
            <span style="color: azure;">&nbsp;&nbsp;|</span>
          </b-nav-item>
        </b-navbar-nav>
        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item right>
            <span style="color: azure;">|&nbsp;&nbsp;</span>
               <router-link :to="{ name: 'join' }" class="link">
                회원가입
              </router-link>
              <span style="color: azure;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <router-link :to="{ name: 'login' }" class="link"> 로그인 </router-link>
              <span style="color: azure;">&nbsp;&nbsp;|</span>
            </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo.userId);
      
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      this.userLogout();
      this.$router.push({ name: "main" });
    },
  },
};
</script>


<style scoped>
#logo {
  width: 120px;
}

.link {
  text-decoration: none;
  color: azure;
  font-size: 18px;
}
</style>
