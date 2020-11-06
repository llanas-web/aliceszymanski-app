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
        <div class="thumb-example">
          <!-- swiper1 -->
          <swiper
            class="swiper gallery-top"
            v-swiper="swiperOptionTop"
            ref="swiperTop"
          >
            <swiper-slide class="slide-1"></swiper-slide>
            <swiper-slide class="slide-2"></swiper-slide>
            <swiper-slide class="slide-3"></swiper-slide>
            <swiper-slide class="slide-4"></swiper-slide>
            <swiper-slide class="slide-5"></swiper-slide>
          </swiper>
          <!-- swiper2 Thumbs -->
          <swiper
            class="swiper gallery-thumbs"
            :options="swiperOptionThumbs"
            ref="swiperThumbs"
            @slideChange="onThumbnailChange"
          >
            <swiper-slide class="slide-1"></swiper-slide>
            <swiper-slide class="slide-2"></swiper-slide>
            <swiper-slide class="slide-3"></swiper-slide>
            <swiper-slide class="slide-4"></swiper-slide>
            <swiper-slide class="slide-5"></swiper-slide>
          </swiper>
        </div>
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
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import homeQuery from "~/apollo/queries/home/home";
import eventsQuery from "~/apollo/queries/evenement/evenements";
import { closestIndexTo, compareAsc, format } from "date-fns";
import { fr } from "date-fns/locale";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      loading: 0,
      home: {},
      evenements: [],
      closeEvents: [],
      eventHover: null,
      eventSelected: null,
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
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

.thumb-example {
  height: 80vh;
}
.swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
    &.slide-1 {
      background-image: url("https://storage.googleapis.com/aliceszymanski-uploads/SJK_0890_4342ef4e89/SJK_0890.jpg_SJK_0890_4342ef4e89.jpg");
    }
    &.slide-2 {
      background-image: url("https://storage.googleapis.com/aliceszymanski-uploads/duo_guitare_berge_96a799c6a6/duo_guitare_berge.jpg_duo_guitare_berge_96a799c6a6.jpg");
    }
    &.slide-3 {
      background-image: url("https://storage.googleapis.com/aliceszymanski-uploads/SJK_0890_4342ef4e89/SJK_0890.jpg_SJK_0890_4342ef4e89.jpg");
    }
    &.slide-4 {
      background-image: url("https://storage.googleapis.com/aliceszymanski-uploads/duo_guitare_berge_96a799c6a6/duo_guitare_berge.jpg_duo_guitare_berge_96a799c6a6.jpg");
    }
    &.slide-5 {
      background-image: url("https://storage.googleapis.com/aliceszymanski-uploads/SJK_0890_4342ef4e89/SJK_0890.jpg_SJK_0890_4342ef4e89.jpg");
    }
  }
  &.gallery-top {
    height: 80%;
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
