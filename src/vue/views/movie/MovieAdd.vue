<template>
  <div class="movie-add">
    <h1>Add a new movie</h1>
    <movie-form :movie="newMovie" :poster="newPoster" @submitted="addMovie()"></movie-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMovie: {
        title: "",
        year: null,
        language: "",
        director: {
          name: "",
          nationality: "",
          birthdate: ""
        },
        poster: null,
        genre: "",
        ratings: []
      },
      newPoster: {
        file: null
      }
    };
  },
  methods: {
    addMovie() {
      var params = { movie: this.newMovie, poster: this.newPoster.file };
      this.$store.dispatch("addMovieAPI", params).then(id => {
        this.$router.push({ name: "movie-details", params: { id: id } });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
