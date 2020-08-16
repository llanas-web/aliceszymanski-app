<template>
  <div class="container">
    <vue-simple-markdown :source="bio"></vue-simple-markdown>
  </div>
</template>

<script>
import bioQuery from "~/apollo/queries/bio/bio";

export default {
  data() {
    return {
      bio: {},
    };
  },
  apollo: {
    bio: {
      prefetch: true,
      query: bioQuery,
    },
  },
};
</script>

<style>
</style>