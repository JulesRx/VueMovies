<template>
  <div class="movies">
    <h2>Movies</h2>

    <ul>
      <MovieItem v-for="m in movies" :key="m.imdbID" :movie="m"/>
    </ul>
  </div>
</template>

<script>
import MovieItem from "./movie/movie-item";

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
    this.$http.get("https://www.omdbapi.com/?t=Interstellar").then(res => {
      this.movies.push(res.data);
    });
  }
};
</script>
