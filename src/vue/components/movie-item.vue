<template>
  <div class="movie-item">
    <router-link :to="{ name: 'movie-details', params: {id: movie.id} }">
      <div class="poster">
        <img :src="movie.poster?movie.poster:'no-poster.png'" :alt="movie.title">
      </div>
      <h3>{{ movie.title }} ({{ movie.year }})</h3>
      <p>{{ movie.genre }}</p>
      <p
        v-if="movie.director"
      >Directed by {{ movie.director.name }} ({{ movie.director.nationality }}, {{ movie.director.birthdate }})</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["movie"]
};
</script>

<style lang="scss" scoped>
.movie-item {
  display: block;
  max-width: 340px;
  margin: 0 auto;

  a {
    color: inherit;
    text-decoration: none;
  }

  .poster {
    text-align: center;

    img {
      width: 300px;
    }
  }
}
</style>
