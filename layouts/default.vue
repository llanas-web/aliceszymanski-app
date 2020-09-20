<template>
  <div class="app">
    <nav class="navbar is-transparent" role="navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item is-hidden-tablet">
            <p>
              Alice
              <i>SZYMANSKI</i>
            </p>
          </a>
          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            :class="{'is-active': isBurgerToggled}"
            v-on:click="isBurgerToggled = !isBurgerToggled"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu" :class="{'is-active': isBurgerToggled}">
          <div class="navbar-start">
            <nuxt-link to="/" class="navbar-item has-text-centered">Accueil</nuxt-link>
            <nuxt-link to="/biographie" class="navbar-item">Biographie</nuxt-link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link is-arrowless">Musique de chambre</a>
              <div class="navbar-dropdown">
                <nuxt-link
                  v-for="page in pages"
                  :key="page.id"
                  class="navbar-item"
                  :to="{ name: 'musique-de-chambre-url', params: { url: page.url, selected: page }}"
                >{{page.title}}</nuxt-link>
              </div>
            </div>
            <a class="navbar-item">Calendrier</a>
            <a class="navbar-item">Contact</a>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
import pagesQuery from "~/apollo/queries/page/pages";

export default {
  data() {
    return {
      pages: [],
      isBurgerToggled: false,
    };
  },
  apollo: {
    pages: {
      prefetch: true,
      query: pagesQuery,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
.app {
  min-height: 100vh;
}
.navbar {
  width: 100%;
}

.navbar-start {
  flex-grow: 1;
  justify-content: center;
  text-align: center;
}

.navbar-item {
  min-width: 180px;
  justify-content: center;
}
</style>
