<template>
  <div class="container is-widescreen mt-6">
    <section class="hero is-fullheight-with-navbar">
      <div class="columns is-centered" style="height: 50vh;">
        <div class="column is-10" v-if="page != undefined">
          <div
            class="coverImage my-4 is-hidden-touch"
            :style="{backgroundImage: 'url(' + page.header.image.url + ')'}"
          />
          <div v-for="(content, index) in page.content" :key="content.id" class="mt-6">
            <CustomTextZone :strapi-text-zone="content" padding-y="1" padding-x="3"></CustomTextZone>
            <div v-if="page.content.length - 1 != index" class="divider"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "vue-simple-markdown/dist/vue-simple-markdown.css";

export default {
  data() {
    return {
      page: this.$route.params.selected,
    };
  },
  props: ["url", "selected"],
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
</style>