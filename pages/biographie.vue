<template>
  <div class="container is-widescreen mt-6">
    <section class="hero is-fullheight-with-navbar">
      <div class="columns is-centered" style="height: 65vh;">
        <div class="column is-10">
          <div class="coverImage my-4" :style="{backgroundImage: 'url(' + bio.photo.url + ')'}" />
          <div class="columns mt-6">
            <div class="column is-6">
              <vue-simple-markdown :source="bio.firstPart" class="has-text-justified"></vue-simple-markdown>
            </div>
            <div class="column is-6">
              <vue-simple-markdown :source="bio.secondPart" class="has-text-justified"></vue-simple-markdown>
            </div>
          </div>
          <div class="divider"></div>
          <div v-for="activity in bio.activities" :key="activity.id" class="mt-6">
            <p class="is-size-4 is-family-secondary">{{activity.title}}</p>
            <br />
            <vue-simple-markdown :source="activity.content" class="has-text-justified"></vue-simple-markdown>
            <div class="divider"></div>
          </div>
        </div>
      </div>
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
</style>