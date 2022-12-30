<template>
  <b-card
          :header-html="`
          <div>
          <strong>아이디 : ${user_id}</strong>, 작성일 : ${register_date}</div>`"
          class="mb-2"
          border-variant="dark"
          no-body>
        <div v-if="userInfo && (user_id==userInfo.userId || userInfo.userId=='admin')" style="text-align: right;">
            <b-button variant="success" @click="updateC">수정</b-button>
            <b-button variant="danger" @click="deleteC">삭제</b-button>
        </div>
        <div v-if="!isUpdate">
           <b-card-body class="text-left" >
                  <div v-html="message"></div>
            </b-card-body>
        </div>
        <div v-else>
            <qnA-comment-update :boardNum="boardNum" :comment_id="comment_id" :content="content" @up="upchange"></qnA-comment-update>
        </div>
 </b-card>
</template>

<script>
import http from "@/api/http.js";
import { mapState, mapActions } from "vuex";
import QnACommentUpdate from "@/components/QnA/item/QnACommentUpdate.vue";

const memberStore = "memberStore";
const boardStore = "boardStore";

export default {
  components: { QnACommentUpdate },
    props: {
        user_id: String,
        register_date: String,
        content: String,
        boardNum:Number,
        comment_id:Number,
    },  
    data() {
        return {
            isUpdate: false,
        };
    },
    computed: {
        ...mapState(memberStore, ["userInfo"]),
        message() {
            if (this.content) return this.content.split("\n").join("<br>");
            return "";
        },
    },
    methods: {
        ...mapActions(memberStore,["userLogout"]),
        ...mapActions(boardStore,["changeTrue"]),
        updateC() {
            this.isUpdate = !this.isUpdate;
        },
        deleteC() {
            http.delete(`/boards/${this.boardNum}/comments/${this.comment_id}`, {
        headers: {
          "auth_token": sessionStorage.getItem("access-token"),
          }
      })
        .then(({ data }) => {
          console.log(data);
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
    })
        },
        upchange(up) {
            this.isUpdate = up;
        }
    }

}
</script>

<style>

</style>