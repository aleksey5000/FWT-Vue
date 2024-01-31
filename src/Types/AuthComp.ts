import TypeAuthor from "./AuthorType";

type TypeAuthComp = {
  sBgrndClr: string;
  authors: TypeAuthor[];
  filtAuthors: TypeAuthor[];
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
};

export default TypeAuthComp;
