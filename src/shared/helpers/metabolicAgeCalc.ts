import {IVitalityScoreData} from "../../modules/Calculator/interfaces/vitalityScoreData.interface";

export const metabolicAgeCalc = (values: IVitalityScoreData): number => {
  const mapperNumTwo = 0.227;
  const mapperNumOne = 0.3333;
  const baseNum = -82.688;
  const wcNum = 0.779;
  const cmConv = 2.54;
  const fbsNum = 0.269;
  const tgNum = 0.085;
  const hdlNum = 0.481;
  const ageNum = 0.538;
  const mappedVar = (values.diastolicBP || 0) + mapperNumOne * ((values.sbd || 0) - (values.diastolicBP || 0));
  const metaAgeTempVar = baseNum + (wcNum * ((values.waistValue || 0) * cmConv)) + (mapperNumTwo * mappedVar) + (fbsNum * (values.fastingGlucose || 0)) + (tgNum * (values.triglycerides || 0)) - (hdlNum * (values.hdl || 0)) + (ageNum * (values.age || 0));
  return parseInt(metaAgeTempVar.toFixed(0));
}
