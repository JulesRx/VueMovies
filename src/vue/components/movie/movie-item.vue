<template>
  <li class="movie-item">
    <router-link :to="{name:'MovieDetails', params:{id:movie.id}}">{{ movie }}</router-link>
  </li>
</template>

<script>
export default {
  name: "MovieItem",
  props: ["movie"]
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
