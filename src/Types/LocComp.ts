import TypeLocation from "./LocationType";

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
};

export default TypeLocComp;
