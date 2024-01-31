<template>
  <div
    class="list"
    :style="{
      borderColor: svgColor,
      color: svgColor,
      backgroundColor: sBgrndClr,
    }"
  >
    <div class="inp">
      <input placeholder="Locations" />
      <button>
        <small-arrow :state="svgColor" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import SmallArrow from "../components/svg/SmallArrow.vue";

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
  components: {
    SmallArrow,
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
