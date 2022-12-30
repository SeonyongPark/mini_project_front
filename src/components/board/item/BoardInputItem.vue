<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="userid-group" label="작성자:" label-for="userid">
          <b-form-input
            id="userId"
            :disabled="isUserid"
            v-model="article.userId"
            type="text"
            readonly
            value="article.userId"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="subject-group" label="제목:" label-for="subject" description="제목을 입력하세요.">
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'">글작성</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/api/http";
import { mapState, mapActions  } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        boardNo: 0,
        userId: "",
        subject: "",
        content: "",
        type:1,
      },
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    
    if (this.type === "modify") {
      http.get(`/boards/${this.$route.params.boardNo}`).then(({ data }) => {
        console.log(data);
        this.article.boardNo = data.boardNo;
        this.article.userId = data.userId;
        this.article.subject = data.subject;
        this.article.content = data.content;
      });
      this.isUserid = true;
    } else if (this.type === "register") {
      this.article.userId = this.userInfo.userId;
    }
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    onSubmit(event) {
      
      event.preventDefault();
      console.log("token : " + sessionStorage.getItem("access-token"));
      let err = true;
      let msg = "";
      !this.article.userId && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userId.focus());
      err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.boardNo = 0;
      this.article.subject = "";
      this.article.content = "";
      this.moveList();
    },
    tess() {
      console.log("메서도 호출 테스토");
    },
    registArticle() {
      console.log(this.article.boardNo+ " " +this.article.userId+" "+ this.article.subject + " "+ this.article.content)
      // http.defaults.headers["auth_token"] = sessionStorage.getItem("access-token"); //axios header에 refresh-token 셋팅
      http.post(`/boards`, {
          boardNo: this.article.boardNo,
          userId: this.article.userId,
          subject: this.article.subject,
          content: this.article.content,
          type: "1",
      }, {
        headers: {
          "auth_token": sessionStorage.getItem("access-token"),
          }
      }).then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          console.log(data.data);
          if (data.data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
      })
        .catch( (error) => {
          console.log(error.response);
          this.tess();
          if (error.response.status == 401) {
            console.log("error arrive");
            alert("세션이 만료되었습니다.");
            this.userLogout();
          }
          this.$router.push({ name: "login" });
        });


      // http
      //   .post(`/boards`,
      //   {
      //     boardNo: this.article.boardNo,
      //     userId: this.article.userId,
      //     subject: this.article.subject,
      //     content: this.article.content,
      //     type: 1,
      //     withCredentials: true,
      //     crossDomain: true, 
      //     credentials: "include",
      //   },
      //     {
      //       headers: {
      //         "auth_token": sessionStorage.getItem("access-token"),
      //       },
      //   })
      //   .then(({ data }) => {
      //     let msg = "등록 처리시 문제가 발생했습니다.";
      //     console.log(data.data);
      //     if (data.data === "success") {
      //       msg = "등록이 완료되었습니다.";
      //     }
      //     alert(msg);
      //     this.moveList();
      //   });
    },
    modifyArticle() {
      http
        .put(`/boards/${this.$route.params.boardNo}`, {
          boardNo: this.article.boardNo,
          userId: this.article.userId,
          subject: this.article.subject,
          content: this.article.content,
          type:1,
        },{
            headers: {
            "auth_token": sessionStorage.getItem("access-token"),
            },
        })
        .then(({ data }) => {
          console.log(data.msg);
            let msg = "수정 처리시 문제가 발생했습니다.";
            if (data.msg == "success") {
              msg = "수정이 완료되었습니다.";
            }
            alert(msg);
            // 현재 route를 /list로 변경.
            this.moveList();
          
        })
        .catch((error) => {
          console.log(error.response);
          this.tess();
          if (error.response.status == 401) {
            console.log("error arrive");
            alert("세션이 만료되었습니다.");
            this.userLogout();
          }
          this.$router.push({ name: "login" });
        });
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
