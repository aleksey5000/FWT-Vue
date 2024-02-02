import TypeAuthor from "./AuthorType";
import { Store } from "pinia";
import storeType from "./storeType";

type TypeAuthComp = {
  sBgrndClr: string;
  authors: TypeAuthor[];
  visibleAuthors: TypeAuthor[];
  isSuccess: boolean;
  isOpen: boolean;
  notFound: boolean;
  isChosen: boolean;
  sDisplay: string;
  count: number;
  sBorderRadus: string;
  sBorderColor: string;
  sBorderWidth: string;
  sLiback: string;
  sLiClr: string;
  liPos: number;
  sYPosition: number;
  inpValue: string;
  store: Store<string, storeType>;
};

export default TypeAuthComp;
