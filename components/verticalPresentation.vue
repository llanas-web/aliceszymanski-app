<template>
  <div>
    <div class="vertical-container">
      <div
        class="vertical-item"
        :style="{backgroundImage: (videoInProgress) ? '' : `url(${backgroundImages[0]})`}"
        @mouseenter="videoStart()"
        @mouseleave="videoStop()"
      >
        <div>
          <video
            :hidden="!videoInProgress"
            src="https://storage.googleapis.com/aliceszymanski-uploads/trio_zerline_short_b2d9372b26/trio_zerline_short.mov_trio_zerline_short_b2d9372b26.mov"
            class="video-content"
            ref="videoContent"
          ></video>
        </div>
      </div>
      <div class="vertical-item" :style="{backgroundImage: `url(${backgroundImages[1]})`}">
        <div class="image-content"></div>
      </div>
      <div class="vertical-item" :style="{backgroundImage: `url(${backgroundImages[2]})`}"></div>
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

<style lang="scss">
@import "~assets/main.scss";
.vertical-container {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

@media screen and (min-width: $mobile) {
  .vertical-container {
    flex-direction: row;
  }
}

.vertical-container:hover > .vertical-item {
  filter: blur(1px);
}

.vertical-item {
  flex-grow: 1;
  transition: all 1s;

  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
}

.vertical-item:hover {
  flex-grow: 2;
  filter: blur(0) !important;
}

.video-content {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>