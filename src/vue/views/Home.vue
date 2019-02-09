<template>
  <div class="home">
    <h1>Movies</h1>
    <div class="movies">
      <movie-item v-for="movie in movies" :key="movie.id" :movie="movie"></movie-item>
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

<style lang="scss" scoped>
.movies{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
