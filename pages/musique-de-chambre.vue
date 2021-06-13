<template>
  <div
    class="content"
    v-if="musiqueDeChambre.pages != null && musiqueDeChambre.pages.length > 0"
  >
    <div class="hero my-6">
      <p class="is-size-2 is-family-secondary is-uppercase has-text-centered">
        Musique De Chambre
      </p>
    </div>
    <div class="container p-6">
      <div v-for="(page, index) in musiqueDeChambre.pages" :key="page.id">
        <section class="section" :id="page.url">
          <section class="py-6 columns is-6 is-centered">
            <div class="column is-6">
              <p class="is-size-2 is-family-secondary is-uppercase">
                {{ page.title }}
              </p>
              <vue-simple-markdown
                :source="page.header.description"
              ></vue-simple-markdown>
            </div>
            <div class="column is-6">
              <div
                class="page-header-image coverImage shadow-light"
                :style="{
                  backgroundImage: 'url(' + page.header.image.url + ')',
                }"
              ></div>
            </div>
          </section>
          <section v-if="page.musicItems" class="music-list my-6">
            <div
              v-for="musicItem in page.musicItems"
              :key="musicItem.id"
              class="music-item has-text-centered"
            >
              <audio
                v-if="musicItem.music != null"
                :ref="'musicSource-' + musicItem.id"
                :src="musicItem.music.url"
              />
              <span class="icon" @click="playMusic(musicItem.id)">
                <font-awesome-icon
                  v-if="musicReadingId == musicItem.id"
                  :icon="['fas', 'pause']"
                />
                <font-awesome-icon v-else :icon="['fas', 'play']" />
              </span>
              <span>
                {{ musicItem.title }}
              </span>
            </div>
          </section>
          <section v-for="content in page.content" :key="content.id">
            <CustomTextZone
              :strapi-text-zone="content"
              padding-y="6"
              padding-x="6"
            ></CustomTextZone>
          </section>
          <section
            v-if="page.members != null && page.members.length > 0"
            class="hero p-6"
          >
            <div class="members-gallery">
              <div
                v-for="member of page.members"
                :key="member.id"
                class="members-gallery-item has-text-centered"
              >
                <figure class="image is-128x128 shadow-semibold">
                  <img
                    class="is-rounded"
                    :src="
                      member.profil.formats['thumbnail'] != null
                        ? member.profil.formats['thumbnail'].url
                        : member.profil.formats['small'].url
                    "
                    :alt="member.name + '-' + member.work"
                  />
                </figure>
                <p class="is-size-4 has-text-weight-semibold">
                  {{ member.name }}
                </p>
                <p class="is-size-6">{{ member.work }}</p>
              </div>
            </div>
          </section>
          <section
            v-if="page.soundcloudLink != null"
            class="hero my-6 px-6 has-text-centered"
          >
            <div>
              <iframe
                width="100%"
                height="350"
                scrolling="yes"
                frameborder="no"
                allow="autoplay"
                show_artwork="true"
                :src="
                  'https://w.soundcloud.com/player/?url=' +
                  page.soundcloudLink +
                  '&auto_play=false&buying=false&liking=false&download=false&sharing=false&show_artwork=false&show_comments=false&show_playcount=false&show_user=true&hide_related=true&visual=false&start_track=0&callback=true'
                "
              >
              </iframe>
            </div>
          </section>
        </section>
        <div
          v-if="musiqueDeChambre.pages.length - 1 != index"
          class="divider"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-simple-markdown/dist/vue-simple-markdown.css";

export default {
  head() {
    if (this.musiqueDeChambre && this.musiqueDeChambre.metadata) {
      return {
        title: "Alice Szymanski - Musique de Chambre",
        meta: [
          {
            hid: "title",
            name: "title",
            content: this.musiqueDeChambre.metadata.title,
          },
          {
            hid: "description",
            name: "description",
            content: this.musiqueDeChambre.metadata.description,
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.musiqueDeChambre.metadata.keywords,
          },
        ],
      };
    }
  },
  data() {
    return {
      musiqueDeChambre: {},
      musicReadingId: null,
    };
  },
  async fetch() {
    this.musiqueDeChambre = await this.$axios.$get("/musique-de-chambre");
  },
  methods: {
    playMusic(musicItemId) {
      const listMusics = [];
      this.musiqueDeChambre.pages.forEach((page) => {
        listMusics.push(...page.musicItems);
      });
      for (const musicItem of listMusics) {
        const audio = this.$refs["musicSource-" + musicItem.id][0];
        if (musicItem.id === musicItemId) {
          if (this.musicReadingId === musicItem.id) {
            audio.pause();
            this.musicReadingId = null;
          } else {
            audio.play();
            this.musicReadingId = musicItem.id;
          }
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.content {
  margin-top: $navbar-height;
  padding-top: $navbar-height;
}

.page-header-image {
  height: 100%;
}

.music-list {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1024px) {
  .music-list {
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.music-item {
  min-width: 300px;

  .icon {
    vertical-align: bottom;
  }
}

.members-gallery {
  display: flex;
  flex-direction: row;
}

.markdown-body {
  font-family: $family-sans-serif;
}

.members-gallery-item {
  flex-grow: 1;

  > figure {
    display: inline-block;
    margin-bottom: 0 !important;
    border-radius: 50%;
  }

  p {
    margin-bottom: 0 !important;
  }
}
</style>