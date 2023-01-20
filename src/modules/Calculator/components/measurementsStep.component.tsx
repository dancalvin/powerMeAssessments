import primaryStyles from '../../../shared/styles/index.module.scss'
import formStyles from '../pages/form.module.scss'
import {FC} from "react";
import {MassEnum} from "../../../shared/enums/mass.enum";
import {HeightEnum} from "../../../shared/enums/height.enum";
import CustomSlider from "./CustomSlider";
import {RangeSliderConfig} from "./CustomSlider/RageSliderConfig";

interface IMeasurementsStep {
  feet?: number;
  inches?: number;
  weightValue?: number;
  weightUnit?: MassEnum;
  waistValue?: number;
  waistUnit?: HeightEnum;
  sbd?: number;
  diastolicBP?: number;
}

interface IProps {
  age: number;
  values: IMeasurementsStep;
  onValuesChanged: (value: IMeasurementsStep) => void;
  insideOnePageForm?: boolean;
}

const MeasurementsStepComponent: FC<IProps> = (props) => {
  const {values, onValuesChanged, age, insideOnePageForm} = props;


  return (
    <div
      className={`${primaryStyles['step']} ${primaryStyles['third']} ${insideOnePageForm ? `!border-0 !pt-0 ${primaryStyles['content-none']}` : ''}`}>
      {
        !insideOnePageForm &&
        <>
          <h2>Measurements</h2>
          <h3 className={primaryStyles['light']}>
            Your height and weight determine your BMI or Body Mass Index. BMI is a person’s weight in kilograms (or
            pounds)
            divided by the square of height in meters (or feet). While BMI doesn’t measure body fat or lean tissue
            directly,
            a high BMI is associated with an increased risk for metabolic health problems.
          </h3>
        </>
      }
      <div className={formStyles['form']}>
        <h3 className={formStyles['med']}>Height</h3>
        <h3 className={formStyles['med']}>Feet</h3>
        <div className={formStyles['input__measure']}>
          <input
            onWheel={(e) => e.currentTarget.blur()}
            type="number"
            className={formStyles['input']}
            placeholder="ex: 5"
            value={values.feet}
            onChange={(ev) => {
              onValuesChanged({feet: ev.target.value ? parseInt(ev.target.value) : undefined})
            }}
          />
        </div>
        <h3 className={formStyles['med']}>Inches</h3>
        <div className={formStyles['input__measure']}>
          <input
            onWheel={(e) => e.currentTarget.blur()}
            type="number"
            className={formStyles['input']}
            placeholder="ex: 7"
            value={values.inches}
            onChange={(ev) => {
              onValuesChanged({inches: ev.target.value ? parseInt(ev.target.value) : undefined})
            }}
          />
        </div>
        <h3 className={formStyles['med']}>Weight (lbs)</h3>
        <div className={formStyles['input__measure']}>
          <input
            onWheel={(e) => e.currentTarget.blur()}
            type="number"
            className={formStyles['input']}
            placeholder="ex: 190"
            value={values.weightValue}
            onChange={(ev) => {
              onValuesChanged({
                weightValue: ev.target.value ? parseInt(ev.target.value) : undefined,
                weightUnit: MassEnum.LBS
              })
            }}
          />
        </div>
        {
          age >= 20 &&
          <div className={formStyles['input__measure']}>
            <h3 className={formStyles['med']}>Waist Circumference (inches)</h3>
            <h3 className={formStyles['light']}>
              To correctly measure waist circumference:
            </h3>
            <ul className={primaryStyles['waist-instructions']}>
              <li>Stand and place a tape measure around your middle, just above your hipbones.</li>
              <li>Make sure tape is horizontal around the waist.</li>
              <li>Keep the tape snug around the waist, but not compressing the skin.</li>
              <li>Measure your waist just after you breathe out.</li>
            </ul>
            <input
              onWheel={(e) => e.currentTarget.blur()}
              type="number"
              className={formStyles['input']}
              placeholder="ex: 11"
              value={values.waistValue}
              onChange={(ev) => {
                onValuesChanged({
                  waistValue: ev.target.value ? parseFloat(ev.target.value) : undefined,
                  waistUnit: HeightEnum.IN
                })
              }}
            />
          </div>
        }
        <div className={formStyles['input__measure']}>
          <h3 className={formStyles['med']}>Systolic Blood Pressure (mmHg)</h3>
          <h3 className={formStyles['light']}>
            Blood Pressure consists of two numbers, systolic (top number) and diastolic (bottom number. Blood pressure
            greater than 130/80 mm is considered high. People with blood pressure over 140/90 should be seen by their
            healthcare provider. If your blood pressure is over 170 systolic, you should seek medical attention
            immediately.
          </h3>

          <CustomSlider rangeSliderConfig={RangeSliderConfig[0]}
                        value={values.sbd || RangeSliderConfig[0].min}
                        applySecondary={false}
                        onValueChanged={(sbd) => onValuesChanged({sbd})}/>

          <CustomSlider rangeSliderConfig={RangeSliderConfig[5]}
                        value={values.diastolicBP || RangeSliderConfig[5].min}
                        applySecondary={true}
                        onValueChanged={(diastolicBP) => onValuesChanged({diastolicBP})}/>
        </div>
      </div>
    </div>
  )
}

export default MeasurementsStepComponent
