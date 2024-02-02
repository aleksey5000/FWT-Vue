<template>
  <div class="paintings">
    <div v-for="pic in paintings" className="picBlocks">
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
import TypeAuthor from "../Types/AuthorType";
import TypeLocation from "../Types/LocationType";
import useStore from "../store/store";

export default {
  props: {
    paintings: Array<TypePics>,
  },
  data(): TypePaintings {
    return {
      store: useStore(),
    };
  },
  methods: {
    findAuthor(id: number) {
      const author: TypeAuthor | undefined = this.store.authors.find(
        (elem: TypeAuthor) => elem.id == id,
      );
      return author?.name;
    },
    findLocation(id: number) {
      const location: TypeLocation | undefined = this.store.locations.find(
        (elem: TypeLocation) => elem.id == id,
      );
      return location?.location;
    },
  },
  watch: {},
};
</script>
