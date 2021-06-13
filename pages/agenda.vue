<template>
  <div class="content is-widescreen mt-6">
    <div class="hero is-fullheight">
      <div class="container p-6">
        <section
          v-for="events of listEventsByYear"
          :key="events[0]"
          class="section is-medium"
        >
          <p class="is-size-3 is-family-secondary has-text-left">
            Année {{ events[0] }}
          </p>
          <div v-for="(event, index) of events[1]" :key="event.id" class="card">
            <div class="card-content">
              <div
                v-if="event.image"
                class="media-image coverImage shadow-light"
                :style="{
                  height: '100%',
                  backgroundImage: 'url(' + event.image.url + ')',
                }"
              ></div>
              <div>
                <div class="media-content">
                  <p class="title is-4">{{ event.title }}</p>
                  <p class="subtitle is-6">{{ event.formatedDate }}</p>
                </div>

                <vue-simple-markdown
                  :source="event.description"
                ></vue-simple-markdown>
              </div>
            </div>
            <div v-if="events[1].length - 1 != index" class="divider"></div>
          </div>
        </section>
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
  async fetch() {
    let evenementsByYears = new Map();
    let listEvents = await this.$axios.$get("/evenements");
    listEvents.forEach((event) => {
      event.formatedDate = format(new Date(event.starting), "d MMMM Y", {
        locale: fr,
      });
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
    console.log(this.listEventsByYear);
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
.content {
  margin-top: $navbar-height;
  padding-top: $navbar-height;
}

.card-content {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  height: 100%;
}

.media-image {
  height: auto;
  width: 20%;
  position: relative;
  margin-right: 2rem;
}
</style>