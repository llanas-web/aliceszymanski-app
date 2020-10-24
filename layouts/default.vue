<template>
  <div class="app">
    <nav class="navbar is-transparent shadow-light" role="navigation">
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
            <nuxt-link to="/" class="navbar-item has-text-centered"
              >Accueil</nuxt-link
            >
            <nuxt-link to="/biographie" class="navbar-item"
              >Biographie</nuxt-link
            >
            <nuxt-link to="/musique-de-chambre" class="navbar-item"
              >Musique de chambre</nuxt-link
            >
            <a class="navbar-item">Contact</a>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
    <footer></footer>
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
  width: 100%;
  font-family: $family-secondary;
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
