<template>
  <div class="content" v-if="!loading">
    <CustomHeader :strapi-header="home.header"></CustomHeader>
    <section id="short-bio" class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered is-vcentered">
            <div class="column is-9 has-text-centered">
              <p class="is-size-2 is-family-secondary is-uppercase">Biographie</p>
              <br />
              <p v-html="home.shortBio.content.replace(/\n/g, '<br />')"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body py-0 px-0">
        <HorizontalGallery />
        <!-- <p>Ici il y aura bientot 3 liens vers des pages que tu veux mettre en avant</p> -->
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
                <div v-if="eventHover != null" class="card">
                  <div class="card-image" v-if="eventHover.image != null">
                    <div
                      class="image is-4by3 coverImage"
                      :style="{backgroundImage: 'url(' + eventHover.image.url + ')'}"
                    ></div>
                  </div>
                  <div class="card-content">
                    <div class="media ml-5">
                      <div class="media-content">
                        <p class="title is-4">{{eventHover.title}}</p>
                        <p class="subtitle is-6">On peut mettre ici ou c'est ?</p>
                      </div>
                    </div>

                    <div class="content">
                      {{eventHover.description}}
                      <br />
                      <br />
                      <time datetime="2016-1-1">{{eventHover.formatedDate}}</time>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div class="column is-5">
              <div class="timeline is-ltr">
                <header class="timeline-header">
                  <!-- <span class="tag is-medium is-primary">...</span> -->
                </header>
                <div v-for="event in closeEvents" :key="event.id" class="timeline-item is-primary">
                  <div class="timeline-marker is-warning"></div>
                  <div class="timeline-content">
                    <div class="box" @mouseenter="eventHover = event">
                      <article class="media">
                        <div class="media-content">
                          <div class="content">
                            <p>
                              <small>{{event.formatedDate}}</small>
                              <br />
                              <strong class="is-family-secondary">{{event.title}}</strong>
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
                <!-- <div class="timeline-item is-warning">
              <div class="timeline-marker is-warning is-image is-32x32">
                <img src="https://bulma.io/images/placeholders/32x32.png" />
              </div>
              <div class="timeline-content">
                <p class="heading">February 2016</p>
                <p>Timeline content - Can include any HTML element</p>
              </div>
            </div>
            <header class="timeline-header">
              <span class="tag is-primary">2017</span>
            </header>
            <div class="timeline-item is-danger">
              <div class="timeline-marker is-danger is-icon">
                <i class="fa fa-flag"></i>
              </div>
              <div class="timeline-content">
                <p class="heading">March 2017</p>
                <p>Timeline content - Can include any HTML element</p>
              </div>
                </div>-->
                <header class="timeline-header">
                  <!-- <span class="tag is-medium is-primary">...</span> -->
                </header>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-primary is-bold is-medium">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="columns is-centered">
            <div class="column is-6">
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded has-icons-left">
                      <input class="input" type="text" placeholder="Nom" />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'user']" />
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control is-expanded has-icons-left has-icons-right">
                      <input class="input" type="email" placeholder="Email" />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                      </span>
                      <span class="icon is-small is-right">
                        <font-awesome-icon :icon="['fas', 'check']" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <textarea class="textarea" placeholder="Votre Message"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field is-grouped is-grouped-centered">
                    <div class="control">
                      <button class="button is-warning">Envoyer message</button>
                    </div>
                  </div>
                </div>
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
#short-bio {
  -webkit-box-shadow: inset 20px 20px 30px 0px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: inset 20px 20px 30px 0px rgba(0, 0, 0, 0.12);
  box-shadow: inset 20px 20px 30px 0px rgba(0, 0, 0, 0.12);
}
.navbar {
  position: absolute !important;
}
.title {
  font-family: "Expletus Sans";
}

.timeline-marker {
  top: 40% !important;
}

.timeline-content {
  width: 80%;
}
</style>
