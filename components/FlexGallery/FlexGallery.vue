<template>
  <div>
    <div
      v-if="galleryListItems != null && galleryListItems.length > 0"
      class="gallery-container"
    >
      <div
        v-for="(galleryItem, index) in galleryListItems"
        :key="galleryItem.id"
        :id="galleryItem.id"
        class="gallery-item has-text-centered coverImage"
        :style="{
          backgroundImage:
            galleryItem.backgroundMedia == null ||
            galleryItem.backgroundMedia.mime.indexOf('audio') != -1 ||
            index != readingIndex
              ? `url(${galleryItem.backgroundImage.formats['large'].url})`
              : '',
        }"
      >
        <div class="item-container is-fullheight">
          <video
            v-if="
              galleryItem.backgroundMedia != null &&
              galleryItem.backgroundMedia.mime.indexOf('video') != -1
            "
            :ref="'mediaSource' + index"
            class="video-content"
          >
            <source :src="galleryItem.backgroundMedia.url" />
          </video>
          <audio
            :ref="'mediaSource' + index"
            v-else-if="
              galleryItem.backgroundMedia != null &&
              galleryItem.backgroundMedia.mime.indexOf('audio') != -1
            "
            :src="galleryItem.backgroundMedia.url"
          ></audio>
          <div class="item-text py-6">
            <div class="mb-4" v-if="galleryItem.backgroundMedia != null">
              <button class="button" @click="playBackground(index)">
                <span class="icon has-text-warning-light">
                  <font-awesome-icon
                    v-if="readingIndex == index"
                    :icon="['fas', 'pause']"
                  />
                  <font-awesome-icon v-else :icon="['fas', 'play']" />
                </span>
              </button>
            </div>
            <div>
              <nuxt-link
                :to="{
                  path: '/musique-de-chambre',
                  hash: '#' + galleryItem.page.url,
                }"
                class="has-text-centered has-text-warning-light is-size-4 is-family-secondary"
                >{{ galleryItem.page.title }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readingIndex: null,
    };
  },
  props: ["galleryListItems"],
  methods: {
    playBackground(sourceIndex) {
      for (let i = 0; i < this.galleryListItems.length; i++) {
        console.dir(sourceIndex);
        console.dir(this.$refs);
        if (sourceIndex === i) {
          if (sourceIndex === this.readingIndex) {
            this.$refs["mediaSource" + i][0].pause();
            this.readingIndex = null;
          } else {
            this.$refs["mediaSource" + i][0].play();
            this.readingIndex = sourceIndex;
          }
        } else if (this.$refs["mediaSource" + i]) {
          this.$refs["mediaSource" + i][0].pause();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.gallery-container {
  display: flex;
  height: 120vh;
  flex-direction: column;
}

@media screen and (min-width: $mobile) {
  .gallery-container {
    flex-direction: row;
    height: 80vh;
  }
}

.gallery-item {
  flex-grow: 1;
  position: relative;
  transition: all 1s;
}

.item-text {
  width: 100%;
  //   visibility: hidden;
  opacity: 0;
  background: none;
  position: absolute;
  transition: all 1s;
}

@media screen and (min-width: $mobile) {
  .gallery-item:hover {
    flex-grow: 2;
    .item-text {
      visibility: visible;
      opacity: 1;
      background: rgb(56, 44, 44);
      background: linear-gradient(
        0deg,
        rgba(56, 44, 44, 1) 0%,
        rgba(113, 113, 113, 0.4878151944371498) 50%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }
}

.item-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  button {
    background-color: transparent;
    color: $yellow;
    border-color: $yellow;
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