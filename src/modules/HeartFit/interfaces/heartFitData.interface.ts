import {SexEnum} from "../../../shared/enums/sex.enum";
import {MassEnum} from "../../../shared/enums/mass.enum";

export interface IHeartFitData {
  id?: number;
  age?: number;
  sex?: SexEnum;
  weightValue?: number;
  weightUnit?: MassEnum;
}
