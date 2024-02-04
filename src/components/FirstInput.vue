<template>
  <div
    class="firstInput"
    :style="{
      borderColor: svgColor,
      backgroundColor: sBgrndClr,
    }"
  >
    <input
      placeholder="Name"
      v-model="inpValue"
      @keydown.enter="changeName"
      :style="{
        color: svgColor,
        backgroundColor: sBgrndClr,
      }"
    />
    <button v-if="isText" @click="inpValue = ''" class="x">
      <union />
    </button>
    <button v-if="isText" @click="changeName">
      <arrR :color="svgColor" :state="false" />
    </button>
  </div>
</template>

<script lang="ts">
import useStore from "../store/store";
import TypeFirstInput from "../Types/firstiInputType";
import arrR from "./svg/arrR.vue";
import Union from "./svg/Union.vue";

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
    arrR,
    Union,
  },
  data(): TypeFirstInput {
    return {
      isText: false,
      sBgrndClr: "white",
      inpValue: "",
      store: useStore(),
    };
  },
  methods: {
    changeName() {
      if (this.inpValue != "Name" && this.inpValue != "") {
        this.store.params.name_like = this.inpValue;
      }
    },
  },
  watch: {
    inpValue(newValue: string) {
      if (newValue == "Name" || newValue == "") {
        delete this.store.params.name_like;
        this.isText = false;
      } else {
        this.isText = true;
      }
    },
    isLight(state) {
      state ? (this.sBgrndClr = "white") : (this.sBgrndClr = "rgb(12,12,12)");
    },
  },
};
</script>
