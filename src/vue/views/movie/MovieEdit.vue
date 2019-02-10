<template>
  <div class="movie-edit">
    <h1>Edit movie</h1>

    <p v-if="!movie">Movie not found</p>

    <div v-else>
      <movie-form :movie="movie" :poster="poster"></movie-form>
      <router-link :to="{ name: 'movie-details', params: { id: movie.id } }">Cancel</router-link>
      <button type="button" @click="updateMovie()">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      poster: {
        file: null
      }
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    movie() {
      return this.$store.state.movie;
    }
  },
  methods: {
    updateMovie() {
      this.$store
        .dispatch("updateMovieAPI", {
          movie: this.movie,
          poster: this.poster.file
        })
        .then(() => {
          this.$router.push({
            name: "movie-details",
            params: { id: this.movie.id }
          });
        })
        .catch(() => {
          console.error("Cannot edit movie");
        });
    }
  }
};
</script>
