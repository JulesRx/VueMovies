<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <router-link to="/">
          <img src="vue.png" alt="Logo Vue">
        </router-link>
      </div>

      <router-link to="/">Home</router-link>
      <span class="separator">|</span>
      <router-link to="/about">About</router-link>
      <span class="separator">|</span>
      <a href="https://github.com/JulesRx/VueMovies">GitHub</a>
    </div>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      title: "VueMovies"
    };
  }
};
</script>
