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
        <small-arrow :color="svgColor" />
      </button>
    </div>
    <div class="inputs" :style="{ display: sDisplay }">
      <div :style="{ backgroundColor: sInpClr }" class="smallInput">
        <input
          placeholder="from"
          v-model="from"
          type="number"
          @keydown.enter="changeFrom"
        />
        <button v-if="isTextFrom" @click="from = ''"><union /></button>
        <button v-if="isTextFrom" @click="changeFrom">
          <arrR color="#555555" :state="false" />
        </button>
      </div>
      <hr :style="{ backgroundColor: svgColor }" />
      <div class="smallInput" :style="{ backgroundColor: sInpClr }">
        <input
          placeholder="before"
          v-model="before"
          type="number"
          @keydown.enter="changeBefore"
        />
        <button v-if="isTextBefore" @ckick="before = ''"><union /></button>
        <button v-if="isTextBefore" @click="changeBefore">
          <arrR color="#555555" :state="false" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SmallArrow from "../components/svg/SmallArrow.vue";
import TypeCrComp from "../Types/CreatedComp";
import Union from "./svg/Union.vue";
import arrR from "./svg/arrR.vue";
import useStore from "../store/store";

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
    Union,
    arrR,
  },
  data(): TypeCrComp {
    return {
      isOpen: false,
      isTextFrom: false,
      isTextBefore: false,
      from: "",
      before: "",
      sHeight: "45px",
      sDisplay: "none",
      sInpClr: "rgb(239, 239, 239)",
      sBgrndClr: "white",
      store: useStore(),
    };
  },
  methods: {
    openClose(state: boolean) {
      const wdth = window.innerWidth;
      state
        ? ((this.sDisplay = "flex"),
          wdth > 1023 ? (this.sHeight = "130px") : (this.sHeight = "190px"))
        : ((this.sHeight = "45px"), (this.sDisplay = "none"));
      this.isOpen = !state;
    },
    changeFrom() {
      if (this.from != "") {
        this.store.params.created_gte = Number(this.from);
      }
    },
    changeBefore() {
      if (this.from != "") {
        this.store.params.created_lte = Number(this.before);
      }
    },
  },
  watch: {
    isLight(state) {
      state
        ? ((this.sInpClr = "rgb(239, 239, 239)"), (this.sBgrndClr = "white"))
        : ((this.sInpClr = "rgb(255, 255, 255)"),
          (this.sBgrndClr = "rgb(12,12,12)"));
    },
    from(newValue: string) {
      if (newValue == "") {
        delete this.store.params.created_gte;
        this.isTextFrom = false;
      } else {
        this.isTextFrom = true;
      }
    },
    before(newValue: string) {
      if (newValue == "") {
        delete this.store.params.created_lte;
        this.isTextBefore = false;
      } else {
        this.isTextBefore = true;
      }
    },
  },
};
</script>
