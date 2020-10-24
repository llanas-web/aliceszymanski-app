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
    <div class="container px-6">
      <section
        v-for="(page, index) in musiqueDeChambre.pages"
        :key="page.id"
        class="section"
        :id="page.url"
      >
        <section class="my-6 columns is-6 is-centered">
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
        <section class="hero my-6 px-6">
          <div class="members-gallery">
            <div class="members-gallery-item has-text-centered">
              <figure class="image is-128x128 shadow-semibold">
                <img class="is-rounded" src="~/assets/img/julie.jpeg" alt="" />
              </figure>
              <p class="is-size-4 has-text-weight-semibold">Julie</p>
              <p class="is-size-6">Flutiste</p>
            </div>
            <div class="members-gallery-item has-text-centered">
              <figure class="image is-128x128 shadow-semibold">
                <img class="is-rounded" src="~/assets/img/julie.jpeg" alt="" />
              </figure>
              <p class="is-size-4 has-text-weight-semibold">Julie</p>
              <p class="is-size-6">Flutiste</p>
            </div>
            <div class="members-gallery-item has-text-centered">
              <figure class="image is-128x128 shadow-semibold">
                <img class="is-rounded" src="~/assets/img/julie.jpeg" alt="" />
              </figure>
              <p class="is-size-4 has-text-weight-semibold">Julie Laflute</p>
              <p class="is-size-6">Flutiste</p>
            </div>
          </div>
        </section>
        <section class="hero my-6 px-6 has-text-centered">
          <div>
            <iframe
              width="100%"
              height="350"
              scrolling="yes"
              frameborder="no"
              allow="autoplay"
              show_artwork="true"
              src="https://w.soundcloud.com/player/?url=https://soundcloud.com/trio_zerline/tracks&auto_play=false&buying=false&liking=false&download=false&sharing=false&show_artwork=false&show_comments=false&show_playcount=false&show_user=true&hide_related=true&visual=false&start_track=0&callback=true"
            >
            </iframe>
          </div>
        </section>
        <div
          v-if="musiqueDeChambre.pages.length - 1 != index"
          class="divider"
        ></div>
      </section>
    </div>
  </div>
</template>

<script>
import musiqueDeChambreQuery from "~/apollo/queries/musique-de-chambre/musique-de-chambre";
import "vue-simple-markdown/dist/vue-simple-markdown.css";

export default {
  data() {
    return {
      musiqueDeChambre: {},
    };
  },
  apollo: {
    musiqueDeChambre: {
      prefetch: true,
      query: musiqueDeChambreQuery,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.page-header-image {
  height: 100%;
}

.members-gallery {
  display: flex;
  flex-direction: row;
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