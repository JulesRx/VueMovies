<template>
  <div class="about">
    <div class="readme" v-if="!content.length">
      <h1>VueMovies</h1>
      <p>
        Projet DAWIN - Listes de films en NodeJs et VueJs par
        <a
          href="https://github.com/julesrx"
        >Jules Raffoux</a> (
        <a href="mailto:jules.raffoux@etu.u-bordeaux.fr">jules.raffoux@etu.u-bordeaux.fr</a>)
      </p>
    </div>
    <div class="readme" v-else v-html="content"></div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  data: () => {
    return {
      content: ""
    };
  },
  created() {
    this.$http
      .get(
        "https://raw.githubusercontent.com/JulesRx/VueMovies/master/README.md"
      )
      .then(res => {
        this.content = marked(res.data);
      });
  }
};
</script>
