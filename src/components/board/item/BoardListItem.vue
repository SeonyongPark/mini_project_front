<template>
  <b-tr @click="move">
    <b-td>{{ boardNo }}</b-td>
    <!-- <b-th class="text-left"> -->
      <!-- <router-link :to="{ name: 'boardview', params: { boardNo: boardNo } }">
      </router-link> -->
    <!-- </b-th> -->
      <b-td>{{ subject }}</b-td>
    <b-td>{{ userId }}</b-td>
    <b-td>{{ registerTime }}</b-td>
  </b-tr>
</template>

<script>

export default {
  name: "BoardListItem",
  props: {
    boardNo: Number,
    userId: String,
    subject: String,
    registerTime: String,
  },
  methods: {
    move() {
      console.log(this.boardNo);
      this.$router.push({ name: 'boardview' ,  params: { boardNo: this.boardNo } });
    }
  }
};
</script>

<style></style>
