import TypeLink from "./LinkParamsType";
import TypeAuthor from "./AuthorType";
import TypeLocation from "./LocationType";

type storeType = {
  params: TypeLink;
  authors: TypeAuthor[];
  locations: TypeLocation[];
};

export default storeType;
