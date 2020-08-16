<template>
  <div>
    <div class="gallery-container">
      <div
        class="gallery-item has-text-centered"
        :style="{backgroundImage: (videoInProgress) ? '' : `url(${backgroundImages[0]})`}"
        @mouseenter="videoStart()"
        @mouseleave="videoStop()"
      >
        <div class="item-container is-fullheight">
          <video
            poster="https://storage.googleapis.com/aliceszymanski-uploads/trio_7ba1148aea/trio.jpg_trio_7ba1148aea.jpg"
            :hidden="!videoInProgress"
            class="video-content"
            ref="videoContent"
            :muted="isMuted"
          >
            <source
              src="https://storage.googleapis.com/aliceszymanski-uploads/trio_zerline_short_b2d9372b26/trio_zerline_short.mov_trio_zerline_short_b2d9372b26.mov"
            />
          </video>
          <div class="item-button">
            <button class="button" @click="isMuted = !isMuted" v-show="!!videoInProgress">
              <span class="icon" v-show="!!videoInProgress">
                <font-awesome-icon v-if="isMuted" :icon="['fas', 'volume-mute']" />
                <font-awesome-icon v-else :icon="['fas', 'volume-up']" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="gallery-item" :style="{backgroundImage: `url(${backgroundImages[1]})`}">
        <div class="image-content"></div>
      </div>
      <div class="gallery-item" :style="{backgroundImage: `url(${backgroundImages[2]})`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundImages: [
        "https://storage.googleapis.com/aliceszymanski-uploads/trio_7ba1148aea/trio.jpg_trio_7ba1148aea.jpg",
        "https://storage.googleapis.com/aliceszymanski-uploads/duo_guitare_berge_96a799c6a6/duo_guitare_berge.jpg_duo_guitare_berge_96a799c6a6.jpg",
        "https://storage.googleapis.com/aliceszymanski-uploads/IMG_9467_eb8e68a72b/IMG_9467.JPG_IMG_9467_eb8e68a72b.jpg",
      ],
      isMuted: true,
      videoPlayed: false,
      videoInProgress: false,
    };
  },
  mounted() {
    this.$refs.videoContent.addEventListener(
      "ended",
      _videoEventListener.bind(this)
    );
  },
  methods: {
    videoStart() {
      if (!this.videoPlayed) {
        console.log("PLAY");
        this.videoInProgress = true;
        this.$refs.videoContent.play();
      }
    },
    videoStop() {
      if (!this.videoPlayed) {
        console.log("PAUSE");
        this.$refs.videoContent.pause();
      }
    },
  },
};
const _videoEventListener = function () {
  console.log("END");
  this.videoInProgress = false;
  this.videoPlayed = true;
  this.$refs.videoContent.removeEventListener("ended", _videoEventListener);
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
.gallery-container {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

@media screen and (min-width: $mobile) {
  .gallery-container {
    flex-direction: row;
  }
}

.gallery-item {
  flex-grow: 1;
  position: relative;
  transition: all 1s;

  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
}

.gallery-container:hover > .gallery-item {
  filter: blur(1px);
}

.gallery-item:hover {
  flex-grow: 2;
  filter: blur(0) !important;
}

.item-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 80vh;
  flex-direction: column;

  .item-button {
    justify-content: flex-end;
    display: flex;

    button {
      background-color: transparent;
      color: $yellow;
      border-color: $yellow;
    }
  }
}

.video-content {
  object-fit: cover;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
}
</style>