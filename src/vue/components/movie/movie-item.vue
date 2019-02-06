<template>
  <li class="movie-iem">{{ movie.title }}</li>
</template>

<script>
export default {
  name: "MovieItem",
  props: ["movie"]
};
</script>
