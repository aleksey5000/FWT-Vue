<template>
  <div
    class="created"
    :style="{
      height: sHeight,
      borderColor: svgColor,
      backgroundColor: sBgrndClr,
    }"
  >
    <div class="smallArrow">
      <p :style="{ color: svgColor }">Created</p>
      <button @click="openClose(isOpen)">
        <small-arrow :state="svgColor" />
      </button>
    </div>
    <ul>
      <li>
        <div class="inputs" :style="{ display: sDisplay }">
          <input placeholder="from" :style="{ backgroundColor: sInpClr }" />
          <hr :style="{ backgroundColor: svgColor }" />
          <input placeholder="before" :style="{ backgroundColor: sInpClr }" />
        </div>
      </li>
    </ul>
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
      isOpen: false,
      sHeight: "45px",
      sDisplay: "none",
      sInpClr: "rgb(239, 239, 239)",
      sBgrndClr: "white",
    };
  },
  methods: {
    openClose(state: boolean) {
      const wdth = window.innerWidth;
      state
        ? ((this.sDisplay = "flex"),
          wdth > 767 ? (this.sHeight = "130px") : (this.sHeight = "190px"))
        : ((this.sHeight = "45px"), (this.sDisplay = "none"));
      this.isOpen = !state;
    },
  },
  watch: {
    isLight(state) {
      state
        ? ((this.sInpClr = "rgb(239, 239, 239)"), (this.sBgrndClr = "white"))
        : ((this.sInpClr = "rgb(255, 255, 255)"),
          (this.sBgrndClr = "rgb(12,12,12)"));
    },
  },
};
</script>
