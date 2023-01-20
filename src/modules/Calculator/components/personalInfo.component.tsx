import primaryStyles from '../../../shared/styles/index.module.scss'
import formStyles from '../pages/form.module.scss'
import {FC} from "react";
import {EthnicityEnum} from "../../../shared/enums/ethnicity.enum";
import SexSelector from "./SexSelector/index.component";
import {SexEnum} from "../../../shared/enums/sex.enum";
import EthnicitySelector from "./EthnicitySelector/index.component";

interface IPersonalInfoValues {
  age?: number;
  sex?: SexEnum;
  ethnicity?: EthnicityEnum;
  extraRace?: string;
}

interface IProps {
  values: IPersonalInfoValues,
  onValuesChanged: (values: IPersonalInfoValues) => void;
  insideOnePageForm?: boolean;
}

const PersonalInfoComponent: FC<IProps> = (props) => {
  const {onValuesChanged, values, insideOnePageForm} = props;

  return (
    <div
      className={`${primaryStyles['step']} ${primaryStyles['second']} ${insideOnePageForm ? `!border-0 ${primaryStyles['content-none']}` : ''}`}>
      {!insideOnePageForm &&
        <>
          <h2>Tell Us About Yourself</h2>
          <h3 className={primaryStyles['light']}>
            Your age, sex at birth, and ethnicity contribute to the baseline data for the creation of your Vitality
            Score.
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
        <h3 className={formStyles['med']}>Sex assigned at birth:</h3>
        <SexSelector onChange={sex => onValuesChanged({sex})} selected={values.sex}/>
        <h3 className={formStyles['med']}>
          Which of the following best describes you? Select all that apply.{" "}
        </h3>
        <EthnicitySelector onChange={(ethnicity) => onValuesChanged({ethnicity})} selected={values.ethnicity}
                           onExtraRace={(extraRace) => onValuesChanged({extraRace})}/>
      </div>
    </div>
  )
}

export default PersonalInfoComponent
