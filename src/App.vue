<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/scss/base.scss";
</style>

<script>
export default {
  mounted() {
    this.$http
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(function(data) {
        let help = data.data;
        console.log(help);
      });
  }
};
</script>
