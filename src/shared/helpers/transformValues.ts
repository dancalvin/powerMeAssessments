import {MassEnum} from "../enums/mass.enum";
import {HeightEnum} from "../enums/height.enum";


export interface ITransformToKilogramsParams {
  value: number;
  unit: MassEnum
}

export interface ITransformToKilogramsParams {
  value: number;
  unit: MassEnum
}

export interface ITransformToCentimetersOrMetersParams {
  value: number;
  unit: HeightEnum
}


const toKilograms = (params: ITransformToKilogramsParams) => {
  const {unit, value} = params;
  switch (unit) {
    case MassEnum.KG:
      return value
    case MassEnum.LBS:
      // See https://www.ngs.noaa.gov/PUBS_LIB/FedRegister/FRdoc59-5442.pdf
      return value * 0.45359237
  }
}

const toCentimeters = (params: ITransformToCentimetersOrMetersParams) => {
  const {unit, value} = params;
  switch (unit) {
    case HeightEnum.IN:
      return value * 2.54;
    case HeightEnum.CM:
      return value;
    case HeightEnum.M:
      return value * 100;
  }
}

const toMeters = (params: ITransformToCentimetersOrMetersParams) => {
  const {unit, value} = params;
  switch (unit) {
    case HeightEnum.IN:
      return value / 39.37;
    case HeightEnum.CM:
      return value / 100
    case HeightEnum.M:
      return value
  }
}
export {
  toKilograms,
  toMeters,
  toCentimeters
}
