<template>
  <section class="hero is-medium">
    <div
      class="hero-body px-1"
      :class="[
        (Number(paddingY) != NaN) ? 'py-' + paddingY : '',
        (Number(paddingX) != NaN) ? 'px-' + paddingX : '',
    ]"
    >
      <div class="container">
        <div>
          <div v-if="strapiTextZone.title">
            <p
              class="is-size-2 is-family-secondary is-uppercase"
              :class="{
                  'has-text-centered' : strapiTextZone.isJustified,
                'has-text-centered' : strapiTextZone.isCentered
                }"
            >{{strapiTextZone.title}}</p>
            <br />
          </div>
        </div>
        <div>
          <div v-if="strapiTextZone.displayAsColumn" class="columns is-centered">
            <div
              v-for="content in strapiTextZone.listContents"
              :key="content.id"
              :class="'column is-' + (12 - (10 % strapiTextZone.listContents.length)) / strapiTextZone.listContents.length"
            >
              <CustomText
                :content="content"
                :isJustified="strapiTextZone.isJustified"
                :isCentered="strapiTextZone.isCentered"
              ></CustomText>
            </div>
          </div>
          <div v-else>
            <div v-for="content in strapiTextZone.listContents" :key="content.id">
              <CustomText
                :content="content"
                :isJustified="strapiTextZone.isJustified"
                :isCentered="strapiTextZone.isCentered"
              ></CustomText>
            </div>
          </div>
        </div>
        <div v-if="strapiTextZone.medias" class="columns is-centered is-vcentered">
          <div
            v-for="media in strapiTextZone.medias"
            :key="media.id"
            :class="'column is-' + (12 - (10 % strapiTextZone.medias.length)) / strapiTextZone.medias.length"
          >
            <!-- Image -->
            <div v-if="media.mime === 'image/png' || media.mime === 'image/jpeg'">
              <div
                class="image is-4by3 coverImage"
                :style="{backgroundImage: 'url(' + media.url + ')'}"
              ></div>
            </div>
            <!-- PDF -->
            <div v-else-if="media.mime === 'application/pdf'" class="has-text-centered">
              <a
                :href="media.url"
                target="_blank"
                class="button is-yellow is-outlined is-medium"
              >{{media.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CustomTextZone",
  props: ["strapi-text-zone", "padding-y", "padding-x"],
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

@media screen and (max-witdh: $mobile) {
  .container {
    padding: 0 2rem !important;
  }
}
</style>