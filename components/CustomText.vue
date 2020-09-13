<template>
  <vue-simple-markdown
    :source="content.text"
    :class="{
          'has-text-justified'  : isJustified,
          'has-text-centered'   : isCentered
    }"
  ></vue-simple-markdown>
</template>

<script>
export default {
  name: "CustomText",
  props: ["content", "isJustified", "isCentered"],
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.markdown-body {
  font-family: $family-sans-serif;
}

.has-text-justified {
  text-justify: inter-word;
}
</style>