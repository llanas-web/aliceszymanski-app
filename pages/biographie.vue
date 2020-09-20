<template>
  <div class="container is-widescreen mt-6">
    <section class="hero is-fullheight-with-navbar">
      <div class="columns is-centered" style="height: 50vh;">
        <div class="column is-10" v-if="bio.photo != undefined">
          <div
            class="coverImage my-4 is-hidden-touch"
            :style="{backgroundImage: 'url(' + bio.photo.url + ')'}"
          />
          <div class="mt-6">
            <CustomTextZone :strapi-text-zone="bio.resume" padding-y="1"></CustomTextZone>
          </div>
          <div class="divider"></div>
          <div v-for="(activity, index) in bio.activities" :key="activity.id" class="mt-6">
            <CustomTextZone :strapi-text-zone="activity" padding-y="1"></CustomTextZone>
            <div v-if="bio.activities.length - 1 != index" class="divider"></div>
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
</style>