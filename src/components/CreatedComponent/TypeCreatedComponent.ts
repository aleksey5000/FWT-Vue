import { Store } from "pinia";
import TypeStore from "../../store/TypeStore";

type TypeCreatedComponent = {
  isOpen: boolean;
  isTextFrom: boolean;
  isTextBefore: boolean;
  from: string;
  before: string;
  store: Store<string, TypeStore>;
};

export default TypeCreatedComponent;
