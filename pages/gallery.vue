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
  head() {
    if (this.metadata) {
      return {
        title: "Alice Szymanski - Gallerie",
        meta: [
          {
            hid: "title",
            name: "title",
            content: this.metadata.title,
          },
          {
            hid: "description",
            name: "description",
            content: this.metadata.description,
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.metadata.keywords,
          },
        ],
      };
    }
  },
  data() {
    return {
      photos: [],
    };
  },
  methods: {},
  async fetch() {
    let gallery = await this.$axios.$get("/gallery");
    this.photos = gallery.photos;
    this.metadata = gallery.metadata;
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
</style>