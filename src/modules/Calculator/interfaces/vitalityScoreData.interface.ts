import {SexEnum} from "../../../shared/enums/sex.enum";
import {EthnicityEnum} from "../../../shared/enums/ethnicity.enum";
import {HeightEnum} from "../../../shared/enums/height.enum";
import {MassEnum} from "../../../shared/enums/mass.enum";

export interface IVitalityScoreData {
  id?: number;
  age?: number;
  sex?: SexEnum;
  ethnicity?: EthnicityEnum;
  feet?: number;
  inches?: number;
  weightValue?: number;
  weightUnit?: MassEnum;
  waistValue?: number;
  waistUnit?: HeightEnum;
  sbd?: number;
  diastolicBP?: number;
  hdl?: number;
  triglycerides?: number;
  fastingGlucose?: number;
  extraRace?: string;
  ac1?: number;
  metabolicAge?: number;
  score?: number;
  date?: string;
  bmiz?: number;
  createdAt?: string;
  updatedAt?: string;
}
