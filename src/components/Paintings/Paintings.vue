<template>
  <div class="paintings" v-if="paintings?.length != 0">
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
  <div v-else>Paintings not found</div>
</template>

<script lang="ts">
import TypePics from "../Paintings/TypePaintings";
import TypePaintings from "../Paintings/TypePaintingsComponent";
import TypeAuthor from "../AuthorSelect/TypeAuthor";
import TypeLocation from "../LocationSelect/TypeLocation";
import useStore from "../../store/store";

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
};
</script>

<style>
.picBlocks img {
  width: 100%;
  height: 100%;
  z-index: 0;
}
.picBlocks div {
  padding: 5px 0 0 15px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.75);
  color: black;
  z-index: 1;
  width: 100%;
  height: 145px;
  bottom: 30px;
}
.picBlocks div h1 {
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
}
.picBlocks div span {
  font-weight: 500;
}
.picBlocks div:hover {
  bottom: 145px;
}
</style>
