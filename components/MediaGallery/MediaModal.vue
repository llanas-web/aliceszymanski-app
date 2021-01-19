<template>
  <div class="modal" :class="{ 'is-active': selectedMedia != null }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <client-only>
        <swiper
          class="swiper has-text-centered"
          ref="swiper"
          :options="swiperOptions"
        >
          <swiper-slide
            v-for="photo in section.photos"
            :key="photo.id"
            class="slide"
          >
            <img
              :src="photo.image.url"
              :alt="photo.description"
              :title="photo.title"
              class="swiper-lazy"
            />
            <h2 class="is-size-4 has-text-weight-semibold">
              {{ photo.title }}
            </h2>
            <h3>{{ photo.description }}</h3>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </client-only>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="selectedMedia = null"
    ></button>
  </div>
</template>

<script>
export default {
  props: ["selectedMedia"],
};
</script>

<style>
</style>