<template>
  <div class="content">
    <section
      class="hero is-fullheight coverImage"
      :style="{backgroundImage: `url(${home.cover.url}`}"
    >
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-one-third is-offset-7 is-hidden-mobile">
              <div class="box">
                <p class="title is-size-1 is-size-3-mobile has-text-centered has-text-warning">Alice</p>
                <p
                  class="title is-size-1 is-size-3-mobile has-text-centered has-text-grey"
                >SZYMANSKI</p>
                <div class="divider"></div>
                <h2
                  class="subtitle is-size-6 has-text-grey"
                  v-html="home.description.replace(/\n/g, '<br />')"
                ></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered is-vcentered">
            <div class="column is-7">
              <p v-html="home.bio.replace(/\n/g, '<br />')"></p>
            </div>
            <div class="column is-3">
              <figure class="image">
                <img class="is-rounded" :src="home.bioPhoto.formats.small.url" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body py-0 px-0">
        <VerticalPresentation />
        <!-- <p>Ici il y aura bientot 3 liens vers des pages que tu veux mettre en avant</p> -->
      </div>
    </section>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="timeline is-centered">
            <header class="timeline-header">
              <!-- <span class="tag is-medium is-primary">...</span> -->
            </header>
            <div v-for="event in closeEvents" :key="event.id" class="timeline-item is-primary">
              <div class="timeline-marker is-warning"></div>
              <div class="timeline-content">
                <p class="heading">{{event.formatedDate}}</p>
                <p>{{event.title}}</p>
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
    </section>
    <section class="hero is-primary is-bold is-medium">
      <div class="hero-body">
        <div class="container is-fluid">
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
      home: {},
      evenements: [],
      closeEvents: [],
    };
  },
  apollo: {
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

<style>
.title {
  font-family: "Expletus Sans";
}
</style>
