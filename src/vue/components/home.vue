<template>
  <div class="movies">
    <h1>Movies</h1>

    <p>
      <router-link to="/movie/add">Add new Movie</router-link>
    </p>

    <div class="search">
      <label for="searchbox">Search :</label>
      <input type="text" v-model="search">
    </div>

    <ul>
      <MovieItem v-for="m in movies_filtered" :key="m.id" :movie="m"/>
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
      movies: [],
      search: ""
    };
  },
  created() {
    this.movies = this.$store.state.movies;
  },
  computed: {
    movies_filtered() {
      const searchStr = this.search.toLowerCase();
      return this.movies.filter(m => {
        return (
          m.title.toLowerCase().includes(searchStr) ||
          m.release.toLowerCase().includes(searchStr) ||
          m.genre.toLowerCase().includes(searchStr) ||
          m.director.firstname.toLowerCase().includes(searchStr) ||
          m.director.lastname.toLowerCase().includes(searchStr) ||
          m.director.country.toLowerCase().includes(searchStr) ||
          m.director.birthdate.toLowerCase().includes(searchStr)
        );
      });
    }
  }
};
</script>
