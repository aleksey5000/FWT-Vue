import TypeLink from "./LinkParamsType";
import TypePics from "./PaintingsType";

type TypePicBlockComp = {
  pages: number[];
  limit: number;
  lastPage: number;
  isSuccess: boolean;
  isFirst: boolean;
  isLast: boolean;
  currentPage: number;
  params: TypeLink;
  paintings: TypePics[];
};

export default TypePicBlockComp;
