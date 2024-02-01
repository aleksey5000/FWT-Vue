<template>
  <div class="paintings">
    <div v-for="pic in paintings" className="picBlock">
      <img
        :src="`https://test-front.framework.team${pic.imageUrl}`"
        :alt="`${pic.name}`"
      />
      <div>
        <h1>{{ pic.name }}</h1>
        <br />
        <p>
          <span>Author:</span> {{ findAuthor(pic.authorId) }} <br /><br />
          <span>Created:</span> {{ pic.created }} <br /><br />
          <span>Location:</span> {{ findLocation(pic.locationId) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TypePics from "../Types/PaintingsType";
import TypePaintings from "../Types/PaintingsComp";

export default {
  props: {
    paintings: Array<TypePics>,
  },
  data(): TypePaintings {
    return {};
  },
  methods: {
    findAuthor(id: number) {},
    findLocation(id: number) {},
  },
  watch: {},
};
</script>
