<template>
  <div class="container">
    <header>
      <div>
        <img src="../public/logo.svg" alt="logo was here" />
      </div>
      <div>
        <button @click="changeTheme(isLight)">
          <sun />
        </button>
      </div>
    </header>
    <main>
      <div class="filters">
        <name-input-component />
        <author-select :isLight="isLight" />
        <location-select :isLight="isLight" />
        <created-component />
      </div>
      <paintings-with-pagination-component :isLight="isLight" />
    </main>
  </div>
</template>

<script lang="ts">
import "./App.scss";
import Sun from "./components/svg/Sun.vue";
import NameInputComponent from "./components/NameInputComponent/NameInputComponent.vue";
import AuthorSelect from "./components/AuthorSelect/AuthorSelect.vue";
import LocationSelect from "./components/LocationSelect/LocationSelect.vue";
import CreatedComponent from "./components/CreatedComponent/CreatedComponent.vue";
import PaintingsWithPaginationComponent from "./components/PaintingsWithPaginationComponent/PaintingsWithPaginationComponent.vue";

export default {
  components: {
    Sun,
    NameInputComponent,
    AuthorSelect,
    LocationSelect,
    CreatedComponent,
    PaintingsWithPaginationComponent,
  },
  data() {
    return {
      sunColor: "black",
      isLight: true,
    };
  },
  methods: {
    changeTheme(state: boolean) {
      this.isLight = !state;
      document.body.setAttribute("data-isLight", `${this.isLight}`);
      state ? (this.sunColor = "white") : (this.sunColor = "black");
    },
  },
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 13px;
  margin: auto;
}
.container {
  border-bottom: none;
  max-width: 1120px;
  max-height: 100%;
  margin: auto;
  position: relative;
}
header {
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.filters {
  display: flex;
  align-items: top;
  margin-top: 35px;
}
</style>
