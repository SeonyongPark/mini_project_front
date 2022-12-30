<template>
  <div>
    <b-row>
      <b-col>
        <div id="map" style="width:100%;height:350px;" ></div>
      </b-col>
    </b-row>
      <b-container vclass="bv-example-row">
        <b-container v-if="house.apartmentName != ''">
        <b-row class="mb-2 mt-1">
          <b-col><h3>{{ house.apartmentName }}</h3><br/></b-col>
          <b-col v-if="userInfo">
            <!-- 여기 수정해야함 진짜로 -->
            <div >
            <b-button v-if="!isBookMark" variant="outline-info" class="mb-2" @click="bookmarkRegiste" >
              <b-icon icon="heart" variant="danger" aria-hidden="true"></b-icon> 관심지역 추가 
            </b-button>
            <b-button v-else variant="outline-info" class="mb-2" @click="bookmarkDelete" >
              <b-icon icon="heart-fill" variant="danger" aria-hidden="true"></b-icon> 관심지역 삭제 
            </b-button>

          </div>
            <!-- <div><b-icon class="bookmark" v-if="!isBookMark" icon="heart"  variant="danger" @click="bookmarkRegiste"> 관심지역 추가 </b-icon>
            <b-icon class="bookmark" v-else icon="heart-fill"  variant="danger" @click="bookmarkDelete" > 관심지역 제거 </b-icon> </div> -->
          </b-col>
        </b-row>
        <b-row>
          <b-col> <BarChart /> </b-col>
        </b-row>
      </b-container>
    <b-row>
      <!-- {{house.aptCode}} -->
      <b-col v-if="house.apartmentName != ''">
        <b-alert show variant="primary">{{ house.apartmentName }} </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="house.area != ''">
        <b-alert show variant="info">{{ house.area }} m<sup>2</sup> ( {{house.area | currency}} 평 )</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="house.floor != ''">
        <b-alert show variant="warning">층수 : {{ house.floor }}층</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="house.dealAmount != ''">
        <b-alert show variant="danger"
          >거래금액 : {{ (parseInt(house.dealAmount.replace(",", "")) * 10000) | price }}원</b-alert
        >
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import http from "@/api/http.js";
import { mapState, mapMutations } from "vuex";
import BarChart from "@/components/house/BarChart.vue";

const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  name: "HouseDetail",
  components:{BarChart},
  data() {
    return {
      map: null,
      markerPosition: null,
      isBookMark:false,
    };
  },
  computed: {
    ...mapState(houseStore, ["house"]),
    ...mapState(memberStore,["userInfo"]),
  },
  watch: {
    house() {
      // this.deleteMap();
      this.initMap();
      this.createMarker();
      this.bookmarkInit();
    },

  },
  methods: {
    ...mapMutations(houseStore, ["CLEAR_HOUSE_LIST"]),
    initMap() {
      if (this.map != null) {
        
        console.log("in"+this.map);
        this.map=null;
      }
      console.log("out" + this.map);
      var container = document.getElementById("map");
      console.log("first" + container);
      
      console.log("second" + container);
      const options = {
        center: new kakao.maps.LatLng(this.house.lat, this.house.lng),
        level: 4,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    createMarker() {
      this.markerPosition = new kakao.maps.LatLng(this.house.lat, this.house.lng); 
      var marker = new kakao.maps.Marker({
        position: this.markerPosition
      });
        marker.setMap(this.map);
    },
    bookmarkRegiste() {
      http
        .post(
          `/bookmark`,
          {
            user_id: this.userInfo.userId,
            aptCode: this.house.aptCode,
          },
          {
            headers: {
              auth_token: sessionStorage.getItem("access-token"),
            },
          }
        )
        .then(({ data }) => {
          if (data.msg == "success") {
            this.isBookMark = true;
            console.log("is Bookmark = " + this.isBookMark);
          }
        });
    },
    bookmarkDelete() {
      http.delete(`/bookmark/${this.house.aptCode}`,
          {
            headers: {
              auth_token: sessionStorage.getItem("access-token"),
            },
        })
        .then(({ data }) => {
          if (data.msg == "success") {
            this.isBookMark = false;
            console.log("is Bookmark = " + this.isBookMark);
            }
          })
    },
    bookmarkInit() {
      http.get(`/bookmark/${this.userInfo.userId}/${this.house.aptCode}`,
          {
            headers: {
              auth_token: sessionStorage.getItem("access-token"),
            },
          }
    ).then(({ data }) => {
      console.log("컨펌컨펌");
      console.log(data.check);
      this.isBookMark = data.check;
    })
    console.log("컨펌컨펌");
    }
  },
  mounted() {


    this.CLEAR_HOUSE_LIST();
    console.log(this.house);
    console.log("sdadsad");

    // if (!window.kakao || !window.kakao.maps) {
      console.log("ajshdjkasdbfjhasbdhjgbasdjgb");
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=56322d56f7d0fc99d79ce08eb45ee91c`;
      /* global kakao */
      script.addEventListener("load", () => {
        console.log(this.house.lat + " " + this.house.lng);
        kakao.maps.load(this.initMap);
        kakao.maps.load(this.createMarker);
      });
      document.head.appendChild(script);

      console.log("컨펌컨펌");
      // 북마크 여부 확인
    
    this.bookmarkInit();
      
    // }
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    currency: function (value) {
      var num = new Number(value);
      return (num / 3.305785).toFixed(2);
                }
  },
};
</script>

<style>
.bookmark:hover{
  color:crimson;
}
</style>
