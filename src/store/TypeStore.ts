import TypeLink from "./TypeLinkParams";
import TypeAuthor from "../components/AuthorSelect/TypeAuthor";
import TypeLocation from "../components/LocationSelect/TypeLocation";

type TypeStore = {
  params: TypeLink;
  authors: TypeAuthor[];
  locations: TypeLocation[];
};

export default TypeStore;
