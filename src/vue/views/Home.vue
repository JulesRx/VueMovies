<template>
  <div class="home">
    <h1>Movies</h1>

    <router-link :to="{name: 'movie-add'}">New movie</router-link>

    <input type="text" v-model="search">

    <div class="movies row">
      <movie-item v-for="movie in movies" :key="movie.id" :movie="movie" class="col-md-4"></movie-item>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
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
