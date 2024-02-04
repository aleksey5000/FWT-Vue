<template>
  <div class="container">
    <header>
      <div>
        <img src="../public/logo.svg" alt="logo was here" />
      </div>
      <div>
        <button @click="changeTheme(isLight)">
          <sun :color="sunColor" />
        </button>
      </div>
    </header>
    <main>
      <div class="filters">
        <first-input :svgColor="sunColor" :isLight="isLight" />
        <authors :svgColor="sunColor" :isLight="isLight" />
        <locations :svgColor="sunColor" :isLight="isLight" />
        <created :svgColor="sunColor" :isLight="isLight" />
      </div>
      <pic-block :svgColor="sunColor" :isLight="isLight" />
    </main>
  </div>
</template>

<script lang="ts">
import sun from "./components/svg/sun.vue";
import FirstInput from "./components/FirstInput.vue";
import Authors from "./components/Authors.vue";
import Locations from "./components/Locations.vue";
import Created from "./components/Created.vue";
import PicBlock from "./components/PicBlock.vue";

export default {
  components: {
    sun,
    FirstInput,
    Authors,
    Locations,
    Created,
    PicBlock,
  },
  data() {
    return {
      sunColor: "black",
      isLight: true,
    };
  },
  methods: {
    changeTheme(state: boolean) {
      state
        ? ((document.body.style.backgroundColor = "black"),
          (this.sunColor = "white"))
        : ((document.body.style.backgroundColor = "white"),
          (this.sunColor = "black"));
      this.isLight = !state;
    },
  },
};
</script>
