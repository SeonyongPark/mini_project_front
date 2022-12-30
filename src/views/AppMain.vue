<template>
  <div>
    <div class="background">
  <b-container class="bv-example-row mt-3 text-center" style="position: relative;">
    <h3 class="underline-steelblue"><b-icon icon="house"></b-icon> Project. My HOME</h3>
    <br/>
    <br/>
    <br/>
    <b-row>
      <b-col></b-col>
      <b-col cols="100">
        <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark" >
          <template #header><div style="font-family: 'Noto Sans KR', sans-serif;">Where Is My Home ?</div></template>
         
          <template #lead >
            <hr class="my-4" />
            <div style="font-size:20px; font-weight:bold; font-family: 'Noto Sans KR', sans-serif;">
            많고 많은 집 중 <strong style="font-size: 30px; color: deeppink;"> 내 집은 </strong> 어디 있는가?<br />
            <span style="color: darkgreen; "> "Team, Double P;" </span>와 함께<br />
            <br/>
            <router-link :to="{ name: 'house' }" class="button">&nbsp;  <b-iconstack font-scale="1">    
              
              <b-icon stacked icon="square"></b-icon>
              <b-icon stacked icon="check"></b-icon></b-iconstack> My HOME &nbsp;</router-link> <span style="font-size:50px">을 찾아보세요.</span><br />
          </div>
          </template>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
    <div class="flex-container">
      <div class="flex-item"><router-link :to="{ name: 'board' }" > <b-img :src="require('@/assets/Board3.png')" class="btnImg"></b-img> </router-link></div>
      <div v-if="!userInfo" class="flex-item"><router-link :to="{ name: 'login' }" > <b-img :src="require('@/assets/login3.png')" class="btnImg"></b-img> </router-link></div>
      <div class="flex-item"><router-link :to="{ name: 'qna' }" > <b-img :src="require('@/assets/Qna.png')" class="btnImg"></b-img> </router-link></div>
      
    </div>
  </b-container>
</div>
</div>
</template>

<script>
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "AppMain",
  props: {
    msg: String,
  },
  computed: {
    ...mapState(memberStore,["userInfo"])
  }
};
</script>

<style scoped>
.flex-container{
  width :100%;
  display: flex;
  justify-content: space-evenly;
  
}
.flex-item{
  width: 70%;
  height: 300px;
  margin: 10px;
}
.btnImg{
  width: 230px;
  height: 230px;
}
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 90%, rgb(208, 255, 0) 10%);
  color: aliceblue;
  font-size: 30px;
}
.background{
  width:100%;
  height: 300%;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
        position: relative;
}
.background::before{
  content:"";

  background-image: url("@/assets/backgroundApt3.jpg");
  background-size: cover;
  filter: brightness(35%);
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
}
.button{
  font-size:50px;
  background-color:#000000;
  color:aliceblue;
  text-decoration-line : none;
}
.button:hover{
  background-color:#000000;
  color: rgb(255, 234, 0);
}

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');

</style>
