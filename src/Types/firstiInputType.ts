import { Store } from "pinia";
import storeType from "./storeType";

type TypeFirstInput = {
  isText: boolean;
  sBgrndClr: string;
  inpValue: string;
  store: Store<string, storeType>;
};

export default TypeFirstInput;
