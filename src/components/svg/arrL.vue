<template>
  <svg width="9" height="13" viewBox="0 0 9 13">
    <path
      d="M0.932837 7.13428L6.73159 12.6433C7.10046 12.9939 7.69852 12.9939 8.06721 12.6433C8.43593 12.293 8.43593 11.7248 8.06721 11.3745L2.93621 6.49991L8.06706 1.62545C8.43578 1.275 8.43578 0.706895 8.06706 0.356587C7.69834 0.00613754 7.10031 0.00613754 6.73144 0.356587L0.932687 5.86567C0.748326 6.04091 0.65625 6.27034 0.65625 6.49988C0.65625 6.72953 0.748506 6.95913 0.932837 7.13428Z"
      :fill="color"
      :fill-opacity="sOpacity"
    />
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      sOpacity: "0.3",
    };
  },
  methods: {
    changeOpacity(state: boolean) {
      state ? (this.sOpacity = "0.3") : (this.sOpacity = "1");
    },
  },
  watch: {
    state(newState) {
      this.changeOpacity(newState);
    },
  },
};
</script>
