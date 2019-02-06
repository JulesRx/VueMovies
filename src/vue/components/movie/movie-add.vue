<template>
  <div class="movie-add">
    <h2>Add new movie</h2>

    <form @submit.prevent="addMovie()">
      <label for="title">Title :</label>
      <input type="text" v-model="form.title" id="title">
      <br>

      <label for="release">Release date :</label>
      <input type="date" v-model="form.date" id="release">
      <br>

      <label for="director_name">Director :</label>
      <input type="text" v-model="form.director_name" id="director_name">
      <br>

      <label for="genre">Genre :</label>
      <input type="text" v-model="form.genre" id="genre">
      <br>

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
        director_name: "",
        genre: ""
      }
    };
  },
  methods: {
    addMovie: () => {
      console.log("Added");
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  margin-bottom: 10px;
}
input {
  display: block;
  min-width: 200px;
}
</style>
