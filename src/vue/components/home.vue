<template>
  <div class="movies">
    <h2>Movies</h2>

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
    this.$http.get("https://www.omdbapi.com/?t=Interstellar").then(res => {
      let imdb = res.data;
      let movie = {
        id: imdb.imdbID,
        title: imdb.Title,
        release: imdb.Released,
        director: {
          firstname: imdb.Director,
          surname: "",
          country: "",
          brithdate: ""
        },
        genre: imdb.Genre
      };
      this.movies.push(movie);
    });
    // if (localStorage.movies) {
    //   this.movies = localStorage.movies;
    // }
  }
};
</script>
