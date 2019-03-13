<template>
  <form class="movie-form" enctype="multipart/form-data">
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          class="form-control"
          required
          v-model="movie.title"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="year">Year</label>
        <input
          type="number"
          id="year"
          class="form-control"
          v-model="movie.year"
        />
      </div>
      <div class="form-group col-md-8">
        <label for="genre">Genre</label>
        <input
          type="text"
          id="genre"
          class="form-control"
          v-model="movie.genre"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="poster">Poster</label>
        <input
          type="file"
          ref="posterInput"
          id="poster"
          class="form-control-file"
          accept=".png, .jpg, .jpeg, .gif"
          @change="processFile($event)"
        />

        <button
          type="button"
          class="btn btn-primary"
          @click="posterOMDB($event)"
          :disabled="searching"
        >
          Search for IMBD's poster
        </button>
        <span>{{ error }}</span>
      </div>

      <div class="form-group col-md-6" v-if="movie.poster || preview">
        <label>Poster preview :</label>
        <img :src="movie.poster || preview" alt="Poster" class="img-fluid" />
      </div>
    </div>

    <h3>Director</h3>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="director_name">Name</label>
        <input
          type="text"
          id="director_name"
          class="form-control"
          v-model="movie.director.name"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="director_nationality">Nationality</label>
        <input
          type="text"
          id="director_nationality"
          class="form-control"
          v-model="movie.director.nationality"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="director_birthdate">Birthdate</label>
        <input
          type="date"
          id="director_birthdate"
          class="form-control"
          v-model="movie.director.birthdate"
        />
      </div>
    </div>

    <router-link
      v-if="movie && movie.id"
      :to="{ name: 'movie-details', params: { id: movie.id } }"
      class="btn btn-secondary"
      >Cancel</router-link
    >

    <button
      type="button"
      class="btn btn-primary float-right"
      @click="$emit('submitted')"
    >
      Save
    </button>
  </form>
</template>

<script>
export default {
  props: ['movie', 'poster'],
  data() {
    return {
      preview: null,
      reader: new FileReader(),
      searching: false,
      error: ''
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
    },
    posterOMDB() {
      this.searching = true;
      this.$store.dispatch('posterOmdbAPI', this.movie.title).then(res => {
        this.searching = false;
        if (res.error) {
          this.error = res.error;
        } else {
          this.movie.poster = res.poster_url;

          this.$refs.posterInput.value = '';
          this.error = '';
          this.poster.file = null;
          this.preview = null;
        }
      });
    }
  }
};
</script>
