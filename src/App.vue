<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span class="separator">|</span>
      <router-link to="/about">About</router-link>
    </div>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

</style>
