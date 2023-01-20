import {FC, useEffect, useState} from "react";
import {IVitalityScoreData} from "../../interfaces/vitalityScoreData.interface";
import {DEFAULT_VALUES} from "../../const/formDefaultValues";
import PersonalInfoComponent from "../personalInfo.component";
import MeasurementsStepComponent from "../measurementsStep.component";
import LabStepComponent from "../labStep.component";
import primaryStyles from '../../../../shared/styles/index.module.scss';
import styles from '../../../../shared/styles/index.module.scss';
import {DatePicker, notification} from "antd";
import moment from "moment";
import {calculateMss, ICalculateMssParams} from "../../../../shared/helpers/calculateMss";
import {toCentimeters, toKilograms} from "../../../../shared/helpers/transformValues";
import {BMIAdult, BMIZscore} from "../../../../shared/helpers/calculateBmi";
import {MassEnum} from "../../../../shared/enums/mass.enum";
import {ILifeOmicPatient} from "../../../../shared/services/lifeOmic/interfaces/LifeOmicPatient.interface";
import {ApplicationAuth, CreateMeasurement, UpdateMeasurement} from "../../../../shared/services/doTerra";
import {PercentileMss} from "../../../../shared/helpers/percentile";
import {metabolicAgeCalc} from "../../../../shared/helpers/metabolicAgeCalc";
//@ts-ignore
import Loading from 'react-fullscreen-loading';
import {DateTime} from "luxon";
import {saveObservation} from "../../../../shared/services/lifeOmic/saveData";

interface IProps {
  onClose: () => void;
  onItemSaved: (item: IVitalityScoreData) => void;
  onItemUpdated: (item: IVitalityScoreData) => void;
  item?: IVitalityScoreData;
  patient?: ILifeOmicPatient;
}

const CreateEditVitalityItemModal: FC<IProps> = (props) => {
  const {onClose, item, patient, onItemSaved, onItemUpdated} = props;
  const [formValues, setFormValues] = useState<IVitalityScoreData>(DEFAULT_VALUES);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSaveOrUpdate = async () => {
    setLoading(true);
    const weightKG = toKilograms({value: formValues.weightValue || 0, unit: formValues.weightUnit || MassEnum.LBS});
    const heightMeters = (formValues.feet || 0) * 0.3048 + (formValues.inches || 0) * 0.0254

    const bmiAdult = BMIAdult({weight: weightKG, height: heightMeters});
    let bmiZ = 0
    if (formValues.age && formValues.age < 2 && formValues.sex) {
      const ageInMonths = formValues.age * 12;
      bmiZ = BMIZscore({
        age: ageInMonths,
        sex: formValues.sex,
        weight: weightKG,
        height: heightMeters
      });
    }
    if (formValues.age && formValues.sex && formValues.ethnicity && formValues.hdl && formValues.sbd && formValues.triglycerides && formValues.fastingGlucose) {

      const params: ICalculateMssParams = {
        age: formValues.age,
        sex: formValues.sex,
        ethnicity: formValues.ethnicity,
        bmi: bmiAdult,
        hdl: formValues.hdl,
        sbp: formValues.sbd,
        triglyceride: formValues.triglycerides,
        glucose: formValues.fastingGlucose,
        bmiZScore: bmiZ,
        waist: formValues.waistValue && formValues.waistUnit && formValues.age >= 20 ? toCentimeters({
          unit: formValues.waistUnit,
          value: formValues.waistValue
        }) : undefined
      }
      const result = calculateMss(params);
      const percentileMss = PercentileMss(result.mets_z_bmi || 0);
      const score = ((percentileMss - 100) * -1)
      const metabolicAge = metabolicAgeCalc(formValues)
      try {
        const loginResponse = await ApplicationAuth();
        if (patient && loginResponse) {
          if (item) {
            const measurement = await UpdateMeasurement(item.id, {
              score: Math.floor(score),
              metabolicAge,
              bmiz: result.mets_z_bmi,
              ...formValues
            }, loginResponse.accessToken);
            onItemUpdated(measurement);
          } else {
            const vscore = Math.floor(score)
            const measurement = await CreateMeasurement({
              patientId: patient.id,
              score: vscore,
              metabolicAge,
              bmiz: result.mets_z_bmi,
              ...formValues
            }, loginResponse.accessToken);
            let date = DateTime.now();
            if(formValues.date){
              date = DateTime.fromISO(formValues.date);
            }
            await saveObservation({date:date.toISO(), vitalityScore: vscore, patientId: patient.id})
            onItemSaved(measurement)
          }
        } else {
          setLoading(false);
          notification.error({message: `There's no patient information to save the score`});
        }

      } catch (e) {
        notification.error({message: `There's been an error sending the information to the DoTerra API`});
      }
    }
    setLoading(false);
  }

  const isValid = (): boolean => {
    if (formValues.age && formValues.sex && formValues.ethnicity && formValues.weightValue && (typeof formValues.inches === 'number') && formValues.feet && formValues.sbd && formValues.waistValue && formValues.hdl && formValues.triglycerides && formValues.fastingGlucose) {
      return true
    }
    return false;
  }

  useEffect(() => {
    if (item) {
      setFormValues({...item});
    }
  }, [item]);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 m-7 max-[540px]:m-0">
      <Loading loading={loading} background={"rgba(0,0,0,0.3)"} loaderColor="#F2644E"/>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 -z-[1] flex items-center justify-center bg-black opacity-[0.65]"
        onClick={onClose}
      />

      <div
        className="relative mx-auto h-full w-full max-w-[1080px] overflow-auto bg-secondary pb-16 max-[540px]:px-[30px]">
        <div
          className="absolute top-5 right-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1px]"
          onClick={onClose}
        >
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8267 12.9723L7.20797 9.35357L3.67244 12.8891L0.989592 10.2063L4.52513 6.67072L0.927201 3.0728L3.46447 0.535534L7.06239 4.13346L10.5979 0.597925L13.2808 3.28077L9.74524 6.8163L13.364 10.435L10.8267 12.9723Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="px-[96px] pt-[100px] max-[840px]:px-[70px] max-[700px]:px-[40px] max-[540px]:px-0">
          <h2 className="font-montserrat text-3xl capitalize leading-[34px] max-[540px]:text-2xl">
            Add historical data to calculate a vitality score
          </h2>

          <div className="mt-12">
            <DatePicker
              value={formValues.date ? moment(formValues.date, 'YYYY-MM-DD') : moment()}
              onChange={(val, date) => {
                setFormValues({...formValues, date})
              }} className={'bg-transparent'}/>
          </div>
        </div>

        <div className="max-[540px]:my-[40px]">
          <PersonalInfoComponent values={{sex: formValues.sex, ethnicity: formValues.ethnicity, age: formValues.age}}
                                 insideOnePageForm={true}
                                 onValuesChanged={(val) => setFormValues({...formValues, ...val})}
          />
          <MeasurementsStepComponent
            insideOnePageForm={true}
            age={formValues.age || 21}
            onValuesChanged={(val) => setFormValues({...formValues, ...val})}
            values={{
              feet: formValues.feet,
              inches: formValues.inches,
              waistValue: formValues.waistValue,
              weightValue: formValues.weightValue,
              weightUnit: formValues.weightUnit,
              sbd: formValues.sbd,
              diastolicBP: formValues.diastolicBP
            }}/>
          <LabStepComponent
            insideOnePageForm={true}
            values={{
              hdl: formValues.hdl,
              triglycerides: formValues.triglycerides,
              fastingGlucose: formValues.fastingGlucose,
              ac1: formValues.ac1
            }}
            onValuesChanged={(val) => setFormValues({...formValues, ...val})}
          />
        </div>

        <div
          className="flex items-center justify-end gap-4 px-[96px] max-[840px]:flex-col  max-[840px]:justify-center max-[840px]:px-[70px] max-[700px]:px-[40px] max-[540px]:px-0">
          <button
            type="button"
            className={`${styles['btn']} ${styles['btn__back']}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${primaryStyles['btn']} ${primaryStyles['btn__continue']}`}
            disabled={!isValid()}
            onClick={handleSaveOrUpdate}
          >
            {item ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
};

export default CreateEditVitalityItemModal
