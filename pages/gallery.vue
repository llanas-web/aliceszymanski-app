<template>
  <div class="content is-widescreen mt-6">
    <div class="hero is-fullheight">
      <media-gallery :medias="photos"></media-gallery>
    </div>
  </div>
</template>

<script>
import MediaGallery from "../components/MediaGallery/MediaGallery.vue";

export default {
  components: { MediaGallery },
  data() {
    return {
      photos: [],
    };
  },
  methods: {},
  async fetch() {
    let gallery = await this.$axios.$get("/gallery");
    this.photos = gallery.photos;
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
</style>