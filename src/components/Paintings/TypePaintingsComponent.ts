import { Store } from "pinia";
import TypeStore from "../../store/TypeStore";

type TypePaintings = {
  store: Store<string, TypeStore>;
};

export default TypePaintings;
