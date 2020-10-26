<template>
  <div class="content" v-if="!loading">
    <header
      class="hero is-fullheight"
      :style="{ backgroundImage: `url(${home.header.image.url})` }"
    >
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div
              class="column is-half has-text-right header-text is-hidden-touch"
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
        <FlexGallery
          v-if="home.musiqueDeChambreGallery != null"
          :gallery-list-items="home.musiqueDeChambreGallery"
        />
      </div>
    </section>
    <section class="hero is-medium">
      <div class="hero-body">
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
            <div class="column is-5">
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
import homeQuery from "~/apollo/queries/home/home";
import eventsQuery from "~/apollo/queries/evenement/evenements";
import { closestIndexTo, compareAsc, format } from "date-fns";
import { fr } from "date-fns/locale";

export default {
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

.timeline-content {
  width: 80%;
}
</style>
