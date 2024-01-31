<template>
  <input
    placeholder="Name"
    class="firstInput"
    :style="{
      borderColor: svgColor,
      color: svgColor,
      backgroundColor: sBgrndClr,
    }"
  />
</template>

<script lang="ts">
export default {
  props: {
    svgColor: {
      type: String,
      required: true,
    },
    isLight: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      sBgrndClr: "white",
    };
  },
  watch: {
    isLight(state) {
      state ? (this.sBgrndClr = "white") : (this.sBgrndClr = "rgb(12,12,12)");
    },
  },
};
</script>
