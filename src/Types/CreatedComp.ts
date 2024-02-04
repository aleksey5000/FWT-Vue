import { Store } from "pinia";
import storeType from "./storeType";

type TypeCrComp = {
  isOpen: boolean;
  isTextFrom: boolean;
  isTextBefore: boolean;
  from: string;
  before: string;
  sHeight: string;
  sDisplay: string;
  sInpClr: string;
  sBgrndClr: string;
  store: Store<string, storeType>;
};

export default TypeCrComp;
