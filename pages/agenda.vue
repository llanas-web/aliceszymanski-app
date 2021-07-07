<template>
  <div class="content is-widescreen mt-6">
    <div class="hero is-fullheight">
      <div class="container p-6">
        <div class="timeline-column">
          <div class="timeline is-ltr">
            <header class="timeline-header">
              <!-- <span class="tag is-medium is-primary">...</span> -->
            </header>
            <div
              v-for="events of listEventsByYear"
              :key="events[0]"
              class="timeline-item is-primary"
            >
              <div class="timeline-marker is-warning"></div>
              <div class="timeline-content">
                <p class="anchor-link" @click="scrollToAnchor(events[0])">{{ events[0] }}</p>
              </div>
            </div>
            <header class="timeline-header"></header>
          </div>
        </div>
          <div class="list-events">
            <section
              v-for="events of listEventsByYear"
              :key="events[0]"
              class="section is-medium"
              :id="events[0]"
            >
              <p class="is-size-3 is-family-secondary has-text-left">
                Année {{ events[0] }}
              </p>
              <div
                v-for="(event, index) of events[1]"
                :key="event.id"
                class="card"
              >
                <div class="card-content">
                  <div
                    v-if="event.image"
                    class="media-image coverImage shadow-light"
                    :style="{
                      backgroundImage: 'url(' + event.image.url + ')',
                    }"
                  ></div>
                  <div>
                    <div class="media-content">
                      <p class="title is-4">{{ event.title }}</p>
                      <p v-if="event.endFormatedDate && event.endFormatedDate != event.startFormatedDate" class="subtitle is-6">{{ event.startFormatedDate }} - {{ event.endFormatedDate }}</p>
                      <p v-else class="subtitle is-6">{{ event.startFormatedDate }}</p>
                    </div>

                    <vue-simple-markdown
                      :source="event.description"
                    ></vue-simple-markdown>
                  </div>
                </div>
                  <div v-if="event.cancelled" class="cancelled-tag">
                      <span class="tag is-warning">Annulé</span>
                  </div>
                <div v-if="events[1].length - 1 != index" class="divider"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { fr } from "date-fns/locale";
export default {
  data() {
    return {
      listEventsByYear: [],
    };
  },
  methods: {
    scrollToAnchor: function (anchor) {
      let e = document.getElementById(anchor);
      e.scrollIntoView({
        block: "start",
        behavior: "smooth",
        inline: "start",
      });
    },
  },
  async fetch() {
    let evenementsByYears = new Map();
    let listEvents = await this.$axios.$get("/evenements");
    listEvents
      .sort(
        (a, b) =>
          new Date(b.starting).getTime() - new Date(a.starting).getTime()
      )
      .forEach((event) => {
        event.startFormatedDate = format(new Date(event.starting), "d MMMM Y", {
          locale: fr,
        });
        if (event.ending) {
          event.endFormatedDate = format(new Date(event.ending), "d MMMM Y", {
            locale: fr,
          });
        }
        const eventYear = new Date(event.starting).getFullYear();
        if (!evenementsByYears.has(eventYear)) {
          evenementsByYears.set(eventYear, [event]);
        } else {
          evenementsByYears.get(eventYear).push(event);
        }
      });
    this.listEventsByYear = Array.from(evenementsByYears).sort(
      (a, b) => b[0] - a[0]
    );
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
.content {
  margin-top: $navbar-height;
  padding-top: $navbar-height;
}

@media screen and (min-width: 1024px) {
  .timeline-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    position: fixed;
    height: 80%;
  }
  .list-events {
    margin-left: 20%;
  }
}

@media screen and (max-width: 1024px) {
  .media-image {
    display: none;
  }
  .timeline-column {
    display: none;
  }
  .list-events {
    margin-left: 0;
  }
  .container {
    max-width: 100%;
  }
}

.anchor-link {
  cursor: pointer;
}

.card-content {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  height: 100%;
  width: 90%;
}

.cancelled-tag {
  position: absolute;
  margin: 1rem;
  top: 0;
  right: 0;
}

.media-image {
  min-width: 20%;
  height: auto;
  width: 20%;
  position: relative;
  margin-right: 2rem;
}
</style>