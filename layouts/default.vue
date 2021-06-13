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
      <div class="container is-fluid">
        <div class="navbar-brand">
          <transition name="fade">
            <nuxt-link
              to="/"
              class="navbar-item brand-title"
              v-show="scrollOverheader || !isHomePage"
              ><span>Alice Szymanski</span></nuxt-link
            >
          </transition>
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
              to="/agenda"
              class="navbar-item has-text-centered is-uppercase"
              >Agenda</nuxt-link
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
      this.scrollOverheader = window.scrollY + 200 > window.screen.height;
    },
  },
  mounted() {
    if (window.innerWidth > 1024) {
      window.addEventListener("scroll", this.updateScroll);
    } else {
      this.scrollOverheader = true;
    }
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

.brand-title {
  box-shadow: none !important;
}

.navbar-brand {
  font-family: "Cinzel", serif;
  font-size: 2rem;
  .title-alice {
    color: #e6c555 !important;
  }
  .title-szymanski {
    color: #d0d0ad !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* PC */
@media screen and (min-width: 600px) {
  .navbar-transparent {
    background-color: #0000;

    .navbar-item {
      color: #f9f9f9;
    }
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

.navbar-end {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
