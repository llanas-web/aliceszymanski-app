<template>
  <div class="container is-widescreen">
    <section class="hero is-fullheight-with-navbar">
      <vue-simple-markdown :source="bio.full"></vue-simple-markdown>
    </section>
  </div>
</template>

<script>
import bioQuery from "~/apollo/queries/bio/bio";
import "vue-simple-markdown/dist/vue-simple-markdown.css";

export default {
  data() {
    return {
      bio: {},
    };
  },
  apollo: {
    bio: {
      prefetch: true,
      query: bioQuery,
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/main.scss";

@media screen and (min-width: $tablet) {
  img {
    width: 30rem;
  }
  img:nth-child(even) {
    float: right;
    margin-left: 3rem;
  }

  img:nth-child(odd) {
    float: left;
    margin-right: 3rem;
  }
}

@media screen and (max-witdh: $tablet) {
  img {
    width: 80%;
  }
}

img {
  border-radius: 2%;
}
</style>