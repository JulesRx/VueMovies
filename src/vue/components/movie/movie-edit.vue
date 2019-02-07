<template>
  <div class="movie-edit">
    <p v-if="!movie" class="not-found">Movie not found</p>

    <template v-else>
      <h1>Editing movie "{{ movie.title }}"</h1>

      <form @submit.prevent="editMovie()">
        <label for="title" class="block">Title :</label>
        <input type="text" v-model="form.title" id="title" required>

        <label for="release" class="block">Release date :</label>
        <input type="number" v-model="form.release" id="release">

        <label for="genre" class="block">Genre :</label>
        <input type="text" v-model="form.genre" id="genre">

        <label for="poster" class="block">Poster :</label>
        <input type="file" id="poster">

        <fieldset>
          <legend>Director :</legend>
          <label class="block">Name :</label>
          <input type="text" v-model="form.director.firstname" placeholder="Firstname">
          <input type="text" v-model="form.director.lastname" placeholder="Lastname">

          <label for="director_country" class="block">Country :</label>
          <input type="text" v-model="form.director.country" id="director_country">

          <label for="director_birthdate" class="block">Birthdate :</label>
          <input type="date" v-model="form.director.birthdate" id="director_birthdate">
        </fieldset>

        <button type="submit">Save</button>
      </form>
    </template>
  </div>
</template>

<script>
export default {
  name: "MovieEdit",
  data: () => {
    return {
      movie: {},
      form: {
        title: "",
        release: "",
        genre: "",
        poster: "",
        director: {
          firstname: "",
          lastname: "",
          country: "",
          birthdate: ""
        }
      }
    };
  },
  methods: {
    editMovie() {
      this.movie.title = this.form.title;
      this.movie.release = this.form.release;
      this.movie.genre = this.form.genre;
      // this.movie.poster=this.form.poster;
      this.movie.director = this.form.director;

      this.$router.push({
        name: "MovieDetails",
        params: { id: this.movie.id }
      });
    }
  },
  created() {
    const id = this.$route.params.id;
    this.movie = this.$store.state.movies.find(m => {
      return m.id == id;
    });

    if (this.movie) {
      this.form.title = this.movie.title;
      this.form.release = this.movie.release;
      this.form.genre = this.movie.genre;
      this.form.poster = this.movie.poster;
      this.form.director = this.movie.director;
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  display: block;
}
</style>
