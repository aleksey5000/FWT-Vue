import { Store } from "pinia";
import TypePics from "./PaintingsType";
import storeType from "./storeType";

type TypePicBlockComp = {
  pages: number[];
  limit: number;
  lastPage: number;
  isSuccess: boolean;
  isFirst: boolean;
  isLast: boolean;
  currentPage: number;
  store: Store<string, storeType>;
  paintings: TypePics[];
};

export default TypePicBlockComp;
