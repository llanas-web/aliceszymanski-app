<template>
  <client-only>
    <div class="media-carousel">
      <!-- swiper1 -->
      <swiper
        class="swiper gallery-top"
        v-swiper="swiperOptionTop"
        ref="swiperTop"
      >
        <swiper-slide
          v-for="media of listMedias"
          :key="media.id"
          class="slide is-fullheight"
        >
          <vue-plyr
            v-if="
              media.media != null && media.media.mime.indexOf('video') != -1
            "
          >
            <video class="is-fullheight">
              <source :src="media.media.url" :type="media.media.mime" />
            </video>
          </vue-plyr>
          <vue-plyr v-else-if="media.youtubeId != null">
            <div
              data-plyr-provider="youtube"
              :data-plyr-embed-id="media.youtubeId"
            ></div>
          </vue-plyr>
          <iframe
            v-else-if="media.soundcloudUrl != null"
            width="100%"
            height="100%"
            scrolling="yes"
            frameborder="no"
            allow="autoplay"
            show_artwork="true"
            :src="
              'https://w.soundcloud.com/player/?url=' +
              media.soundcloudUrl +
              '&auto_play=false&buying=false&liking=false&download=false&sharing=false&show_artwork=false&show_comments=false&show_playcount=false&show_user=true&hide_related=true&visual=false&start_track=0&callback=true'
            "
          >
          </iframe>
        </swiper-slide>
      </swiper>
      <!-- swiper2 Thumbs -->
      <swiper
        class="swiper gallery-thumbs"
        :options="swiperOptionThumbs"
        ref="swiperThumbs"
        @slideChange="onThumbnailChange"
      >
        <swiper-slide
          v-for="media of listMedias"
          :key="media.id"
          class="slide coverImage shadow-light"
          :style="{ backgroundImage: getBackgroundImageFromMedia(media) }"
        >
          <!-- <p class="is-size-3">{{ media.title }}</p> -->
        </swiper-slide>
      </swiper>
    </div>
  </client-only>
</template>

<script>
export default {
  props: ["listMedias"],
  data() {
    return {
      swiperOptionTop: {},
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    };
  },
  methods: {
    onThumbnailChange(val) {
      this.$refs.swiperTop.$swiper.slideTo(val.activeIndex);
    },
    getBackgroundImageFromMedia(media) {
      if (media.youtubeId != null) {
        return `url('https://img.youtube.com/vi/${media.youtubeId}/0.jpg')`;
      } else if (media.background != null) {
        return `url('${media.background.url}')`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/main.scss";

.media-carousel {
  height: 80vh;
}

.swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  &.gallery-top {
    height: 85%;
    width: 60%;
  }
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 1rem 0;
  }
  &.gallery-thumbs .swiper-slide {
    width: 15%;
    height: 100%;
    opacity: 0.4;
  }
  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}
</style>