<template>
  <div class="app">
    <nav class="navbar" role="navigation">
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
                <a class="navbar-item">Trio Zerline</a>
                <a class="navbar-item">Duo Baroque</a>
                <a class="navbar-item">Duo Flute et Guitare</a>
              </div>
            </div>
            <a class="navbar-item">Calendrier</a>
            <a class="navbar-item">Contact</a>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
    <footer class="footer">
      <div class="content has-text-white has-text-centered">
        <p>@llanas-web</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBurgerToggled: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";
.app {
  min-height: 100vh;
}
.navbar {
  //   position: absolute !important;
  width: 100%;
  //   background-image: linear-gradient(
  //     180deg,
  //     rgba(255, 255, 255, 1) 0%,
  //     rgba(255, 255, 255, 0.65) 65%,
  //     rgba(0, 212, 255, 0) 100%
  //   );
}

.navbar-start {
  flex-grow: 1;
  justify-content: center;
  text-align: center;
}

.navbar-item {
  min-width: 180px;
}
</style>
