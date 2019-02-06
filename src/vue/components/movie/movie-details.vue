<template>
  <div class="movie-details">
    <p v-if="!movie" class="not-found">Movie not found</p>

    <template v-else>
      <h1>{{ movie.title }}</h1>
      <router-link :to="{name:'MovieEdit', params:{id:movie.id}}">Edit</router-link>
      <button type="button" @click="deleteMovie()">Delete</button>
      <p>{{ movie }}</p>
    </template>
  </div>
</template>

<script>
export default {
  name: "MovieDetails",
  data: () => {
    return {
      movie: {}
    };
  },
  methods: {
    deleteMovie() {
      if (
        confirm("Are you sure you want to delete " + this.movie.title + " ?")
      ) {
        let index = this.$store.state.movies.indexOf(this.movie);
        if (index > -1) {
          this.$store.state.movies.splice(index, 1);
          this.$router.push({ name: "Home" });
        }
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    this.movie = this.$store.state.movies.find(m => {
      return m.id == id;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
