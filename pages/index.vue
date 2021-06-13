<template>
  <div class="content" v-if="!loading">
    <header
      class="hero is-fullheight coverImage"
      :style="{ backgroundImage: `url(${home.header.image.url})` }"
    >
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div
              data-aos="fade-up"
              class="column is-half header-text is-hidden-touch"
            >
              <p>
                <span class="title-alice">Alice</span><br /><span
                  class="title-szymanski"
                >
                  SZYMANSKI
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <CustomTextZone :strapi-text-zone="home.shortBio"></CustomTextZone>
    <section class="hero">
      <div class="hero-body py-0 px-0">
        <div class="has-text-centered mb-6">
          <p class="is-size-2 is-family-secondary is-uppercase">
            Musique de chambre
          </p>
        </div>
        <FlexGallery
          v-if="home.musiqueDeChambreGallery != null"
          :gallery-list-items="home.musiqueDeChambreGallery"
        />
      </div>
    </section>
    <section id="medias" class="hero is-medium">
      <div class="hero-body">
        <div class="has-text-centered">
          <p class="is-size-2 is-family-secondary is-uppercase">Médias</p>
        </div>
        <MediaCarousel></MediaCarousel>
      </div>
    </section>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="has-text-centered mb-2">
          <p class="is-size-2 is-family-secondary is-uppercase">
            Liste évènements
          </p>
        </div>
        <div class="container is-fluid">
          <div class="columns is-centered">
            <div class="column is-4">
              <transition
                name="event-card"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
              >
                <CustomEventCard v-if="eventHover" :strapi-event="eventHover" />
              </transition>
            </div>
            <div class="column is-4">
              <div class="timeline is-ltr">
                <header class="timeline-header">
                  <!-- <span class="tag is-medium is-primary">...</span> -->
                </header>
                <div
                  v-for="event in closeEvents"
                  :key="event.id"
                  class="timeline-item is-primary"
                >
                  <div class="timeline-marker is-warning"></div>
                  <div class="timeline-content">
                    <div class="box" @mouseenter="eventHover = event">
                      <article class="media">
                        <div class="media-content">
                          <div class="content">
                            <p>
                              <small>{{ event.formatedDate }}</small>
                              <br />
                              <strong class="is-family-secondary">{{
                                event.title
                              }}</strong>
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
                <header class="timeline-header"></header>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import homeQuery from "~/apollo/queries/home/home";
import eventsQuery from "~/apollo/queries/evenement/evenements";
import { closestIndexTo, format } from "date-fns";
import { fr } from "date-fns/locale";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async fetch() {
    let home = await this.$axios.$get("/home");
    this.metadata = home.metadata;
    console.log("test METADATA" + this.metadata);
  },
  head() {
    if (this.metadata) {
      return {
        title: "Alice Szymanski - Accueil",
        meta: [
          {
            hid: "title",
            name: "title",
            content: this.metadata.title,
          },
          {
            hid: "description",
            name: "description",
            content: this.metadata.description,
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.metadata.keywords,
          },
        ],
      };
    }
  },
  data() {
    return {
      loading: 0,
      home: {},
      evenements: [],
      closeEvents: [],
      eventHover: null,
      eventSelected: null,
    };
  },
  apollo: {
    $loadingKey: "loading",
    home: {
      prefetch: true,
      query: homeQuery,
    },
    evenements: {
      prefetch: true,
      query: eventsQuery,
      result(response) {
        const today = new Date();
        // Clone des evenements
        const listEvents = response.data.evenements.slice();
        const eventsStartingDate = listEvents.map(
          (event) => new Date(event.starting)
        );
        const closestIndex = closestIndexTo(today, eventsStartingDate);
        if (closestIndex < 3) {
          this.closeEvents = listEvents.slice(0, 5);
        } else if (closestIndex >= listEvents.lengt + 2) {
          this.closeEvents = listEvents.slice(listEvents.length - 5);
        } else {
          this.closeEvents = listEvents.slice(
            closestIndex - 2,
            closestIndex + 2
          );
        }
        this.closeEvents.forEach(
          (event) =>
            (event.formatedDate = format(new Date(event.starting), "d MMMM Y", {
              locale: fr,
            }))
        );
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/main.scss";

header {
  position: relative;

  .header-background {
    position: absolute;
  }
}

#short-bio {
  -webkit-box-shadow: inset 20px 20px 30px 0px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: inset 20px 20px 30px 0px rgba(0, 0, 0, 0.12);
  box-shadow: inset 20px 20px 30px 0px rgba(0, 0, 0, 0.12);
}

.title {
  font-family: "Expletus Sans";
}
.header-text {
  font-family: "Cinzel", serif;
  font-size: 5rem !important;
  .title-alice {
    color: #e6c555 !important;
  }
  .title-szymanski {
    color: #d0d0ad !important;
  }
}

.timeline-marker {
  top: 40% !important;
}
</style>
