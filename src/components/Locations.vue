<template>
  <div
    class="list"
    :style="{
      borderColor: svgColor,
      color: svgColor,
      backgroundColor: sBgrndClr,
      borderBottomLeftRadius: sBorderRadus,
      borderBottomRightRadius: sBorderRadus,
      borderBottomColor: sBorderColor,
    }"
  >
    <div class="inp">
      <input
        placeholder="Location"
        v-model="inpValue"
        :style="{
          color: svgColor,
        }"
      />
      <div v-if="inpValue.length > 27">...</div>
      <button
        v-if="inpValue != 'Location' && inpValue != ''"
        class="x"
        @click="inpValue = ''"
      >
        <union />
      </button>
      <button @click="openClose(isOpen)">
        <small-arrow :color="svgColor" />
      </button>
    </div>
    <div
      class="listBlock"
      :style="{
        borderWidth: sBorderWidth,
        borderColor: svgColor,
      }"
      v-if="isSuccess && !notFound"
    >
      <ul
        class="authorList"
        :style="{
          height: `${45 * count}px`,
        }"
        id="locList"
        @scroll="ulScroll(isOpen)"
      >
        <li
          v-for="loc in visibleLocations"
          :key="loc.location"
          class="item"
          @mouseover="liMOver($event)"
          @mouseout="liMOut($event)"
          @click="liClick($event)"
          :style="{
            backgroundColor: sBgrndClr,
            color: svgColor,
          }"
        >
          {{ loc.location }}
        </li>
      </ul>
      <ul
        class="spaceList"
        :style="{
          height: `${45 * count}px`,
          bottom: `${sYPosition}px`,
        }"
      >
        <li
          v-for="loc in visibleLocations"
          :key="loc.location"
          class="item"
          :id="`space: ${loc.location}`"
          :style="{
            backgroundColor: sBgrndClr,
            color: svgColor,
          }"
        >
          {{ "" }}
        </li>
      </ul>
    </div>
    <div
      class="notSuccess"
      :style="{
        borderColor: svgColor,
      }"
      v-else-if="!isSuccess && isOpen"
    >
      Location list didn't loaded yet
    </div>
    <div
      class="notSuccess"
      :style="{
        borderColor: svgColor,
        borderTopColor: sBorderColor,
      }"
      v-else-if="notFound"
    >
      Location didn't found
    </div>
  </div>
</template>

<script lang="ts">
import TypeLocation from "../Types/LocationType";
import TypeLocComp from "../Types/LocComp";
import SmallArrow from "../components/svg/SmallArrow.vue";
import Union from "../components/svg/Union.vue";
import axios from "axios";
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
  },
  data(): TypeLocComp {
    return {
      locations: [],
      visibleLocations: [],
      isSuccess: false,
      isOpen: false,
      notFound: false,
      isChosen: false,
      sBgrndClr: "white",
      sDisplay: "none",
      count: 0,
      sBorderRadus: "8px",
      sBorderColor: "black",
      sBorderWidth: "0px",
      sLiback: "white",
      sLiClr: "black",
      sYPosition: 0,
      liPos: 0,
      inpValue: "Location",
      store: useStore(),
    };
  },
  methods: {
    async getLocations() {
      try {
        const response = await axios.get(
          "https://test-front.framework.team/locations",
        );
        const data: TypeLocation[] = response.data;
        this.locations = data;
        this.visibleLocations = data;
        this.isSuccess = true;
        this.store.locations = data;
      } catch (e) {
        alert("Error: Locations list didn't loaded");
      }
    },
    get1stLiPos() {
      const a = document.getElementById("locList");
      let b: number = 0;
      a && (b = a.children[0].getBoundingClientRect().y);
      this.liPos = b;
    },
    openClose(state: boolean) {
      state
        ? ((this.count = 0),
          (this.isOpen = false),
          (this.sBorderRadus = "8px"),
          (this.sBorderWidth = "0px"),
          this.isLight
            ? (this.sBorderColor = "black")
            : (this.sBorderColor = "white"))
        : (this.visibleLocations.length > 7
            ? (this.count = 7)
            : (this.count = this.visibleLocations.length),
          (this.isOpen = true),
          (this.sBorderRadus = "0px"),
          (this.sBorderWidth = "1px"),
          (this.sBorderColor = "grey"));
    },
    liMOver(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      a &&
        a.style &&
        ((a.style.backgroundColor = this.svgColor),
        (a.style.color = this.sBgrndClr));
      const b = document.getElementById(`space: ${a?.innerText}`);
      b && (b.style.backgroundColor = this.svgColor);
    },
    liMOut(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      a &&
        a.style &&
        ((a.style.backgroundColor = this.sBgrndClr),
        (a.style.color = this.svgColor));
      const b = document.getElementById(`space: ${a?.innerText}`);
      b && (b.style.backgroundColor = this.sBgrndClr);
      b && b.getBoundingClientRect();
    },
    ulScroll(state: boolean) {
      let a: HTMLElement | null;
      let b: number = 0;
      state
        ? ((a = document.getElementById("locList")),
          a && (b = this.liPos - a.children[0].getBoundingClientRect().top),
          (this.sYPosition = b))
        : (this.sYPosition = 0);
    },
    liClick(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      a && a.innerText && (this.inpValue = a.innerText);
      this.count = 0;
      this.openClose(this.isOpen);
      this.isChosen = true;
    },
  },
  watch: {
    isLight(state) {
      state
        ? ((this.sBgrndClr = "white"),
          this.isOpen
            ? (this.sBorderColor = "grey")
            : (this.sBorderColor = "black"))
        : ((this.sBgrndClr = "rgb(12,12,12)"),
          this.isOpen
            ? (this.sBorderColor = "grey")
            : (this.sBorderColor = "white"));
    },
    isOpen(newState: boolean) {
      newState && this.get1stLiPos();
    },
    notFound(state: boolean) {
      state
        ? ((this.sBorderRadus = "0px"), (this.sBorderColor = "grey"))
        : ((this.sBorderRadus = "8px"),
          (this.sBorderColor = "black"),
          this.openClose(!this.isOpen),
          this.ulScroll(this.isOpen));
    },
    inpValue(newValue: string) {
      if (this.inpValue == "Author" || this.inpValue == "") {
        this.isOpen = false;
        this.visibleLocations = this.locations;
        this.notFound = false;
        this.openClose(!this.isOpen);
      } else {
        this.notFound = false;
        this.visibleLocations = this.locations.filter((item: TypeLocation) =>
          item.location.toLowerCase().includes(newValue.toLowerCase()),
        );
        this.visibleLocations.length
          ? !this.isChosen &&
            ((this.isOpen = false),
            this.openClose(this.isOpen),
            this.visibleLocations.length > 7
              ? (this.count = 7)
              : (this.count = this.visibleLocations.length))
          : ((this.notFound = true), (this.count = 0));
        this.isChosen = false;
      }
    },
  },
  mounted() {
    this.getLocations();
  },
};
</script>
