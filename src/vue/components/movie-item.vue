<template>
  <div class="movie-iem">{{movie.Title}}</div>
</template>

<script>
export default {
  name: "MovieItem",
  props: ["movie"]
};
</script>
