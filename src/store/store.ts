import { defineStore } from "pinia";
import TypeStore from "./TypeStore";

const useStore = defineStore("Store", {
  state(): TypeStore {
    return {
      params: {
        name_like: "",
        created_gte: -1,
        created_lte: 2055,
      },
      authors: [],
      locations: [],
    };
  },
  actions: {
    changeNameParam(name: string) {
      if (name == "") {
        delete this.params.name_like;
      } else {
        this.params.name_like = name;
      }
    },
  },
});

export default useStore;
