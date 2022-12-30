<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-form-group label="아이디" label-for="userId">
              <b-form-input
                id="userId"
                v-model="user.userId"
                required
                placeholder="아이디 입력...."
                @keyup="idcheck"
              ></b-form-input>
              <p v-show="valid.id" class="input-error">
                {{idmsg}}
              </p>
              <p v-show="!valid.id" class="input-correct">
                {{idmsg}}
              </p>
            </b-form-group>
            <b-form-group label="비밀번호" label-for="userpwd">
              <b-form-input
                type="password"
                id="userPassword"
                v-model="user.userPassword"
                required
                placeholder="비밀번호 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호 확인" label-for="userpwdconfirm">
              <b-form-input
                type="password"
                id="userpwdconfirm"
                v-model="user.userpwdconfirm"
                required
                placeholder="비밀번호 확인...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="userName">
              <b-form-input
                id="userName"
                v-model="user.userName"
                required
                placeholder="아름 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이메일 :" label-for="userAddress">
              <b-form-input
                id="userAddress"
                v-model="user.userAddress"
                required
                placeholder="이메일 입력.... ex) example@example.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="전화번호:" label-for="userPhone">
              <b-form-input
                id="userPhone"
                v-model="user.userPhone"
                required
                placeholder="전화번호 입력.... ex) 000 - 0000(or 000) - 0000"
              ></b-form-input>
            </b-form-group>
            <b-button type="button" variant="primary" class="m-1" @click="confirm">회원가입</b-button>
            <b-button type="button" variant="success" class="m-1" @click="movePage">취소</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http.js"
  
export default {
  name: "UserRegister",
  data() {
    return {
      isLoginError: false,
      idmsg:"",
      user: {
        userId: null,
        userPassword: null,
        userpwdconfirm: null,
        userName: null,
        userAddress: null,
        userPhone: null
      },
      valid: {
        id: false,
        password: false,
        email: false,
        phone: false,
      },
    };
    },
    methods: {
      confirm() {
const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const checkReg = /^\d{3}-\d{3,4}-\d{4}$/;  // test로 쓰면 됨..  regExp.test(str);
          console.log(this.user.userId);
        if (!this.user.userId) {
          alert("아이디 입력!!");
        } else if (this.valid.id) {
          alert("아이디 중복확인!!!");
        } else if (!this.user.userPassword) {
          alert("비밀번호 입력!!");
        } else if (!this.user.userpwdconfirm) {
          alert("비밀번호 확인 입력!!");
        } else if (this.user.userPassword != this.user.userpwdconfirm) {
          alert("입력하신 두 비밀번호가 다릅니다!!");
        } else if (!this.user.userName) {
          alert("이름 입력!!");
        } else if (!this.user.userAddress) {
          alert("이메일 입력!!");
        } else if (!regExp.test(this.user.userAddress)) {
          alert("이메일 양식을 지켜주세요!");
        }else if (!this.user.userPhone) {
          alert("핸드폰 번호 입력!!");
        }else if (!checkReg.test(this.user.userPhone)) {
          alert("핸드폰 양식을 지켜주세요!");
        } else {
          console.log(this.user.userId);
          http.post(`/members`, {
              userId: this.user.userId,
              userPassword: this.user.userPassword,
              userpwdconfirm: this.user.userpwdconfirm,
              userName: this.user.userName,
              userAddress: this.user.userAddress,
              userPhone: this.user.userPhone,
            })
            .then(({ data }) => {
              let msg = "회원가입이 실패했습니다.";
              console.log(data.msg);
              if (data.msg === "success") {
                msg = "회원가입이 성공했습니다.";
                alert(msg);
                this.$router.push({ name: "login" });
              } else {
                alert(msg);
              }
              // console.log(data.headers["set-cookie"]);
            });
        }
        
      },
      movePage() {
        this.$router.push("/");
      },
      idcheck() {
       http.get("/members/check/" + this.user.userId)
          .then(({ data }) => {
            let msg = "아이디 '" + this.user.userId + "' 는 사용할 수 없습니다.";
            if (data.msg === "success") {
              msg = "아이디 '" + this.user.userId + "' 는 사용할 수 있습니다.";
              this.idmsg = msg;
              this.valid.id = false;
            } else {
              this.idmsg = msg;
              this.valid.id = true;
            }
            console.log(this.valid.id);
          });
      }
      }
};
</script>

<style>
.input-error{
  color : red;
}
.input-correct{
  color : blue;
}
</style>
