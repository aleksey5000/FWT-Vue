import TypeAuthor from "./TypeAuthor";
import { Store } from "pinia";
import TypeStore from "../../store/TypeStore";

type TypeAuthComp = {
  authors: TypeAuthor[];
  visibleAuthors: TypeAuthor[];
  isSuccess: boolean;
  isOpen: boolean;
  notFound: boolean;
  isChosen: boolean;
  isElipsis: boolean;
  themeColor: string;
  styleBackgroundColor: string;
  count: number;
  firstLiTagYPosition: number;
  spaceListPosition: number;
  inpValue: string;
  store: Store<string, TypeStore>;
};

export default TypeAuthComp;
