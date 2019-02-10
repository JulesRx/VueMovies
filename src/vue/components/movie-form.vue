<template>
  <form class="movie-form" enctype="multipart/form-data">
    <label for="title">Titre</label>
    <input type="text" id="title" v-model="movie.title">

    <label for="year">Année</label>
    <input type="number" id="year" v-model="movie.year">

    <label for="genre">Genre</label>
    <input type="text" id="genre" v-model="movie.genre">

    <label for="poster">Poster</label>
    <input
      type="file"
      ref="posterInput"
      id="poster"
      accept=".png, .jpg, .jpeg"
      @change="processFile($event)"
    >

    <div class="form-group col-lg-6" v-if="movie.poster || preview">
      <p>Poster actuel :</p>
      <img :src="movie.poster || preview" alt="Poster actuel" height="100px">
    </div>

    <h3>Réalisateur</h3>
    <label for="director_name">Nom</label>
    <input type="text" id="director_name" v-model="movie.director.name">

    <label for="director_nationality">Nationalité</label>
    <input type="text" id="director_nationality" v-model="movie.director.nationality">

    <label for="director_birthdate">Date de naissance</label>
    <input type="date" id="director_birthdate" v-model="movie.director.birthdate">
  </form>
</template>

<script>
export default {
  props: ["movie", "poster"],
  data() {
    return {
      preview: null,
      reader: new FileReader()
    };
  },
  methods: {
    processFile($event) {
      this.movie.poster = null;

      this.poster.file = $event.target.files[0];
      var self = this;
      this.reader.onload = function(e) {
        self.preview = e.target.result;
      };

      if (this.poster.file) {
        this.reader.readAsDataURL(this.poster.file);
      }
    }
  }
};
</script>
