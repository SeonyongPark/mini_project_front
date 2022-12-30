<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http";
import { mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardDelete",
  computed: {
    ...mapActions(memberStore,["userLogout"]),
  },
  created() {
    http.delete(`/boards/${this.$route.params.boardNo}`, {
        headers: {
          "auth_token": sessionStorage.getItem("access-token"),
          }
      }).then(({ data }) => {
      let msg = "삭제 처리시 문제가 발생했습니다.";
      if (data.msg === "success") {
        msg = "삭제가 완료되었습니다.";
      }
      alert(msg);
      // 현재 route를 /list로 변경.
      this.$router.push({ name: "boardlist" });
    })
      .catch((error) => {
          console.log(error.response);
          if (error.response.status == 401) {
            console.log("error arrive");
            alert("세션이 만료되었습니다.");
            this.userLogout();
          }
          this.$router.push({ name: "login" });
        });
  },
};
</script>

<style></style>
