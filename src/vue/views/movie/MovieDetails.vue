<template>
  <div class="movie-details">
    <div v-if="!movie">
      <p>Movie not found</p>
    </div>

    <div v-else>
      <h1>{{ movie.title }} ({{ movie.year }})</h1>
      <img :src="movie.poster?movie.poster:'no-poster.png'" :alt="movie.title">
      <p>{{ movie.genre }}, directed by {{ movie.director.name }}, {{ movie.director.nationality }} and born the {{ movie.director.birthdate }}.</p>

      <span v-if="!rated">Rate this movie :
        <rate :length="5" v-model="rating" @after-rate="rateMovie()"/>
      </span>
      <p>Grade : {{ rate }}/5 (on {{ movie.ratings.length }} ratings)</p>

      <router-link :to="{name: 'movie-edit', params:{ id: movie.id }}">Edit</router-link>
      <button type="button" @click="deleteMovie()">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rated: false,
      rating: 3
    };
  },
  computed: {
    movie() {
      return this.$store.state.movie;
    },
    rate() {
      if (this.movie.ratings.length == 0) {
        return "N/A";
      }

      return (
        Math.round(
          (this.movie.ratings.reduce((a, b) => a + b, 0) /
            this.movie.ratings.length) *
            10
        ) / 10
      );
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
    },
    rateMovie() {
      this.$store
        .dispatch("rateMovieAPI", { id: this.movie.id, rating: this.rating })
        .then(() => {
          this.rated = true;
          this.$store.dispatch("getMovieAPI", this.$route.params.id);
        })
        .catch(() => {
          console.error("Cannot rate movie");
        });
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
