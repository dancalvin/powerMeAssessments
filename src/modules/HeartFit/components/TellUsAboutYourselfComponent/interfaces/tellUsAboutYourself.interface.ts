import {MassEnum} from "../../../../../shared/enums/mass.enum";
import {SexEnum} from "../../../../../shared/enums/sex.enum";

export interface ITellUsAboutYourself {
  age?: number;
  weight?: number;
  weightUnit?: MassEnum;
  sex?: SexEnum;
}
