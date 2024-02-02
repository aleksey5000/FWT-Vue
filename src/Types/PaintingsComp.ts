import { Store } from "pinia";
import storeType from "./storeType";

type TypePaintings = {
  store: Store<string, storeType>;
};

export default TypePaintings;
