<template>
  <b-form @submit="onSubmit" @reset="onReset">
        <div style="text-align: left;">내용 : </div>
        <b-form-group id="userid-group" label-for="content">
          <b-form-input
            id="content"
            v-model="comment.content"
            type="text"
            value="article.userId"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="m-1" >댓글 수정</b-button>
      </b-form>
</template>

<script>
import http from "@/api/http.js";
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const boardStore = "boardStore";

export default {
    props: {
    boardNum: Number,  
    comment_id:Number,
      content: String,
    },
    data() {
        return {
            comment: {
                user_id: "",
                content: "",
            }
        };
    },
    computed: {
      ...mapState(memberStore, ["userInfo"]),
      message() {
            if (this.content) return this.content.split("\n").join("<br>");
            return "";
        },  
    },
    created() {
      this.comment.user_id = this.userInfo.userId;
      this.comment.content = this.content;
    },
    methods: {
        ...mapActions(memberStore, ["userLogout"]),
        ...mapActions(boardStore,["changeTrue"]),
    onSubmit(event) {
      
      event.preventDefault();
      console.log("token : " + sessionStorage.getItem("access-token"));
      let err = true;
      let msg = "";
      err && !this.comment.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.registComment();
      this.comment.content = "";
    },
    onReset(event) {
      event.preventDefault();
      this.comment.user_id = "";
      this.comment.content = "";
      this.moveList();
    },
    registComment() {
      http.put(`/boards/${this.boardNum}/comments/${this.comment_id}`, {
          board_no: this.boardNum,
          user_id: this.comment.user_id,
        content: this.comment.content,
        comment_id: this.comment_id,
      }, {
        headers: {
          "auth_token": sessionStorage.getItem("access-token"),
          }
      })
        .then(({ data }) => {
          // let msg = "등록 처리시 문제가 발생했습니다.";
          console.log(data);
          // if (data.msg === "success") {
            // msg = "등록이 완료되었습니다.";
          // }
            // alert(msg);
          this.changeTrue();
      })
    .catch( (error) => {
          console.log(error);
          if (error.response.status == 401) {
            console.log("error arrive");
            alert("세션이 만료되었습니다.");
            this.userLogout();
            this.$router.push({ name: "login" });
          }
    });

      this.$emit(`up`, false);
        },
    }
}
</script>

<style>

</style>