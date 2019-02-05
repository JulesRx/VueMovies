<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <router-link to="/">
          <img src="@/static/logo.png" alt="Logo Vue" height="50">
        </router-link>
      </div>

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
#nav {
  .logo {
    img {
      margin-bottom: 8px;
    }
  }
}
</style>
