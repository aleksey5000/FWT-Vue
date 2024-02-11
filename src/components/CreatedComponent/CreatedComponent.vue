<template>
  <div :data-is-created-component-open="isOpen" class="created">
    <div class="smallArrow">
      <p>Created</p>
      <button @click="openClose(isOpen)">
        <small-arrow />
      </button>
    </div>
    <div class="inputs">
      <div class="smallInput">
        <input
          placeholder="from"
          v-model="from"
          type="number"
          @keydown.enter="changeFrom"
        />
        <button v-if="isTextFrom" @click="from = ''"><union /></button>
        <button v-if="isTextFrom" @click="changeFrom">
          <arrow-to-right :state="false" />
        </button>
      </div>
      <hr />
      <div class="smallInput">
        <input
          placeholder="before"
          v-model="before"
          type="number"
          @keydown.enter="changeBefore"
        />
        <button v-if="isTextBefore" @click="before = ''"><union /></button>
        <button v-if="isTextBefore" @click="changeBefore">
          <arrow-to-right :state="false" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SmallArrow from "../svg/SmallArrow.vue";
import TypeCreatedComponent from "./TypeCreatedComponent";
import Union from "../svg/Union.vue";
import ArrowToRight from "../svg/ArrowToRight.vue";
import useStore from "../../store/store";

export default {
  components: {
    SmallArrow,
    Union,
    ArrowToRight,
  },
  data(): TypeCreatedComponent {
    return {
      isOpen: false,
      isTextFrom: false,
      isTextBefore: false,
      from: "",
      before: "",
      store: useStore(),
    };
  },
  methods: {
    openClose(state: boolean) {
      this.isOpen = !state;
    },
    changeFrom() {
      if (this.from != "") {
        this.store.params.created_gte = Number(this.from);
      }
    },
    changeBefore() {
      if (this.before != "") {
        this.store.params.created_lte = Number(this.before);
      }
    },
  },
  watch: {
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

<style>
.created {
  width: 100%;
  border-radius: 8px;
  position: relative;
  z-index: 1;
}
.smallArrow {
  display: flex;
  justify-content: space-between;
  align-items: top;
  height: 43px;
}
.smallArrow p {
  padding: 15px 0 0 10px;
}
.smallArrow button {
  width: 20px;
  margin-right: 10px;
  height: 43px;
}
.inputs {
  justify-content: center;
  align-items: center;
}
.smallInput {
  height: 45px;
  border-radius: 8px;
  display: flex;
  position: relative;
}
.smallInput button {
  margin-right: 5px;
}
.smallInput svg {
  height: 10px;
}
.inputs input {
  padding-left: 15px;
  border-radius: 8px;
  height: 43px;
  width: 100%;
  background-color: transparent;
}
.inputs input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
hr {
  margin-inline: 10px;
  height: 1px;
  width: 12px;
}
</style>
