<template>
  <div class="movie-details">
    <div v-if="!movie">
      <p>Movie not found</p>
    </div>

    <template v-else>
      <h1>{{ movie.title }}</h1>

      <div class="row">
        <div class="col-md-4 poster">
          <img
            :src="movie.poster?movie.poster:'no-poster.png'"
            :alt="movie.title"
            class="img-fluid"
          >
        </div>
        <div class="col-md-8 details">
          <h4>About this movie</h4>
          <div class="about">
            <p>
              <b>Release :</b>
              {{ movie.year }}
            </p>
            <p>
              <b>Genre :</b>
              {{ movie.genre }}
            </p>

            <p>
              <b>Director :</b>
              {{ movie.director.name }}, {{ movie.director.nationality }} and born the {{ movie.director.birthdate }}.
            </p>
          </div>

          <h4>Ratings</h4>
          <div class="ratings">
            <p>
              <b>Current score :</b>
              {{ rate }}/5 (based on {{ movie.ratings.length }} ratings)
            </p>

            <b>Rate this movie :</b>
            <template v-if="!rated">
              <br>
              <p>Your score :
                <rate
                  :length="5"
                  v-model="rating"
                  @after-rate="rateMovie()"
                  style="display:inline"
                />
              </p>
            </template>
            <p v-else>Thank you !</p>
          </div>

          <h4>Options</h4>
          <div class="options">
            <router-link
              :to="{name: 'movie-edit', params:{ id: movie.id }}"
              class="btn btn-primary"
            >Edit</router-link>
            <button type="button" class="btn btn-secondary" @click="deleteMovie()">Delete</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rated: false,
      rating: 3
    };
  },
  computed: {
    movie() {
      return this.$store.state.movie;
    },
    rate() {
      if (this.movie.ratings.length == 0) {
        return "N/A";
      }

      return (
        Math.round(
          (this.movie.ratings.reduce((a, b) => a + b, 0) /
            this.movie.ratings.length) *
            10
        ) / 10
      );
    }
  },
  created() {
    this.getMovie();
  },
  watch: {
    $route: "getMovie"
  },
  methods: {
    getMovie() {
      this.$store.dispatch("getMovieAPI", this.$route.params.id);
    },
    deleteMovie() {
      if (confirm("Are you sure you want to delete this movie ?")) {
        this.$store
          .dispatch("deleteMovieAPI", this.movie.id)
          .then(() => {
            this.$router.push({ name: "home" });
          })
          .catch(() => {
            console.error("Cannot delete movie");
          });
      }
    },
    rateMovie() {
      this.$store
        .dispatch("rateMovieAPI", { id: this.movie.id, rating: this.rating })
        .then(() => {
          this.rated = true;
          this.$store.dispatch("getMovieAPI", this.$route.params.id);
        })
        .catch(() => {
          console.error("Cannot rate movie");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.movie-details {
  .poster {
    margin-bottom: 12px;

    img {
      width: 100%;
    }
  }

  .details {
    h4 {
      margin-top: 0.6rem;
      font-size: 1.55rem;
    }

    p {
      font-size: 1.05rem;
      margin-bottom: 0.5rem;
    }

    .options{
      .btn{
        margin-top: 12px;
        margin-right: 4px;
      }
    }
  }
}
</style>
