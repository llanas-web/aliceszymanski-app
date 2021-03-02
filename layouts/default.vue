<template>
  <div class="app">
    <nav
      class="navbar"
      :class="{
        'navbar-transparent': !scrollOverheader && isHomePage,
        'shadow-light': scrollOverheader && !isHomePage,
      }"
      role="navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item is-hidden-desktop">
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
            :class="{ 'is-active': isBurgerToggled }"
            v-on:click="isBurgerToggled = !isBurgerToggled"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': isBurgerToggled }">
          <div class="navbar-start">
            <nuxt-link to="/" class="navbar-item has-text-centered is-uppercase"
              >Accueil</nuxt-link
            >
            <nuxt-link
              to="/biographie"
              class="navbar-item has-text-centered is-uppercase"
              >Biographie</nuxt-link
            >
            <nuxt-link
              to="/musique-de-chambre"
              class="navbar-item has-text-centered is-uppercase"
              >Musique de chambre</nuxt-link
            >
            <nuxt-link
              to="/#medias"
              class="navbar-item has-text-centered is-uppercase"
              >Médias</nuxt-link
            >
            <nuxt-link
              to="/gallery"
              class="navbar-item has-text-centered is-uppercase"
              >Galerie</nuxt-link
            >
          </div>
          <div class="navbar-end">
            <div
              class="navbar-item"
              v-for="socialmediaLink of footer.socialmediaLink"
              :key="socialmediaLink.id"
            >
              <a :href="socialmediaLink.link" target="_blank" class="mx-2">
                <span class="icon is-medium">
                  <font-awesome-icon
                    :icon="['fab', socialmediaLink.icon.faName]"
                    class="is-size-4"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
    <footer class="footer">
      <div class="content has-text-centered">
        <div>
          <a
            v-for="socialmediaLink of footer.socialmediaLink"
            :key="socialmediaLink.id"
            :href="socialmediaLink.link"
            target="_blank"
            class="mx-2"
          >
            <span class="icon is-medium has-text-warning">
              <font-awesome-icon
                :icon="['fab', socialmediaLink.icon.faName]"
                class="is-size-4"
              />
            </span>
          </a>
        </div>
        <div class="footer-text">
          <p class="mb-0">
            Contactez Alice à
            <a :href="'mailto:' + footer.contact" class="link-dark">{{
              footer.contact
            }}</a>
            pour plus d'information
          </p>
          <p class="footer-thanks">
            Website handcrafted by
            <a href="https://github.com/llanas" target="_blank"
              >Boris MAURENCE @llanas</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import footerQuery from "~/apollo/queries/footer/footer";

export default {
  data() {
    return {
      isBurgerToggled: false,
      scrollOverheader: false,
      navbarHeight: 0,
    };
  },
  computed: {
    isHomePage() {
      return this.$nuxt.$route.path == "/";
    },
  },
  apollo: {
    footer: {
      prefetch: true,
      query: footerQuery,
    },
  },
  methods: {
    updateScroll() {
      this.scrollOverheader = window.scrollY + 80 > window.screen.height;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  destroy() {
    window.removeEventListener("scroll");
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.app {
  min-height: 100vh;
}

.navbar {
  position: fixed;
  top: 0;
  height: $navbar-height;
  width: 100%;
  font-family: $family-secondary;
  //   transition: 1s;
}

.navbar-transparent {
  background-color: #0000;

  .navbar-item {
    color: #f9f9f9;
  }
}

.navbar-start {
  flex-grow: 1;
  justify-content: center;
  text-align: center;
  gap: 3rem;
}

.navbar-item {
  justify-content: left;
}

footer {
  box-shadow: 0 0.5em 4em -0.125em rgba($scheme-invert, 0.4),
    0 0px 0 1px rgba($scheme-invert, 0.1);

  .footer-thanks {
    font-size: 0.7em;
    font-weight: lighter;
  }
}
</style>
