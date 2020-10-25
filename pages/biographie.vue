<template>
  <div class="content is-widescreen mt-6">
    <div class="hero has-text-centered">
      <div>
        <img
          id="biographie-image"
          class="shadow-semibold"
          :src="bio.photo.url"
          alt=""
        />
      </div>
    </div>

    <div class="container p-6">
      <div class="py-5">
        <CustomTextZone
          :strapi-text-zone="bio.resume"
          padding-y="1"
        ></CustomTextZone>
      </div>
      <div class="divider"></div>
      <div v-for="(activity, index) in bio.activities" :key="activity.id">
        <div class="py-5">
          <CustomTextZone
            :strapi-text-zone="activity"
            padding-y="1"
          ></CustomTextZone>
        </div>
        <div v-if="bio.activities.length - 1 != index" class="divider"></div>
      </div>
    </div>
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

<style lang="scss" scoped>
@import "~assets/main.scss";

.content {
  margin-top: $navbar-height;
  padding-top: $navbar-height;
}

#biographie-image {
  max-height: 60vh;
  width: auto;
}
</style>