<template>
  <div class="movie-item">
    <div class="card movie-card">
      <img :src="movie.poster ? movie.poster : 'no-poster.png'" class="card-img-top" :alt="movie.title">
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text">Released in {{ movie.year }} and directed by {{ movie.director.name }}.</p>
        <router-link
          :to="{ name: 'movie-details', params: { id: movie.id }}"
          class="btn btn-primary"
        >More infos</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"]
};
</script>

<style lang="scss" scoped>
.movie-card{
  img{
    max-height: 450px;
  }
}
</style>
