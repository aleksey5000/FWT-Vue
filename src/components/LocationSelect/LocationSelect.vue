<template>
  <div class="list" :data-is-open="isOpen">
    <div class="inp">
      <input placeholder="Location" v-model="inpValue" />
      <div v-if="isElipsis">...</div>
      <button
        v-if="inpValue != 'Location' && inpValue != ''"
        class="x"
        @click="inpValue = ''"
      >
        <union />
      </button>
      <button @click="openOrCloseSelectList(isOpen)">
        <small-arrow />
      </button>
    </div>
    <div class="listBlock" v-if="isSuccess && !notFound">
      <ul
        class="authorList"
        :style="{
          height: `${45 * count}px`,
        }"
        id="locList"
        @scroll="scrollUlTag(isOpen)"
      >
        <li
          v-for="loc in visibleLocations"
          :key="loc.location"
          class="item"
          @mouseover="mouseOverLiTag($event)"
          @mouseout="mouseOutLiTag($event)"
          @click="clickOnLiTag($event, loc.id)"
          :style="{
            backgroundColor: styleBackgroundColor,
            color: themeColor,
          }"
        >
          {{ loc.location }}
        </li>
      </ul>
      <ul
        class="spaceList"
        :style="{
          height: `${45 * count}px`,
          bottom: `${spaceListPosition}px`,
        }"
      >
        <li
          v-for="loc in visibleLocations"
          :key="loc.location"
          class="item"
          :id="`space: ${loc.location}`"
          :style="{
            backgroundColor: styleBackgroundColor,
            color: themeColor,
          }"
        >
          {{ "" }}
        </li>
      </ul>
    </div>
    <div class="notSuccess" v-else-if="!isSuccess && isOpen">
      Location list didn't loaded yet
    </div>
    <div class="notSuccess" v-else-if="notFound">Location didn't found</div>
  </div>
</template>

<script lang="ts">
import TypeLocation from "./TypeLocation";
import TypeLocationSelect from "./TypeLocationSelect";
import SmallArrow from "../svg/SmallArrow.vue";
import Union from "../svg/Union.vue";
import axios from "axios";
import useStore from "../../store/store";

export default {
  props: {
    isLight: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    SmallArrow,
    Union,
  },
  data(): TypeLocationSelect {
    return {
      locations: [],
      visibleLocations: [],
      isSuccess: false,
      isOpen: false,
      notFound: false,
      isChosen: false,
      isElipsis: false,
      themeColor: "black",
      styleBackgroundColor: "white",
      count: 0,
      spaceListPosition: 0,
      firstLiTagYPosition: 0,
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
    getFirstLiTagPosition() {
      const a = document.getElementById("locList");
      if (a) {
        this.firstLiTagYPosition = a.children[0].getBoundingClientRect().y;
      }
    },
    openOrCloseSelectList(state: boolean) {
      if (state) {
        this.count = 0;
        this.isOpen = false;
      } else {
        if (this.visibleLocations.length > 7) {
          this.count = 7;
        } else {
          this.count = this.visibleLocations.length;
        }
        this.isOpen = true;
      }
    },
    mouseOverLiTag(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      const b = document.getElementById(`space: ${a?.innerText}`);
      if (a?.style) {
        a.style.backgroundColor = this.themeColor;
        a.style.color = this.styleBackgroundColor;
      }
      if (b) {
        b.style.backgroundColor = this.themeColor;
      }
    },
    mouseOutLiTag(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      const b = document.getElementById(`space: ${a?.innerText}`);

      if (a?.style) {
        a.style.backgroundColor = this.styleBackgroundColor;
        a.style.color = this.themeColor;
      }
      if (b) {
        b.style.backgroundColor = this.styleBackgroundColor;
      }
    },
    scrollUlTag(state: boolean) {
      if (state) {
        const a = document.getElementById("locList");
        if (a) {
          this.spaceListPosition =
            this.firstLiTagYPosition -
            a.children[0].getBoundingClientRect().top -
            window.scrollY;
        }
      } else {
        this.spaceListPosition = 0;
      }
    },
    clickOnLiTag(event: MouseEvent, id: number) {
      const a: Partial<HTMLElement> | null = event.target;
      if (a?.innerText) {
        this.inpValue = a.innerText;
      }
      this.count = 0;
      this.openOrCloseSelectList(this.isOpen);
      this.isChosen = true;
      this.store.params.locationId = id;
    },
  },
  watch: {
    isLight(state) {
      if (state) {
        this.styleBackgroundColor = "white";
        this.themeColor = "black";
      } else {
        this.styleBackgroundColor = "rgb(12,12,12)";
        this.themeColor = "white";
      }
    },
    isOpen(newState: boolean) {
      if (newState) {
        this.getFirstLiTagPosition();
      }
    },
    notFound() {
      this.openOrCloseSelectList(false);
      this.scrollUlTag(this.isOpen);
    },
    inpValue(newValue: string) {
      this.isElipsis = newValue.length > 27 && window.innerWidth > 767;
      if (this.inpValue == "Location" || this.inpValue == "") {
        this.isOpen = false;
        this.visibleLocations = this.locations;
        this.notFound = false;
        this.openOrCloseSelectList(!this.isOpen);
        delete this.store.params.locationId;
      } else {
        this.notFound = false;
        this.visibleLocations = this.locations.filter((item: TypeLocation) =>
          item.location.toLowerCase().includes(newValue.toLowerCase()),
        );
        if (this.visibleLocations.length) {
          if (!this.isChosen) {
            this.isOpen = false;
            this.openOrCloseSelectList(this.isOpen);
            if (this.visibleLocations.length > 7) {
              this.count = 7;
            } else {
              this.count = this.visibleLocations.length;
            }
          }
        } else {
          this.notFound = true;
          this.count = 0;
        }
        this.isChosen = false;
      }
    },
  },
  mounted() {
    this.getLocations();
  },
};
</script>
