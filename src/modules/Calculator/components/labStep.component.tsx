import primaryStyles from '../../../shared/styles/index.module.scss'
import formStyles from '../pages/form.module.scss'
import {FC} from "react";
import CustomSlider from "./CustomSlider";
import {RangeSliderConfig} from "./CustomSlider/RageSliderConfig";

interface ILabValuesStep {
  hdl?: number;
  triglycerides?: number;
  fastingGlucose?: number;
  ac1?: number;
}


interface IProps {
  values: ILabValuesStep;
  onValuesChanged: (values: ILabValuesStep) => void;
  insideOnePageForm?: boolean;
}

const LabStepComponent: FC<IProps> = (props) => {

  const {values, onValuesChanged, insideOnePageForm} = props;

  const handleOnChangeAc1 = (value: number) => {
    let sugarNumber = Math.round((value * 28.7) - 46.7)
    onValuesChanged({ac1: value, fastingGlucose: sugarNumber})
  }

  const handleOnChangeFastingGlucose = (value: number) => {
    const ac1Number = (value + 46.7) / 28.7;
    onValuesChanged({ac1: parseFloat(ac1Number.toFixed(1)), fastingGlucose: value})
  }

  return (
    <div
      className={`${primaryStyles['step']} ${primaryStyles['fourth']} ${insideOnePageForm ? `!border-0 !pt-0 ${primaryStyles['content-none']}` : ''}`}>
      {
        !insideOnePageForm &&
        <>
          <h2>Lab Values</h2>
          <h3 className={primaryStyles['light']}>
            Certain lab values help establish your risk for cardiovascular disease. If you know your numbers, please
            enter
            them below. If not, feel free to estimate using the numbers within the normal range.
          </h3>
        </>
      }
      <div className={formStyles['form']}>
        <div className={formStyles['form__list']}>
          <h3 className={formStyles['light']}>
            <span> HDL (mg/dL) </span>
            HDL is high-density lipoprotein, also known as “good” cholesterol. It absorbs cholesterol and carries it
            back to the liver, which then flushes it from the body. (NOTE: This is CDC definition). High good
            cholesterol is generally associated with better metabolic health.
          </h3>
        </div>
        <div className={formStyles['form__range']}>
          <CustomSlider applySecondary={true} rangeSliderConfig={RangeSliderConfig[1]}
                        value={values.hdl || RangeSliderConfig[1].min}
                        onValueChanged={(hdl) => onValuesChanged({hdl})}/>
        </div>
        <div className={formStyles['form__list']}>
          <h3 className={formStyles['light']}>
            <span>Triglycerides (mg/dL)</span>
            Triglycerides are a type of fat found in your blood. Your body releases triglycerides for energy between
            meals. (NOTE: This is Mayo Clinic Definition). Higher triglycerides are associated with an increased risk
            for metabolic health problems.
          </h3>
        </div>
        <div className={formStyles['form__range']}>
          <CustomSlider applySecondary={true} rangeSliderConfig={RangeSliderConfig[2]}
                        value={values.triglycerides || RangeSliderConfig[2].min}
                        onValueChanged={(triglycerides) => onValuesChanged({triglycerides})}/>
        </div>

        <div className={formStyles['form__list']}>
          <h3 className={formStyles['light']}>
            <span>Fasting Blood Sugar</span>
            This is your blood glucose after a minimum fast of 10 hours. Values below 100 are considered normal. If your
            number is above 120 and you don’t have diabetes, you should check with your healthcare provider.
          </h3>
        </div>
        <div className={formStyles['form__range']}>
          <CustomSlider applySecondary={true} rangeSliderConfig={RangeSliderConfig[3]}
                        value={values.fastingGlucose || RangeSliderConfig[3].min}
                        onValueChanged={handleOnChangeFastingGlucose}/>
        </div>
        <div className={formStyles['form__list']}>
          <h3 className={formStyles['light']}>
            <span>A1C Glycated Hemoglobin</span>
            Glycated hemoglobin is a measure of your average blood sugar over the past 2-3 months. A1C is a percentage
            of hemoglobin that is glycated. A normal A1C is less than 5.7%. A1C is a good measure of how well your
            diabetes is controlled. If your A1C is above 6.5%, you should check with your healthcare provider.
          </h3>
        </div>
        <div className={formStyles['form__range']}>
          <CustomSlider applySecondary={true} rangeSliderConfig={RangeSliderConfig[6]}
                        stepAmount={"0.1"}
                        value={values.ac1 || RangeSliderConfig[6].min}
                        onValueChanged={handleOnChangeAc1}/>
        </div>
      </div>
    </div>
  )
}

export default LabStepComponent
