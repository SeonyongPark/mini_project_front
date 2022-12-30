<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo && (article.userId==userInfo.userId || userInfo.userId=='admin')">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>게시글 번호: ${article.boardNo}</br>
          제목 : ${article.subject}</h3><div><h6>아이디 : ${article.userId}</div><div>작성일 : ${article.registerTime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <div style="center"> <h2>Comments</h2></div>
    <b-row>
      <b-col v-if="userInfo">
        <qnA-comment-input :boardNum="article.boardNo" :comment_id="comments.comment_id"></qnA-comment-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <qnA-comment-item v-for="comment in comments" :key="comment.comment_id" :boardNum="article.boardNo" v-bind="comment" />
      </b-col>
    </b-row>

    <div class="pg">
          <ul class="pagination"> 
			<li class="page-item"> 
				<a href='javascript:void(0);' id="first-page" class="page-link" @click="move_pg( (pgno-1) - (pgno-1)%10 <1 ? 1:(pgno-1) - (pgno-1)%10 )">◀</a> 
			</li> 
			<li class="page-item"> 
				<a href='javascript:void(0);' class="page-link" @click="move_pg(pgno == 1 ? 1 : pgno-1)">이전</a> 
			</li>
      <div v-for="num in tempPage" :key="num" >
        <li :class="num.i==pgno ? 'page-item active' : 'page-item'"><a href='javascript:void(0);' class="page-link" @click="move_pg(num.i)" >{{num.i}}</a></li> 
      </div>
			<li class="page-item"> 
				<a href='javascript:void(0);' class="page-link" @click="move_pg(pgno+1 > maxPage ? maxPage : pgno+1)">다음</a> 
			</li> 
			<li class="page-item"> 
				<a href='javascript:void(0);' class="page-link" @click="move_pg(pgno + (10-pgno%10) + 1 > maxPage ? maxPage : pgno + (10-pgno%10) + 1)">▶</a> 
			</li> 
		</ul> 
  </div>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/api/http";
import { mapState, mapActions } from "vuex";
import QnACommentItem from "@/components/QnA/item/QnACommentItem.vue";
import QnACommentInput from "@/components/QnA/item/QnACommentInput.vue";

const memberStore = "memberStore";
const boardStore = "boardStore";

export default {
  name: "QnADetail",
  data() {
    return {
      article: [],
      comments: [],
      maxPage: 1,
      pgno: 1,
      startPage: 2,
      endPage: 1,
      tempPage:[],
    };
  },
  components: {
    QnACommentItem,
    QnACommentInput,
  },
  computed: {
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(boardStore, ["isChange"]),
  },
  created() {
    this.init();    
    this.move_pg(1);
  },
  watch: {
    isChange() {
      console.log("isChange 변화!!");
      if (this.isChange) {
        console.log("isChange true임");
        this.move_pg(1);
        this.change();
      } else {
        console.log("isChange false임");
      }
    }
  },
  methods: {
    ...mapActions(boardStore,["changeTrue"]),
    init() {
      console.log("comment init 호출");
      http.get(`/boards/${this.$route.params.boardNo}`).then(({ data }) => {
        this.article = data;
    });
    },
    init_comments(paraPgno) {
      http.get(`/boards/${this.$route.params.boardNo}/comments/` + paraPgno).then(({ data }) => {
        console.log(data);
        this.comments = [];
        this.comments = data.list;
      });
    },
    change() {
      this.changeTrue();
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "qnamodify",
        params: { boardNo: this.article.boardNo },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "qnadelete",
          params: { boardNo: this.article.boardNo },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "qnalist" });
    },
    move_pg(paraPgno) {
      console.log(paraPgno);
      this.init_comments(paraPgno);

      console.log(paraPgno);
      http.get(`/boards/${this.$route.params.boardNo}/comments/nav/` + paraPgno).then(({ data }) => {
        console.log(data);
        this.pgno = data.tag.currentPage;
        console.log(this.pgno);
        this.maxPage = data.tag.totalPageCount;

        // this.startPage = (data.nav.currentPage - 1) / data.nav.naviSize * data.nav.naviSize + 1;//6 11
        console.log(Math.floor(data.tag.currentPage / data.tag.naviSize));
        this.startPage = Math.floor((data.tag.currentPage - 1) / (data.tag.naviSize)) * data.tag.naviSize + 1;//6 11
        this.endPage = this.startPage + data.tag.naviSize - 1;//10 15

        console.log("startPage = " + this.startPage + ", endPage : " + this.endPage)
        if (data.tag.totalPageCount < this.endPage) {
          this.endPage = data.tag.totalPageCount;//11\
        }
        this.tempPage = [];
        for (let i = this.startPage; i <= this.endPage; i++) {
          this.tempPage.push({ i: i });
        }
      });



}
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
