<template>
  <header
    class="hero is-fullheight-with-navbar coverImage"
    :style="{ backgroundImage: `url(${strapiHeader.image.url}` }"
  >
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <h1 class="is-size-1">
            {{ strapiHeader.title }}
          </h1>
        </div>
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