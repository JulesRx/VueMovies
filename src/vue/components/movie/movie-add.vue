<template>
  <div class="movie-add">
    <h2>Add new movie</h2>

    <div class="imdb">
      <p>Search from IMDB :</p>
      <input type="text" v-model="imdb.search" @keyup="searchIMDB()">
      <ul>
        <li class="movie" v-for="res in imdb.results" :key="res.imdbID" @click="completeIMDB(res)">
          <span class="infos">{{ res.Title }}, {{ res.Year }}</span>
          <img
            v-if="res.Poster != 'N/A'"
            :src="res.Poster"
            :alt="res.Title + 'Poster'"
            class="poster"
            style="display:block;height:100px"
          >
        </li>
      </ul>
    </div>

    <hr>

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
        poster: "",
        director: {
          firstname: "",
          lastname: "",
          country: "",
          birthdate: ""
        }
      },
      imdb: {
        search: "",
        results: []
      }
    };
  },
  methods: {
    searchIMDB() {
      // https://forum.vuejs.org/t/delay-keyup/31487/2
      if (this.imdb.search.length) {
        this.$ihttp
          .get("https://www.omdbapi.com", {
            params: {
              s: this.imdb.search,
              type: "movie"
            }
          })
          .then(res => {
            if (res.data.Response) {
              console.log(res.data.Search);
              this.imdb.results = res.data.Search;
            } else {
              this.imdb.results = [];
            }
          });
      } else {
        this.imdb.results = [];
      }
    },
    completeIMDB(result) {
      this.$ihttp
        .get("https://www.omdbapi.com", {
          params: {
            i: result.imdbID
          }
        })
        .then(res => {
          const movie = res.data;
          console.log(movie);
          this.form.title = movie.Title;
          this.form.release = movie.Year;
          this.form.genre = movie.Genre;
          this.form.poster = movie.Poster != "N/A" ? movie.Poster : "";

          this.form.director.firstname = movie.Director.substr(
            0,
            movie.Director.indexOf(" ")
          );
          this.form.director.lastname = movie.Director;

          this.imdb.search = "";
          this.imdb.results = [];
        });
    },
    addMovie() {
      let movie = {
        id: this.$store.state.movies ? this.$store.state.movies.length + 1 : 1,
        title: this.form.title,
        release: this.form.release,
        genre: this.form.genre,
        poster: this.form.poster,
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
  margin-right: 5px;
  min-width: 200px;
}

button {
  margin-top: 10px;
}

.movie {
  cursor: pointer;
  margin: 10px 0;
}
</style>
