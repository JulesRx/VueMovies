<template>
  <div class="movie-add">
    <h1>Add a new movie</h1>
    <movie-form
      :movie="newMovie"
      :poster="newPoster"
      @submitted="addMovie()"
    ></movie-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMovie: {
        title: '',
        year: null,
        language: '',
        director: {
          name: '',
          nationality: '',
          birthdate: ''
        },
        poster: null,
        genre: '',
        ratings: []
      },
      newPoster: {
        file: null
      }
    };
  },
  methods: {
    addMovie() {
      this.$store
        .dispatch('addMovieAPI', {
          movie: this.newMovie,
          poster: this.newPoster.file
        })
        .then(id => {
          this.$router.push({ name: 'movie-details', params: { id: id } });
        });
    }
  }
};
</script>
