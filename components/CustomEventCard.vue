<template>
  <div class="card">
    <div class="card-image" v-if="strapiEvent != null">
      <div class="coverImage" :style="{backgroundImage: 'url(' + strapiEvent.image.url + ')'}"></div>
    </div>
    <div class="card-content">
      <div class="media ml-5">
        <div class="media-content">
          <p class="title is-4">{{strapiEvent.title}}</p>
        </div>
      </div>

      <div class="content">
        <vue-simple-markdown :source="strapiEvent.description"></vue-simple-markdown>
      </div>
    </div>
    <footer class="card-footer">
      <div class="level-item">
        <time datetime="2016-1-1">{{strapiEvent.formatedDate}}</time>
      </div>
      <div class="level-item">
        <span v-if="strapiEvent.cancelled" class="is-size-6">Annulé</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "CustomEventCard",
  props: ["strapi-event"],
};
</script>

<style lang="scss" scoped>
@import "~/assets/main.scss";

.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.card-image {
  flex-grow: 1;
}
.card-image > :first-child {
  position: absolute;
  width: 100%;
}

.card-footer {
  justify-content: space-between;
  padding: 1em 2em;
  margin-top: auto;
  border-top: 1px solid $yellow;
}
</style>