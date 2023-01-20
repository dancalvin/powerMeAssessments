import {EthnicityEnum} from "../../../../shared/enums/ethnicity.enum";
import {FC} from "react";
import formStyles from '../../pages/form.module.scss';

interface IProps {
  selected?: EthnicityEnum;
  onChange: (value: EthnicityEnum) => void;
  onExtraRace: (value: string) => void;
}

const EthnicitySelector: FC<IProps> = (props) => {
  const {selected, onChange, onExtraRace} = props;

  return (
    <div className={formStyles['input__checkbox']}>
      <div className={formStyles['input__checkbox-item']}>
        <input type="checkbox" id={EthnicityEnum.ASIAN} name="ethnicity"
               onChange={() => onChange(EthnicityEnum.ASIAN)}
               value={EthnicityEnum.ASIAN} checked={selected === EthnicityEnum.ASIAN}/>
        <label htmlFor=""></label>
        <span>Asian</span>
      </div>
      <div className={formStyles['input__checkbox-item']}>
        <input type="checkbox" id={EthnicityEnum["PACIFIC-ISLANDER"]} name="ethnicity"
               onChange={() => onChange(EthnicityEnum["PACIFIC-ISLANDER"])}
               value={EthnicityEnum["PACIFIC-ISLANDER"]} checked={selected === EthnicityEnum["PACIFIC-ISLANDER"]}/>
        <label htmlFor=""></label>
        <span>Pacific Islander</span>
      </div>
      <div className={formStyles['input__checkbox-item']}>
        <input type="checkbox" id={EthnicityEnum["NON-HISPANIC-WHITE"]} name="ethnicity"
               onChange={() => onChange(EthnicityEnum["NON-HISPANIC-WHITE"])}
               value={EthnicityEnum["NON-HISPANIC-WHITE"]} checked={selected === EthnicityEnum["NON-HISPANIC-WHITE"]}/>
        <label htmlFor=""></label>
        <span>White or Caucasian</span>
      </div>
      <div className={formStyles['input__checkbox-item']}>
        <input type="checkbox" id={EthnicityEnum["NON-HISPANIC-BLACK"]} name="ethnicity"
               onChange={() => onChange(EthnicityEnum["NON-HISPANIC-BLACK"])}
               value={EthnicityEnum["NON-HISPANIC-BLACK"]} checked={selected === EthnicityEnum["NON-HISPANIC-BLACK"]}/>
        <label htmlFor=""></label>
        <span>Black of African American</span>
      </div>
      <div className={formStyles['input__checkbox-item']}>
        <input type="checkbox" id={EthnicityEnum.HISPANIC} name="ethnicity"
               onChange={() => onChange(EthnicityEnum.HISPANIC)}
               value={EthnicityEnum.HISPANIC} checked={selected === EthnicityEnum.HISPANIC}/>
        <label htmlFor=""></label>
        <span>Hispanic of Latino</span>
      </div>
      <div className={formStyles['input__checkbox-item']}>
        <input type="checkbox" id={EthnicityEnum["NATIVE-AMERICAN"]} name="ethnicity"
               onChange={() => onChange(EthnicityEnum["NATIVE-AMERICAN"])}
               value={EthnicityEnum["NATIVE-AMERICAN"]} checked={selected === EthnicityEnum["NATIVE-AMERICAN"]}/>
        <label htmlFor=""></label>
        <span>Native American or Native Alaskan</span>
      </div>
      <div className={formStyles['input__checkbox-item']}>
        <input type="checkbox" id={EthnicityEnum['MULTI-RACIAL']} name="ethnicity"
               onChange={() => onChange(EthnicityEnum["MULTI-RACIAL"])}
               value={EthnicityEnum["MULTI-RACIAL"]} checked={selected === EthnicityEnum["MULTI-RACIAL"]}/>
        <label htmlFor=""></label>
        <span>Multiracial or Biracial</span>
      </div>
      <div className={formStyles['input__checkbox-item']}>
        <input type="checkbox" id={EthnicityEnum["NOT-LISTED"]} name="ethnicity"
               onChange={() => onChange(EthnicityEnum["NOT-LISTED"])}
               value={EthnicityEnum["NOT-LISTED"]} checked={selected === EthnicityEnum["NOT-LISTED"]}/>
        <label htmlFor=""></label>
        <span>
                A race/ethnicity not listed here (please specify below)
              </span>
      </div>
      <input
        type="text"
        className={formStyles['input']}
        disabled={selected !== EthnicityEnum["NOT-LISTED"]}
        placeholder="Unspecified race/ethnicity"
        onChange={(ev) => onExtraRace(ev.target.value)}
      />
    </div>
  )
}

export default EthnicitySelector
