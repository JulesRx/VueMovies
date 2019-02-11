<template>
  <div class="home">
    <h1>Movies</h1>
    <div class="movies row">
      <movie-item v-for="movie in movies" :key="movie.id" :movie="movie" class="col-md-4"></movie-item>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    }
  }
};
</script>
