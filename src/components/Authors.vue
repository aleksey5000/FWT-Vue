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
        placeholder="Author"
        v-model="inpValue"
        :style="{
          color: svgColor,
        }"
      />
      <div v-if="inpValue.length > 27">...</div>
      <button
        v-if="inpValue != 'Author' && inpValue != ''"
        class="x"
        @click="inpValue = ''"
      >
        <union />
      </button>
      <button @click="openClose(isOpen)">
        <small-arrow :state="svgColor" />
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
        id="authorList"
        @scroll="ulScroll(isOpen)"
      >
        <li
          v-for="auth in visibleAuthors"
          :key="auth.name"
          class="item"
          @mouseover="liMOver($event)"
          @mouseout="liMOut($event)"
          @click="liClick($event)"
          :style="{
            backgroundColor: sBgrndClr,
            color: svgColor,
          }"
        >
          {{ auth.name }}
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
          v-for="auth in visibleAuthors"
          :key="auth.name"
          class="item"
          :id="`space: ${auth.name}`"
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
      Author list didn't loaded yet
    </div>
    <div
      class="notSuccess"
      :style="{
        borderColor: svgColor,
        borderTopColor: sBorderColor,
      }"
      v-else-if="notFound"
    >
      Author didn't found
    </div>
  </div>
</template>

<script lang="ts">
import TypeAuthor from "../Types/AuthorType";
import TypeAuthComp from "../Types/AuthComp";
import SmallArrow from "../components/svg/SmallArrow.vue";
import Union from "../components/svg/Union.vue";
import axios from "axios";

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
  data(): TypeAuthComp {
    return {
      authors: [],
      filtAuthors: [],
      visibleAuthors: [],
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
      inpValue: "Author",
    };
  },
  methods: {
    async getAuthors() {
      try {
        const response = await axios.get(
          "https://test-front.framework.team/authors",
        );
        const data: TypeAuthor[] = response.data;
        this.authors = data;
        this.visibleAuthors = data;
        this.isSuccess = true;
      } catch (e) {
        alert("Error: Authors list didn't loaded");
      } finally {
      }
    },
    get1stLiPos() {
      const a = document.getElementById("authorList");
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
        : (this.visibleAuthors.length > 7
            ? (this.count = 7)
            : (this.count = this.visibleAuthors.length),
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
        ? ((a = document.getElementById("authorList")),
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
      const a = document.getElementById("authorList");
      a && (this.liPos = a.children[0].getBoundingClientRect().top);
      if (this.inpValue == "Author" || this.inpValue == "") {
        this.isOpen = false;
        this.visibleAuthors = this.authors;
        this.notFound = false;
        this.openClose(!this.isOpen);
      } else {
        this.notFound = false;
        this.visibleAuthors = this.authors.filter((item: TypeAuthor) =>
          item.name.toLowerCase().includes(newValue.toLowerCase()),
        );
        this.visibleAuthors.length
          ? !this.isChosen &&
            ((this.isOpen = false),
            this.openClose(this.isOpen),
            this.visibleAuthors.length > 7
              ? (this.count = 7)
              : (this.count = this.visibleAuthors.length))
          : ((this.notFound = true), (this.count = 0));
        this.isChosen = false;
      }
    },
  },
  mounted() {
    this.getAuthors();
  },
};
</script>
