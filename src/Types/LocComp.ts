import TypeLocation from "./LocationType";
import { Store } from "pinia";
import storeType from "./storeType";

type TypeLocComp = {
  sBgrndClr: string;
  locations: TypeLocation[];
  visibleLocations: TypeLocation[];
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

export default TypeLocComp;
