import { Store } from "pinia";
import TypePics from "../Paintings/TypePaintings";
import TypeStore from "../../store/TypeStore";

type TypePaintingsWithPagination = {
  pages: number[];
  limit: number;
  lastPage: number;
  isSuccess: boolean;
  isFirst: boolean;
  isLast: boolean;
  currentPage: number;
  store: Store<string, TypeStore>;
  paintings: TypePics[];
};

export default TypePaintingsWithPagination;
