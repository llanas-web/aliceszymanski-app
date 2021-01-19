<template>
  <div class="content is-widescreen mt-6">
    <div class="hero is-fullheight">
      <media-gallery :medias="images"></media-gallery>
    </div>
  </div>
</template>

<script>
import MediaGallery from "../components/MediaGallery/MediaGallery.vue";

export default {
  components: { MediaGallery },
  data() {
    return {
      images: [],
    };
  },
  methods: {},
  async fetch() {
    let url = `${process.env.API_URL || "http://localhost:1337"}/gallery`;
    let gallery = await fetch(url).then((response) => response.json());
    if (gallery != null) {
      this.images = gallery.images;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
</style>