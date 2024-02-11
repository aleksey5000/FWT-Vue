<template>
  <div id="AuthorSelect" class="list" :data-is-open="isOpen">
    <div class="inp">
      <input placeholder="Author" v-model="inpValue" />
      <div v-if="isElipsis">...</div>
      <button
        v-if="inpValue != 'Author' && inpValue != ''"
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
        id="authorList"
        @scroll="scrollUlTag(isOpen)"
      >
        <li
          v-for="auth in visibleAuthors"
          :key="auth.name"
          class="item"
          @mouseover="mouseOverLiTag($event)"
          @mouseout="mouseOutLiTag($event)"
          @click="clickOnLiTag($event, auth.id)"
          :style="{
            backgroundColor: styleBackgroundColor,
            color: themeColor,
          }"
        >
          {{ auth.name }}
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
          v-for="auth in visibleAuthors"
          :key="auth.name"
          class="item"
          :id="`space: ${auth.name}`"
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
      Author list didn't loaded yet
    </div>
    <div class="notSuccess" v-else-if="notFound">Author didn't found</div>
  </div>
</template>

<script lang="ts">
import TypeAuthor from "./TypeAuthor";
import TypeAuthComp from "./TypeAuthorSelect";
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
  data(): TypeAuthComp {
    return {
      authors: [],
      visibleAuthors: [],
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
      inpValue: "Author",
      store: useStore(),
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
        this.store.authors = data;
      } catch (e) {
        alert("Error: Authors list didn't loaded");
      }
    },
    getFirstLiTagPosition() {
      const a = document.getElementById("authorList");
      if (a) {
        this.firstLiTagYPosition = a.children[0].getBoundingClientRect().y;
      }
    },
    openOrCloseSelectList(state: boolean) {
      if (state) {
        this.count = 0;
        this.isOpen = false;
      } else {
        if (this.visibleAuthors.length > 7) {
          this.count = 7;
        } else {
          this.count = this.visibleAuthors.length;
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
        const a = document.getElementById("authorList");
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
      this.store.params.authorId = id;
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
      const a = document.getElementById("authorList");
      if (a) {
        this.firstLiTagYPosition = a.children[0].getBoundingClientRect().top;
      }
      if (this.inpValue == "Author" || this.inpValue == "") {
        this.isOpen = false;
        this.visibleAuthors = this.authors;
        this.notFound = false;
        this.openOrCloseSelectList(!this.isOpen);
        delete this.store.params.authorId;
      } else {
        this.notFound = false;
        this.visibleAuthors = this.authors.filter((item: TypeAuthor) =>
          item.name.toLowerCase().includes(newValue.toLowerCase()),
        );
        if (this.visibleAuthors.length) {
          if (!this.isChosen) {
            this.isOpen = false;
            this.openOrCloseSelectList(this.isOpen);
            if (this.visibleAuthors.length > 7) {
              this.count = 7;
            } else {
              this.count = this.visibleAuthors.length;
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
    this.getAuthors();
  },
};
</script>
