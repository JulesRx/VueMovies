<template>
  <div class="movie-details">
    <div v-if="!movie">
      <p>Movie not found</p>
    </div>

    <div v-else>
      <h1>{{ movie.title }} ({{ movie.year }})</h1>
      <img :src="movie.poster?movie.poster:'no-poster.png'" :alt="movie.title">
      <p>{{ movie.genre }}, directed by {{ movie.director.name }}, {{ movie.director.nationality }} and born the {{ movie.director.birthdate }}.</p>
      <button type="button" @click="deleteMovie()">Delete</button>
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
    this.getMovie();
  },
  watch: {
    $route: "getMovie"
  },
  methods: {
    getMovie() {
      this.$store.dispatch("getMovieAPI", this.$route.params.id);
    },
    deleteMovie() {
      if (confirm("Are you sure you want to delete this movie ?")) {
        this.$store
          .dispatch("deleteMovieAPI", this.movie.id)
          .then(() => {
            this.$router.push({ name: "home" });
          })
          .catch(() => {
            console.error("Cannot delete movie");
          });
      }
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
