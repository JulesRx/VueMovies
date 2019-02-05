<template>
  <li class="movie-iem">{{movie.Title}}</li>
</template>

<script>
export default {
  name: "MovieItem",
  props: ["movie"]
};
</script>
