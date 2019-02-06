<template>
  <div class="movies">
    <h1>Movies</h1>

    <p>
      <router-link to="/movie/add">Add new Movie</router-link>
    </p>
    <ul>
      <MovieItem v-for="m in movies" :key="m.id" :movie="m"/>
    </ul>
  </div>
</template>

<script>
// import Movie from '@/models/movie.ts';
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
    this.movies = this.$store.state.movies;
  }
};
</script>
