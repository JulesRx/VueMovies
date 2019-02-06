<template>
  <li class="movie-item">
    <router-link :to="{name:'MovieEdit', params:{id:movie.id}}">
      <!-- {{ movie.title }} -->
      <!-- <span
        class="director"
        v-if="movie.director.length"
      >directed by {{ movie.director.firstname }}</span> -->
      {{ movie }}
    </router-link>
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
