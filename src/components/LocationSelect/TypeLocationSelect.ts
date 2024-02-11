import TypeLocation from "./TypeLocation";
import { Store } from "pinia";
import TypeStore from "../../store/TypeStore";

type TypeLocationSelect = {
  locations: TypeLocation[];
  visibleLocations: TypeLocation[];
  isSuccess: boolean;
  isOpen: boolean;
  notFound: boolean;
  isChosen: boolean;
  isElipsis: boolean;
  styleBackgroundColor: string;
  themeColor: string;
  count: number;
  firstLiTagYPosition: number;
  spaceListPosition: number;
  inpValue: string;
  store: Store<string, TypeStore>;
};

export default TypeLocationSelect;
