<template>
  <div
    v-if="galleryItem.background.mime.indexOf('video') != -1"
    class="gallery-item has-text-centered"
    :style="{
      backgroundImage:
        !!backgroundInProgress || videoPlayed
          ? ''
          : `url(${galleryItem.page.header.image.url})`,
    }"
    @mouseenter="backgroundStart()"
    @mouseleave="backgroundStop()"
  >
    <div class="item-container is-fullheight">
      <video
        :hidden="!backgroundInProgress"
        class="video-content"
        ref="videoContent"
        :muted="isMuted"
      >
        <source :src="galleryItem.background.url" />
      </video>
      <div
        class="item-text mb-6"
        v-show="!!backgroundInProgress || videoPlayed"
      >
        <div class="my-4">
          <button class="button" @click="isMuted = !isMuted">
            <span class="icon">
              <font-awesome-icon
                v-if="isMuted"
                :icon="['fas', 'volume-mute']"
              />
              <font-awesome-icon v-else :icon="['fas', 'volume-up']" />
            </span>
          </button>
        </div>
        <div>
          <nuxt-link
            :to="{
              path: '/musique-de-chambre',
              hash: '#' + galleryItem.page.url,
            }"
            class="navbar-item has-text-centered is-size-4"
            >{{ galleryItem.page.title }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="galleryItem.background.mime.indexOf('audio') != -1"
    class="gallery-item has-text-centered"
    :style="{ backgroundImage: `url(${galleryItem.page.header.image.url})` }"
    @mouseenter="backgroundStart()"
    @mouseleave="backgroundStop()"
  >
    <div class="item-container is-fullheight">
      <div hidden="true" ref="soundContent"></div>
      <div
        class="item-text mb-6"
        v-show="!!backgroundInProgress || videoPlayed"
      >
        <div class="my-4">
          <button class="button" @click="playSound()">
            <span class="icon">
              <font-awesome-icon
                v-if="isMuted"
                :icon="['fas', 'volume-mute']"
              />
              <font-awesome-icon v-else :icon="['fas', 'volume-up']" />
            </span>
          </button>
        </div>
        <div>
          <nuxt-link
            :to="{
              path: '/musique-de-chambre',
              hash: '#' + galleryItem.page.url,
            }"
            class="navbar-item has-text-centered is-size-4"
            >{{ galleryItem.page.title }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="gallery-item has-text-centered"
    :style="{ backgroundImage: `url(${galleryItem.page.header.image.url})` }"
  >
    <div class="item-container is-fullheight">
      <div
        class="item-text mb-6"
        v-show="!!backgroundInProgress || videoPlayed"
      >
        <div>
          <nuxt-link
            :to="{
              path: '/musique-de-chambre',
              hash: '#' + galleryItem.page.url,
            }"
            class="navbar-item has-text-centered is-size-4"
            >{{ galleryItem.page.title }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sound: null,
      isMuted: true,
      backgroundPlayed: false,
      backgroundInProgress: false,
      timeoutId: 0,
    };
  },
  props: ["galleryItem"],
  mounted() {
    if (this.$refs.videoContent) {
      this.$refs.videoContent.addEventListener(
        "ended",
        _videoEventListener.bind(this)
      );
    } else if (this.$refs.soundContent) {
      this.sound = new Audio(this.galleryItem.background.url);
    }
  },
  methods: {
    backgroundStart() {
      if (!this.backgroundPlayed) {
        this.timeoutId = setTimeout(() => {
          console.log("PLAY");
          this.backgroundInProgress = true;
          if (this.$refs.videoContent) this.$refs.videoContent.play();
        }, 1000);
      }
    },
    backgroundStop() {
      clearTimeout(this.timeoutId);
      if (!this.videoPlayed) {
        console.log("PAUSE");
        this.backgroundInProgress = false;
        if (this.$refs.videoContent) this.$refs.videoContent.pause();
      }
    },
    playSound() {
      if (this.isMuted) {
        this.sound.play();
        this.isMuted = false;
      } else {
        this.sound.pause();
        this.isMuted = true;
      }
    },
  },
};
const _videoEventListener = function () {
  console.log("END");
  this.backgroundInProgress = false;
  this.videoPlayed = true;
  this.$refs.videoContent.removeEventListener("ended", _videoEventListener);
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
.gallery-item {
  flex-grow: 1;
  position: relative;
  transition: all 1s;

  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
}

.gallery-item:hover {
  flex-grow: 2;
}

.item-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  flex-direction: column;

  .item-text {
    justify-content: flex-end;

    p {
      color: $yellow;
    }

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