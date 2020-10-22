<template>
  <div class="content" v-if="pages != null && pages.length > 0">
    <section class="section">
      <div class="container is-widescreen is-centered" style="height: 50vh">
        <div
          class="coverImage my-4 is-hidden-touch"
          :style="{
            backgroundImage: 'url(' + page.header.image.url + ')',
          }"
        />
        <span class="title">{{ pages[0].title }}</span>
      </div>
    </section>
    <section
      class="section mt-4"
      v-for="(content, index) in pages[0].content"
      :key="content.id"
    >
      <div class="container is-widescreen is-centered">
        <CustomTextZone
          :strapi-text-zone="content"
          padding-y="1"
          padding-x="3"
        ></CustomTextZone>
        <div v-if="pages[0].content.length - 1 != index" class="divider"></div>
      </div>
    </section>
  </div>
</template>

<script>
import pageQuery from "~/apollo/queries/page/page";
import "vue-simple-markdown/dist/vue-simple-markdown.css";

export default {
  data() {
    return {
      pages: [],
    };
  },
  apollo: {
    pages: {
      prefetch: true,
      query: pageQuery,
    },
  },
  props: ["url"],
};
</script>

<style lang="scss" scoped>
@import "~/assets/main.scss";

.title {
  font-size: 3rem;
  font-family: $title-2;
}
</style>