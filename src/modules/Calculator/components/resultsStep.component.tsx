import primaryStyles from '../../../shared/styles/index.module.scss'
import {FC, useEffect, useState} from "react";
import {IVitalityScoreData} from "../interfaces/vitalityScoreData.interface";
import {toCentimeters, toKilograms} from "../../../shared/helpers/transformValues";
import {BMIAdult, BMIZscore} from "../../../shared/helpers/calculateBmi";
import {calculateMss, ICalculateMssParams, ICalculateMssResponse} from "../../../shared/helpers/calculateMss";
import PowerMeImage from '../../../assets/images/powerme.png'
//@ts-ignore
import Loading from 'react-fullscreen-loading';
import VitalityScoreComponent from "./VitalityScore";
import IdealVitalityScoreComponent from "./IdealVitalityScore";
import {ILifeOmicPatient} from "../../../shared/services/lifeOmic/interfaces/LifeOmicPatient.interface";
import {ApplicationAuth, CreateMeasurement} from "../../../shared/services/doTerra";
import {notification} from "antd";
import MetabolicScore from "./MetabolicScore";
import {getPatient} from "../../../shared/services/lifeOmic/patient";
import {useNavigate} from "react-router-dom";
import {saveObservation} from "../../../shared/services/lifeOmic/saveData";
import {DateTime} from "luxon";

interface IProps {
  values: IVitalityScoreData;
  onRetakePressed: () => void;
}

const ResultsStepComponent: FC<IProps> = (props) => {
  const {values, onRetakePressed} = props;
  const navigate = useNavigate();
  const [metabolicAge, setMetabolicAge] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<ICalculateMssResponse | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [scoreSent, setScoreSent] = useState<boolean>(false);
  const [patient, setPatient] = useState<ILifeOmicPatient | undefined>(undefined);

  useEffect(() => {
    if (values && values.weightValue && values.weightUnit && values.feet && (typeof values.inches === 'number')) {
      const weightKG = toKilograms({value: values.weightValue, unit: values.weightUnit});
      // const heightMeters = toMeters({value: values.weightValue, unit: HeightEnum.IN});
      const heightMeters = values.feet * 0.3048 + values.inches * 0.0254
      console.log(heightMeters)
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
        setLoading(false);
      } catch (e) {
        console.log(e)
        setLoading(false);

      }
    }
  }, [values]);

  useEffect(() => {
    getPatient()
      .then(setPatient)
      .catch(error => {
        notification.open({
          message: 'Error',
          description: error || 'Error getting the patient',
          type: 'error'
        });
      })
  }, []);

  const sendInformationToTheApi = async () => {
    try {
      if (scoreSent) {
        await notification.error({message: `Score already sent`, description: `The score was already saved`})
        return;
      }
      setLoading(true);
      const loginResponse = await ApplicationAuth();
      if (patient && loginResponse) {
        const vscore = Math.floor(score);
        const date = DateTime.now().toISO();
        await saveObservation({date, vitalityScore: vscore, patientId: patient.id})
        await CreateMeasurement({
          patientId: patient.id,
          score: vscore,
          metabolicAge,
          bmiz: result?.mets_z_bmi,
          ...values
        }, loginResponse.accessToken);

        setScoreSent(true);

      } else {
        setLoading(false);
        notification.error({message: `There's no patient information to save the score`});
      }

    } catch (e) {

    }
    setLoading(false);
  }


  return (
    <>
      <div className={primaryStyles['step__outer']}>
        <Loading loading={loading} background={"rgba(0,0,0,0.3)"} loaderColor="#F2644E"/>
        {
          result?.mets_z_bmi &&
          <VitalityScoreComponent score={result.mets_z_bmi} primary={true} onScoreCalculated={setScore}/>
        }
        <MetabolicScore values={values} onMetabolicAge={setMetabolicAge}/>
        <div className={`${primaryStyles['btn-container']} `}>
          <button
            onClick={() => navigate('/apps/history')}
            className={`${primaryStyles['btn']} ${primaryStyles['btn__results']} ${primaryStyles['btn__results__margin-bottom']}`}>
            View History
          </button>
          <button onClick={sendInformationToTheApi}
                  className={`${primaryStyles['btn']} ${primaryStyles['btn__results']}`}
                  disabled={score === 0 || patient === undefined || scoreSent}>
            Save Score
          </button>
        </div>
        <div className={`${primaryStyles['step']} `}>
          <h2>What Your Results Mean </h2>
          <h3 className={`${primaryStyles['light']}`}>
            Your Vitality Score indicates your current metabolic health status compared to other adults in the US
            population.
            <br/>
            <br/>
            A score of 50 suggests that you are of average health and have an average risk for developing metabolic
            health problems in the future. The higher your score, suggests better overall metabolic health. The good
            news is that healthy lifestyle changes and smart supplementation can improve your Vitality Score over time.
          </h3>
        </div>
        <IdealVitalityScoreComponent oldValues={values}/>
        <div className={`${primaryStyles['btn-container']}`}>
          <button onClick={onRetakePressed}
                  className={`${primaryStyles['btn']} ${primaryStyles['btn__results']} ${primaryStyles['btn__results__margin-bottom']}`}>
            Retake Your Vitality Score
          </button>
        </div>

        <div className={`${primaryStyles['step']} ${primaryStyles['add']}`}>
          <div className={primaryStyles['step__image']}>
            <img src={PowerMeImage} alt="powerme"/>
          </div>
          <div className={primaryStyles['step__content']}>
            <h2>To Learn More</h2>
            <h3 className={primaryStyles['light']}>
              To better understand your health,{" "}
              <a href="https://apps.powerme.health/shop">
                purchase a PowerMe "Vitality Test Kit"
              </a>
            </h3>
            <h3 className={primaryStyles['light']}>
              To find resources on bettering your health outcomes,{" "}
              <a href="http://powermeacademy.flywheelsites.com/">
                visit the PowerMe Academy
              </a>
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultsStepComponent
