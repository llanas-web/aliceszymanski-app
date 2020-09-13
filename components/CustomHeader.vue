<template>
  <header
    v-if="strapiHeader != undefined"
    class="hero is-fullheight-with-navbar coverImage"
    :style="{backgroundImage: `url(${strapiHeader.image.url}`}"
  >
    <div class="hero-body">
      <div class="container">
        <div class="columns"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "CustomHeader",
  props: ["strapi-header"],
};
</script>

<style>
</style>