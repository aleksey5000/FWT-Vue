<template>
  <div class="pics">
    <paintings :paintings="paintings" />
    <div v-if="isSuccess && lastPage > 1" class="pagination">
      <button @click="clickOnTwoArrowsToLeft">
        <two-arrows-to-left :state="isFirst" />
      </button>
      <button @click="clickOnArrowToLeft">
        <arrow-to-left :state="isFirst" />
      </button>
      <button
        v-for="page in pages"
        :style="changeColor(isLight, page)"
        :id="`page ${page}`"
        @mouseover="mouseOverPage($event)"
        @mouseout="mouseOutPage($event)"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      <button @click="clickOnArrowToRight">
        <arrow-to-right :state="isLast" />
      </button>
      <button @click="clickOnTwoArrowsToRight">
        <two-arrows-to-right :state="isLast" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Paintings from "../Paintings/Paintings.vue";
import axios from "axios";
import useStore from "../../store/store";
import TypePaintingsWithPagination from "./TypePaintingsWithPagination";
import TwoArrowsToLeft from "../svg/TwoArrowsToLeft.vue";
import ArrowToLeft from "../svg/ArrowToLeft.vue";
import TwoArrowsToRight from "../svg/TwoArrowsToRight.vue";
import ArrowToRight from "../svg/ArrowToRight.vue";
import TypeStore from "../../store/TypeStore";

export default {
  props: {
    isLight: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Paintings,
    TwoArrowsToLeft,
    ArrowToLeft,
    TwoArrowsToRight,
    ArrowToRight,
  },
  data(): TypePaintingsWithPagination {
    return {
      pages: [1],
      limit: 12,
      lastPage: 1,
      currentPage: 1,
      isFirst: true,
      isLast: false,
      isSuccess: false,
      store: useStore(),
      paintings: [],
    };
  },
  methods: {
    async getCount() {
      try {
        const response = await axios.get(
          "https://test-front.framework.team/paintings",
          { params: this.store.params },
        );
        this.lastPage = Math.ceil(response.data.length / this.limit);
        this.isSuccess = true;
      } catch (e) {
        alert("Error: Couldn't count up total pages");
      }
    },
    async getPaintings(page: number) {
      try {
        const settings = {
          ...this.store.params,
          _page: page,
          _limit: this.limit,
        };
        const response = await axios.get(
          "https://test-front.framework.team/paintings",
          {
            params: settings,
          },
        );
        this.paintings = response.data;
      } catch (e) {
        alert("Error: Couldn't get paintings");
      }
    },
    getPages() {
      if (this.lastPage >= 3) {
        this.pages = [1, 2, 3];
      } else {
        if (this.lastPage == 2) {
          this.pages = [1, 2];
        } else {
          this.pages = [1];
        }
      }
    },
    mouseOverPage(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      if (this.currentPage != Number(a?.innerText) && a?.style) {
        a.style.backgroundColor = "rgba(237,237,237,0.75)";
      }
    },
    mouseOutPage(event: MouseEvent) {
      const a: Partial<HTMLElement> | null = event.target;
      if (this.currentPage != Number(a?.innerText) && a?.style) {
        a.style.backgroundColor = "transparent";
      }
    },
    changePage(page: number) {
      this.currentPage = page;
    },
    clickOnTwoArrowsToLeft() {
      if (this.currentPage != 1) {
        this.currentPage = 1;
        if (this.lastPage != 2) {
          this.pages = [1, 2, 3];
        } else {
          this.pages = [1, 2];
        }
      }
    },
    clickOnArrowToLeft() {
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
    clickOnArrowToRight() {
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
    clickOnTwoArrowsToRight() {
      if (this.currentPage != this.lastPage) {
        this.currentPage = this.lastPage;
        if (this.lastPage != 2) {
          this.pages = [this.lastPage - 2, this.lastPage - 1, this.lastPage];
        } else {
          this.pages = [1, 2];
        }
      }
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
    lastPage(newPage: number) {
      this.getPages();
      if (newPage == this.currentPage) {
        this.isLast = true;
      } else {
        this.isLast = false;
      }
    },
    currentPage(newPage: number) {
      if (newPage == 1) {
        this.isFirst = true;
      } else {
        this.isFirst = false;
      }
      if (newPage == this.lastPage) {
        this.isLast = true;
      } else {
        this.isLast = false;
      }
      this.getPaintings(newPage);
    },
    store: {
      handler(val: TypeStore) {
        this.currentPage = 1;
        this.getCount();
        this.getPaintings(this.currentPage);
        this.store.params = val.params;
      },
      deep: true,
    },
  },
  mounted() {
    this.getCount();
    this.getPaintings(this.currentPage);
  },
};
</script>

<style>
.pics {
  position: absolute;
  max-width: 1120px;
}
.pagination {
  margin-top: 35px;
  display: inline-flex;
  align-items: top;
  border-radius: 8px;
  margin-bottom: 100px;
}
.pagination button {
  width: 41px;
  height: 41px;
  cursor: default;
}
.pagination button:last-child {
  border-right: none;
}
</style>
