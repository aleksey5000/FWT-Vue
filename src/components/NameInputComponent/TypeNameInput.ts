import { Store } from "pinia";
import TypeStore from "../../store/TypeStore";

type TypeNameInput = {
  isText: boolean;
  inpValue: string;
  store: Store<string, TypeStore, {}, { changeNameParam: Function }>;
};

export default TypeNameInput;
