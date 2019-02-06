<template>
  <div class="movie-edit">
    <p v-if="!movie" class="not-found">Movie not found</p>

    <template v-else>
      <h1>Editing movie "{{ movie.title }}"</h1>

      <form @submit.prevent="$router.push({name:'Home'})">
        <label for="title" class="block">Title :</label>
        <input type="text" v-model="movie.title" id="title" required>

        <label for="release" class="block">Release date :</label>
        <input type="number" v-model="movie.release" id="release">

        <label for="genre" class="block">Genre :</label>
        <input type="text" v-model="movie.genre" id="genre">

        <fieldset>
          <legend>Director :</legend>
          <label class="block">Name :</label>
          <input type="text" v-model="movie.director.firstname" placeholder="Firstname">
          <input type="text" v-model="movie.director.lastname" placeholder="Lastname">

          <label for="director_country" class="block">Country :</label>
          <input type="text" v-model="movie.director.country" id="director_country">

          <label for="director_birthdate" class="block">Birthdate :</label>
          <input type="date" v-model="movie.director.birthdate" id="director_birthdate">
        </fieldset>

        <button type="submit">Save</button>
      </form>

      <button type="button" @click="deleteMovie()">Delete</button>
    </template>
  </div>
</template>

<script>
export default {
  name: "MovieEdit",
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
.not-found {
  color: red;
}
input {
  display: block;
}
</style>
