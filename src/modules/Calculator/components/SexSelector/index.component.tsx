import formStyles from "../../pages/form.module.scss";
import {SexEnum} from "../../../../shared/enums/sex.enum";
import {FC} from "react";

interface IProps {
  selected?: SexEnum;
  onChange: (value: SexEnum) => void;
}

const SexSelector: FC<IProps> = (props) => {
  const {selected, onChange} = props;
  return (
    <div className={formStyles['input__radio']}>
      <div className={formStyles['input__radio-item']}>
        <input
          checked={selected === SexEnum.FEMALE}
          type="radio"
          name="radio"
          value={SexEnum.FEMALE}
          onClick={() => onChange(SexEnum.FEMALE)}
        />
        <label htmlFor=""></label>
        <span>Female</span>
      </div>
      <div className={formStyles['input__radio-item']}>
        <input
          checked={selected === SexEnum.MALE}
          type="radio"
          name="radio"
          value={SexEnum.MALE}
          onClick={() => onChange(SexEnum.MALE)}
        />
        <label htmlFor=""></label>
        <span>Male</span>
      </div>
      <div className={formStyles['input__radio-item']}>
        <input
          checked={selected === SexEnum.INTERSEX}
          type="radio"
          name="radio"
          value={SexEnum.INTERSEX}
          onClick={() => onChange(SexEnum.INTERSEX)}
        />
        <label htmlFor=""></label>
        <span>Intersex</span>
      </div>
      <div className={formStyles['input__radio-item']}>
        <input
          checked={selected === SexEnum.NOT_DISCLOSE}
          type="radio"
          name="radio"
          value={SexEnum.NOT_DISCLOSE}
          onClick={() => onChange(SexEnum.NOT_DISCLOSE)}
        />
        <label htmlFor=""></label>
        <span>Prefer not to disclose</span>
      </div>
    </div>
  )
}

export default SexSelector;
