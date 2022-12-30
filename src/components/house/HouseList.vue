<template>
  <div>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <b-row>
      <b-col style="font-size:28px"> 해당 동네의 평균 거래 가격은 :<br/><strong style="color: crimson"> {{ average.list.dealAmount | currency }}만원 </strong> 입니다.</b-col>
    </b-row>
    <div style="max-height:600px; overflow-y:auto;">
    <house-list-item v-for="(house, index) in houses" :key="index" :house="house" />
  </div>
  </b-container>
  <b-container v-else>
    <div style="font-size:28px">
    시/도, 군/구, 동과 거래 연/월을 선택하여<br/> 아파트 정보를 확인하세요!
  </div>
  </b-container>
</div>
</template>

<script>
import HouseListItem from "@/components/house/HouseListItem";
import { mapState } from "vuex";
import http from "@/api/http.js"

const houseStore = "houseStore";

export default {
  name: "HouseList",
  data() {
    return {
      average: null,
    };
  },
  filters: {
    currency: function (value) {
      var num = new Number(value);
                    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                }
            },
  components: {
    HouseListItem,
  },
  computed: {
    ...mapState(houseStore, ["houses", "dongCodeSave"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  watch: {
    dongCodeSave() {
      console.log("donCodeSave 변화 감지!!!!!!!!!!");
      console.log(this.dongCodeSave);
      console.log(this.dongCodeSave.dongCode);
      
      http.get(`/aparts/average/` + this.dongCodeSave.dongCode)
        .then(({ data }) => {
          if (data.msg == "success") {
            console.log(data);
            this.average = data
          } else {
            console.log("평균값 불러오기 fail");
          } 
        });
      console.log(this.average);
    }
  }
 
};


</script>

<style></style>
