<template>
  <div class="movie-add">
    <movie-form :movie="newMovie" :poster="newPoster"></movie-form>
    <br>
    <button type="button" @click="addMovie()">Add movie</button>
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
