import { defineStore } from "pinia";
import storeType from "../Types/storeType";

const useStore = defineStore("Store", {
  state(): storeType {
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
});

export default useStore;
