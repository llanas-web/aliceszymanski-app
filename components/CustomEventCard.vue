<template>
  <div class="card">
    <div class="card-image" v-if="strapiEvent != null">
      <div
        class="image is-4by3 coverImage"
        :style="{backgroundImage: 'url(' + strapiEvent.image.url + ')'}"
      ></div>
    </div>
    <div class="card-content">
      <div class="media ml-5">
        <div class="media-content">
          <p class="title is-4">{{strapiEvent.title}}</p>
        </div>
      </div>

      <div class="content">
        <vue-simple-markdown :source="strapiEvent.description"></vue-simple-markdown>
        <time datetime="2016-1-1">{{strapiEvent.formatedDate}}</time>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomEventCard",
  props: ["strapi-event"],
};
</script>

<style>
.card {
  min-height: 100%;
}
</style>