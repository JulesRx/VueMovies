<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <router-link :to="{ name: 'home' }">
          <img src="vue.png" alt="Logo Vue" />
        </router-link>
      </div>

      <router-link :to="{ name: 'home' }">Home</router-link>
      <span class="separator">|</span>
      <router-link :to="{ name: 'about' }">About</router-link>
      <span class="separator">|</span>
      <a href="https://github.com/JulesRx/VueMovies">GitHub</a>
    </div>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'VueMovies'
    };
  }
};
</script>
