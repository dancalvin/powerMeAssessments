import {FC, useEffect, useState} from "react";
import primaryStyles from "../../../../shared/styles/index.module.scss";
import CustomSlider from "../CustomSlider";
import {RangeSliderConfig} from "../CustomSlider/RageSliderConfig";
import VitalityScoreComponent from "../VitalityScore";
import {IVitalityScoreData} from "../../interfaces/vitalityScoreData.interface";
import {toCentimeters, toKilograms} from "../../../../shared/helpers/transformValues";
import {BMIAdult, BMIZscore} from "../../../../shared/helpers/calculateBmi";
import {calculateMss, ICalculateMssParams, ICalculateMssResponse} from "../../../../shared/helpers/calculateMss";
import {metabolicAgeCalc} from "../../../../shared/helpers/metabolicAgeCalc";

interface IProps {
  oldValues: IVitalityScoreData,
}

const IdealVitalityScoreComponent: FC<IProps> = (props) => {
  const {oldValues} = props;
  const [score, setScore] = useState<number>(0);
  const [values, setValues] = useState<IVitalityScoreData>({})
  const [result, setResult] = useState<ICalculateMssResponse | undefined>(undefined)
  const [metabolicAge, setMetabolicAge] = useState<number | undefined>(undefined);


  useEffect(() => {
    if (values && values.weightValue && values.weightUnit && values.feet && (typeof values.inches === 'number')) {
      const weightKG = toKilograms({value: values.weightValue, unit: values.weightUnit});
      // const heightMeters = toMeters({value: values.weightValue, unit: HeightEnum.IN});
      const heightMeters = values.feet * 0.3048 + values.inches * 0.0254

      const bmiAdult = BMIAdult({weight: weightKG, height: heightMeters});

      // setBmi(bmiAdult)
      let bmiZ = 0
      try {
        if (values.age && values.age < 2 && values.sex) {
          const ageInMonths = values.age * 12;
          bmiZ = BMIZscore({
            age: ageInMonths,
            sex: values.sex,
            weight: weightKG,
            height: heightMeters
          });
          //
          /*
          setBmiZ(bmiZ);*/
        }
        if (values.age && values.age > 2) {
          if (values.ethnicity && values.sex && values.hdl && values.sbd && values.triglycerides && values.fastingGlucose) {
            const params: ICalculateMssParams = {
              age: values.age,
              sex: values.sex,
              ethnicity: values.ethnicity,
              bmi: bmiAdult,
              hdl: values.hdl,
              sbp: values.sbd,
              triglyceride: values.triglycerides,
              glucose: values.fastingGlucose,
              bmiZScore: bmiZ,
              waist: values.waistValue && values.waistUnit && values.age >= 20 ? toCentimeters({
                unit: values.waistUnit,
                value: values.waistValue
              }) : undefined
            }
            const result = calculateMss(params);
            setResult(result);
          }
        } else {
          //TODO: SHOW SOMETHING IF THE AGE IS LESS THAN 2
        }
      } catch (e) {
        console.log(e)

      }
      setMetabolicAge(metabolicAgeCalc(values));
    }
  }, [values]);

  const handleOnChangeAc1 = (value: number) => {
    let sugarNumber = Math.round((value * 28.7) - 46.7)
    setValues({...values, ac1: value, fastingGlucose: sugarNumber})
  }

  const handleOnChangeFastingGlucose = (value: number) => {
    const ac1Number = (value + 46.7) / 28.7;
    setValues({...values, ac1: parseFloat(ac1Number.toFixed(1)), fastingGlucose: value})
  }

  useEffect(() => {
    if (oldValues) {
      setValues({...oldValues})
    }
  }, [oldValues])

  return (
    <div className={`${primaryStyles['step']} ${primaryStyles['fourth']}`}>
      <VitalityScoreComponent score={result?.mets_z_bmi || score} primary={false} metabolicAge={metabolicAge}/>
      <h3 className={`${primaryStyles['med']}`}>Weight</h3>
      {
        values.weightValue &&
        <CustomSlider applySecondary={true} value={values.weightValue}
                      applyStylesForIdealVScore={true}
                      onValueChanged={(weightValue) => setValues({...values, weightValue})}
                      rangeSliderConfig={RangeSliderConfig[4]}/>
      }
      <h3 className={`${primaryStyles['med']}`}>Waist</h3>
      {
        values.waistValue &&
        <CustomSlider applySecondary={true} value={values.waistValue}
                      applyStylesForIdealVScore={true}
                      onValueChanged={(waistValue) => setValues({...values, waistValue})}
                      rangeSliderConfig={RangeSliderConfig[7]}/>
      }

      <h3 className={`${primaryStyles['med']}`}>Blood Pressure (mmHg)</h3>
      {
        values.sbd &&
        <CustomSlider value={values.sbd} applySecondary={true}
                      applyStylesForIdealVScore={true}
                      onValueChanged={(sbd) => setValues({...values, sbd})}
                      rangeSliderConfig={RangeSliderConfig[0]}/>
      }

      <h3 className={`${primaryStyles['med']}`}>Diastolic Blood Pressure (mmHg)</h3>
      {
        values.diastolicBP &&
        <CustomSlider value={values.diastolicBP} applySecondary={true}
                      applyStylesForIdealVScore={true}
                      onValueChanged={(diastolicBP) => setValues({...values, diastolicBP})}
                      rangeSliderConfig={RangeSliderConfig[5]}/>
      }
      <h3 className={`${primaryStyles['med']}`}>HDL (mg/dL)</h3>
      {
        values.hdl &&
        <CustomSlider applySecondary={true} value={values.hdl}
                      applyStylesForIdealVScore={true}
                      onValueChanged={(hdl) => setValues({...values, hdl})}
                      rangeSliderConfig={RangeSliderConfig[1]}/>
      }
      <h3 className={`${primaryStyles['med']}`}>Triglycerides (mg/dL)</h3>
      {
        values.triglycerides &&
        <CustomSlider applySecondary={true} value={values.triglycerides}
                      applyStylesForIdealVScore={true}
                      onValueChanged={(triglycerides) => setValues({...values, triglycerides})}
                      rangeSliderConfig={RangeSliderConfig[2]}/>
      }
      <h3 className={`${primaryStyles['med']}`}>Fasting Glucose (mg/dL)</h3>
      {
        values.fastingGlucose &&
        <CustomSlider applySecondary={true} value={values.fastingGlucose}
                      applyStylesForIdealVScore={true}
                      onValueChanged={handleOnChangeFastingGlucose}
                      rangeSliderConfig={RangeSliderConfig[3]}/>
      }
      <h3 className={`${primaryStyles['med']}`}>A1C Glycated Hemoglobin</h3>
      {
        values.ac1 &&
        <CustomSlider applySecondary={true} rangeSliderConfig={RangeSliderConfig[6]}
                      applyStylesForIdealVScore={true}
                      stepAmount={"0.1"}
                      value={values.ac1 || RangeSliderConfig[6].min}
                      onValueChanged={handleOnChangeAc1}/>
      }

    </div>
  )
}

export default IdealVitalityScoreComponent;

