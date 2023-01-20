import {FC} from "react";
import {ITellUsAboutYourself} from "./interfaces/tellUsAboutYourself.interface";
import primaryStyles from "../../../../shared/styles/index.module.scss";
import formStyles from "../../../Calculator/pages/form.module.scss";
import SexSelector from "../../../Calculator/components/SexSelector/index.component";
import {MassEnum} from "../../../../shared/enums/mass.enum";

interface IProps {
  values: ITellUsAboutYourself;
  onValuesChanged: (values: ITellUsAboutYourself) => void;
  insideOnePageForm?: boolean;
}

const TellUsAboutYourselfComponent: FC<IProps> = (props) => {
  const {onValuesChanged, values, insideOnePageForm} = props;
  return (
    <div
      className={`${primaryStyles['step']} ${primaryStyles['second']} ${insideOnePageForm ? `!border-0 ${primaryStyles['content-none']}` : ''}`}>
      {!insideOnePageForm &&
        <>
          <h2>Tell Us About Yourself</h2>
          <h3 className={primaryStyles['light']}>
            Your age, weight, and sex at birth contribute to the baseline data for the creation of your Heart-Fit Score.
          </h3>
        </>
      }
      <div className={formStyles['form']}>
        <h3 className={formStyles['med']}>How old are you?</h3>
        <div className={formStyles['input__calendar']}>
          <input
            onWheel={(e) => e.currentTarget.blur()}
            type="number"
            className={formStyles['input']}
            placeholder="40"
            value={values.age}
            onChange={ev => {
              onValuesChanged({age: ev.target.value ? parseInt(ev.target.value) : undefined})
            }}
          />
        </div>
        <h3 className={formStyles['med']}>Weight (lbs)</h3>
        <div className={formStyles['input__measure']}>
          <input
            onWheel={(e) => e.currentTarget.blur()}
            type="number"
            className={formStyles['input']}
            placeholder="ex: 180"
            value={values.weight}
            onChange={(ev) => {
              onValuesChanged({
                weight: ev.target.value ? parseInt(ev.target.value) : undefined,
                weightUnit: MassEnum.LBS
              })
            }}
          />
        </div>
        <h3 className={formStyles['med']}>Sex assigned at birth:</h3>
        <SexSelector onChange={sex => onValuesChanged({sex})} selected={values.sex}/>
      </div>
    </div>
  )
}

export default TellUsAboutYourselfComponent;
