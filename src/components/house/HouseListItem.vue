<template> 
  <b-row
    class="m-2"
    @click="selectHouse"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="2" class="text-center align-self-center">
      <b-icon icon="camera" font-scale="2"></b-icon>
    </b-col>
    <b-col cols="10" class="align-self-center" > {{ house.apartmentName }} </b-col>
    <b-col cols="10" class="align-self-center"> 
      <b-iconstack font-scale="1">
        <b-icon stacked icon="square"></b-icon>
        <b-icon stacked icon="check"></b-icon>
      </b-iconstack>
       {{ house.date }} </b-col>
      <b-col cols="10" class="align-self-center">
      <b-iconstack font-scale="1">
        <b-icon stacked icon="square"></b-icon>
        <b-icon stacked icon="check"></b-icon>
      </b-iconstack>
        {{ house.dealAmount }}만원 </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    house: Object,
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),
    ...mapMutations(houseStore, ["CLEAR_HOUSE_LIST"]), 
    selectHouse() {
      console.log("listRow : ", this.house);
      // this.$store.dispatch("getHouse", this.house);
      this.CLEAR_HOUSE_LIST();
      this.detailHouse(this.house);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>
