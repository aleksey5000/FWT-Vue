<template>
  <div
    class="pagination"
    :style="{
      borderColor: svgColor,
    }"
  >
    <button
      @click="clickArr2L"
      :style="{
        borderRightColor: svgColor,
      }"
    >
      <arr2L :color="svgColor" :state="isFirst" />
    </button>
    <button
      @click="clickArrL"
      :style="{
        borderRightColor: svgColor,
      }"
    >
      <arrL :color="svgColor" :state="isFirst" />
    </button>
    <button
      v-for="page in pages"
      :style="changeColor(isLight, page)"
      :id="`page ${page}`"
      @mouseover="mOver($event)"
      @mouseout="mOut($event)"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button
      @click="clickArrR"
      :style="{
        borderRightColor: svgColor,
      }"
    >
      <arrR :color="svgColor" :state="isLast" />
    </button>
    <button @click="clickArr2R">
      <arr2R :color="svgColor" :state="isLast" />
    </button>
  </div>
</template>

<script lang="ts">
//import Paintings from "./Paintings.vue";
import axios from "axios";
import linkParams from "../const/linkParams";
import TypePicBlockComp from "../Types/PicBlockComp";
import arr2L from "../components/svg/arr2L.vue";
import arrL from "../components/svg/arrL.vue";
import arr2R from "../components/svg/arr2R.vue";
import arrR from "../components/svg/arrR.vue";

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
    //Paintings,
    arr2L,
    arrL,
    arr2R,
    arrR,
  },
  data(): TypePicBlockComp {
    return {
      pages: [1],
      limit: 12,
      lastPage: 1,
      isFirst: true,
      isLast: false,
      currentPage: 0,
    };
  },
  methods: {
    async getCount() {
      try {
        const response = await axios.get(
          "https://test-front.framework.team/paintings",
          { params: linkParams },
        );
        this.lastPage = Math.ceil(response.data.length / this.limit);
        this.currentPage = 1;
      } catch (e) {
        alert("Error: Couldn't count up total pages");
      }
    },
    getPages() {
      this.lastPage >= 3
        ? (this.pages = [1, 2, 3])
        : this.lastPage == 2
          ? (this.pages = [1, 2])
          : (this.pages = [1]);
    },
    mOver(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      this.currentPage != Number(a?.innerText) &&
        a &&
        a.style &&
        (a.style.backgroundColor = "rgba(237,237,237,0.75)");
    },

    mOut(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      this.currentPage != Number(a?.innerText) &&
        a &&
        a.style &&
        (a.style.backgroundColor = "transparent");
    },
    changePage(page: number) {
      this.currentPage = page;
    },
    clickArr2L() {
      this.currentPage != 1 &&
        ((this.currentPage = 1),
        this.lastPage != 2 ? (this.pages = [1, 2, 3]) : (this.pages = [1, 2]));
    },
    clickArrL() {
      if (this.currentPage != 1) {
        this.currentPage -= 1;
        if (this.currentPage >= 3 && this.currentPage < this.lastPage) {
          this.pages = [
            this.currentPage - 2,
            this.currentPage - 1,
            this.currentPage,
          ];
        }
      }
    },
    clickArrR() {
      if (this.currentPage != this.lastPage) {
        this.currentPage += 1;
        if (this.currentPage >= 2 && this.currentPage < this.lastPage - 1) {
          this.pages = [
            this.currentPage,
            this.currentPage + 1,
            this.currentPage + 2,
          ];
        }
      }
    },
    clickArr2R() {
      this.currentPage != this.lastPage &&
        ((this.currentPage = this.lastPage),
        this.lastPage != 2
          ? (this.pages = [this.lastPage - 2, this.lastPage - 1, this.lastPage])
          : (this.pages = [1, 2]));
    },
    changeColor(light: boolean, page: number) {
      if (light) {
        if (page == this.currentPage) {
          return {
            backgroundColor: "black",
            color: "white",
            borderRightColor: "black",
          };
        } else {
          return {
            backgroundColor: "transparent",
            color: "black",
          };
        }
      } else {
        if (page == this.currentPage) {
          return {
            backgroundColor: "white",
            color: "black",
            borderRightColor: "white",
          };
        } else {
          return {
            backgroundColor: "transparent",
            color: "white",
          };
        }
      }
    },
  },
  watch: {
    lastPage() {
      this.getPages();
    },
    currentPage(newPage: number) {
      newPage == 1 ? (this.isFirst = true) : (this.isFirst = false);
      newPage == this.lastPage ? (this.isLast = true) : (this.isLast = false);
    },
  },
  mounted() {
    this.getCount();
  },
};
</script>
