import {SexEnum} from "../../../enums/sex.enum";
import {EthnicityEnum} from "../../../enums/ethnicity.enum";
import {MassEnum} from "../../../enums/mass.enum";
import {HeightEnum} from "../../../enums/height.enum";

export interface ICreateMeasurementParams {
  patientId?: string;
  score?: number;
  metabolicAge?: number;
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
  date?: string;
  bmiz?: number;
}
