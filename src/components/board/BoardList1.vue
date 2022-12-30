<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button v-if="userInfo && userInfo.userId == 'admin'" variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 BoardListItem에 데이터 전달(props) -->
            <board-list-item v-for="article in articles" :key="article.articleno" v-bind="article" />
          </tbody>
        </b-table-simple>
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
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http";
import BoardListItem from "@/components/board/item/BoardListItem";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  data() {
    return {
      articles: [],
      htmlData: null,
      maxPage: 1,
      pgno: 1,
      startPage: 2,
      endPage: 1,
      tempPage:[],
    };
  },
  created() {

    this.move_pg(1);
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    move_pg(paraPgno) {

      console.log(paraPgno);
      
      // paraPgno = paraPgno - 1;
      
      console.log(paraPgno);
      let type = 1;
      http.get(`/boards/`+type+`/`+paraPgno).then(({ data }) => {
      console.log(data);
      this.articles = data;
    });

      console.log(paraPgno);
      http.get(`/boards/nav/`+type+`/` + paraPgno).then(({ data }) => {
      console.log(data);
        this.pgno = data.nav.currentPage;
        console.log(this.pgno);
      this.maxPage = data.nav.totalPageCount;

      // this.startPage = (data.nav.currentPage - 1) / data.nav.naviSize * data.nav.naviSize + 1;//6 11
        console.log(Math.floor(data.nav.currentPage / data.nav.naviSize));
        this.startPage = Math.floor((data.nav.currentPage-1) / (data.nav.naviSize)) * data.nav.naviSize + 1;//6 11
        this.endPage = this.startPage + data.nav.naviSize - 1;//10 15

        console.log("startPage = " + this.startPage + ", endPage : " + this.endPage)
      if (data.nav.totalPageCount < this.endPage) {
        this.endPage = data.nav.totalPageCount;//11\
        }
        this.tempPage = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        this.tempPage.push({ i: i });
      }
      });


      
    }
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
.pg{
  width: 100%;
  display: flex;
	justify-content : center;
}
</style>
