<template>
  <div class="firstInput">
    <input
      placeholder="Name"
      @input="changeName(inpValue)"
      v-model="inpValue"
    />
    <button>
      <union v-if="inpValue" @click="clickOnUnion" />
    </button>
  </div>
</template>

<script lang="ts">
import useStore from "../../store/store";
import TypeNameInput from "./TypeNameInput";
import ArrowToRight from "../svg/ArrowToRight.vue";
import Union from "../svg/Union.vue";

export default {
  components: {
    ArrowToRight,
    Union,
  },
  data(): TypeNameInput {
    return {
      isText: false,
      inpValue: "",
      store: useStore(),
    };
  },
  methods: {
    changeName(name: string) {
      setTimeout(() => this.store.changeNameParam(name), 500);
    },
    clickOnUnion() {
      this.changeName("");
      this.inpValue = "";
    },
  },
};
</script>

<style>
.firstInput {
  margin-right: 20px;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  padding-left: 10px;
  display: flex;
}
.firstInput input {
  height: 43px;
  width: 100%;
  border-radius: 8px;
}
.firstInput button {
  padding-right: 20px;
}
.firstInput button svg {
  height: 10px;
}
</style>
