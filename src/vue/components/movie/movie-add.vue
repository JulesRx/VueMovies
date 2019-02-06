<template>
  <div class="movie-add">
    <h2>Add new movie</h2>

    <form @submit.prevent="addMovie()">
      <label for="title" class="block">Title :</label>
      <input type="text" v-model="form.title" id="title" required>

      <label for="release" class="block">Release date :</label>
      <input type="number" v-model="form.release" id="release">

      <label for="genre" class="block">Genre :</label>
      <input type="text" v-model="form.genre" id="genre">

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

      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "MovieAdd",
  data: () => {
    return {
      form: {
        title: "",
        release: "",
        genre: "",
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
    addMovie() {
      let movie = {
        id: this.$store.state.movies ? this.$store.state.movies.length + 1 : 1,
        title: this.form.title,
        release: this.form.release,
        genre: this.form.genre,
        director: {
          firstname: this.form.director.firstname,
          lastname: this.form.director.lastname,
          country: this.form.director.country,
          birthdate: this.form.director.birthdate
        }
      };

      this.$store.commit("addMovie", movie);
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style lang="scss" scoped>
fieldset {
  margin-top: 10px;
  border: 0;
}

label {
  margin-top: 10px;

  &.block {
    display: block;
  }
}
input {
  // display: block;
  margin-right: 5px;
  min-width: 200px;
}

button {
  margin-top: 10px;
}
</style>
