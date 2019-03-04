<template>
  <div class="home">
    <h1>Movies</h1>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Search for a movie :</label>
          <input
            type="text"
            class="form-control"
            placeholder="Title, Year, Genre, Director..."
            v-model="search"
          >
        </div>
      </div>
      <div class="col-md-6 text-right mb-3">
        <router-link :to="{name: 'movie-add'}" class="btn btn-primary">New movie</router-link>
      </div>
    </div>

    <div class="movies row" v-if="movies.length">
      <movie-item v-for="movie in movies" :key="movie.id" :movie="movie" class="col-md-4"></movie-item>
    </div>

    <p v-else>There isn't any registered movie at the moment...
      <router-link :to="{name: 'movie-add'}">Add a movie now !</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    movies() {
      let searchStr = this.search.toLowerCase();
      return this.$store.state.movies.filter(m => {
        return (
          m.title.toLowerCase().includes(searchStr) ||
          m.year
            .toString()
            .toLowerCase()
            .includes(searchStr) ||
          m.genre.toLowerCase().includes(searchStr) ||
          m.director.name.toLowerCase().includes(searchStr) ||
          m.director.nationality.toLowerCase().includes(searchStr) ||
          m.director.birthdate.toLowerCase().includes(searchStr)
        );
      });
    }
  }
};
</script>
