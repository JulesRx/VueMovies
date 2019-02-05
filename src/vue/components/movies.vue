<template>
  <div class="movies">
    <div class="logo">
      <img src="@/static/logo.png" alt="Logo Vue">
    </div>

    <h3>Movies</h3>
    <ul>
      <MovieItem v-for="m in movies" :key="m.imdbID" :movie="m"/>
    </ul>
  </div>
</template>

<script>
import MovieItem from "./movie-item";

export default {
  name: "Movies",
  components: {
    MovieItem
  },
  data: () => {
    return {
      movies: []
    };
  },
  mounted() {
    this.$http.get("http://www.omdbapi.com/?t=Interstellar").then(res => {
      this.movies.push(res.data);
    });
  }
};
</script>

<style scoped lang="scss">
.movies {
  .logo {
    text-align: center;
  }
}
</style>
