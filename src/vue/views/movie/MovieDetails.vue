<template>
  <div class="movie-details">
    <div v-if="!movie">
      <p>Movie not found</p>
    </div>

    <div v-else>
      <h1>{{ movie.title }} ({{ movie.year }})</h1>
      <img :src="movie.poster?movie.poster:'no-poster.png'" :alt="movie.title">
      <p>{{ movie.genre }}, directed by {{ movie.director.name }}, {{ movie.director.nationality }} and born the {{ movie.director.birthdate }}.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    movie() {
      return this.$store.state.movie;
    }
  },
  created() {
    this.fetchMovie();
  },
  watch: {
    $route: "fetchMovie"
  },
  methods: {
    fetchMovie() {
      this.$store.dispatch("getMovieAPI", this.$route.params.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.movie-details {
  img {
    width: 300px;
  }
}
</style>
