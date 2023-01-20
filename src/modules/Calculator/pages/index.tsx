import {FC, useEffect, useMemo, useState} from "react";
import StepHeaderComponent from "../../../shared/components/StepHeader";
import styles from '../../../shared/styles/index.module.scss';
import PersonalInfoComponent from "../components/personalInfo.component";
import MeasurementsStepComponent from "../components/measurementsStep.component";
import LabStepComponent from "../components/labStep.component";
import ResultsStepComponent from "../components/resultsStep.component";
import {IVitalityScoreData} from "../interfaces/vitalityScoreData.interface";
import {ILifeOmicPatient} from "../../../shared/services/lifeOmic/interfaces/LifeOmicPatient.interface";
import {useNavigate} from "react-router-dom";
import {DEFAULT_VALUES} from "../const/formDefaultValues";
import {getPatient} from "../../../shared/services/lifeOmic/patient";
import {notification} from "antd";
import WelcomeStep from "../../../shared/components/WelcomeStep";
import {IStepHeader} from "../../../shared/components/StepHeader/interfaces/StepHeader.interface";


interface IProps {
}

const Calculator: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<ILifeOmicPatient | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [values, setValues] = useState<IVitalityScoreData>(DEFAULT_VALUES);
  const steps: IStepHeader[] = useMemo(() => {
    return [{title: "Intro", number: 1}, {title: "Tell Us About Yourself", number: 2}, {
      title: "Measurements",
      number: 3
    }, {
      title: "Lab Values",
      number: 4
    }, {title: "Results", number: 5}]
  }, []);
  const classNames: string[] = useMemo(() => {
    return ["first", "second", "third", "fourth", "fifth"];
  }, []);


  const _handleContinue = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'auto'});
    setCurrentStep(currentStep + 1);
  }

  const _handleBack = () => {
    window.scrollTo({top: 0, behavior: 'auto'});
    setCurrentStep(currentStep - 1);
  }

  const _handleGoToHistory = () => {
    navigate('/apps/history');
  }

  const resetForm = () => {
    setValues(DEFAULT_VALUES);
    setCurrentStep(0);
  }

  const _isDisabled = (): boolean => {
    if (currentStep === 1) {
      return false;
    }
    if (currentStep === 2) {

      if (values.age && values.sex && values.ethnicity) {
        return false;
      }
    }

    if (currentStep === 3) {
      if (values.weightValue && (typeof values.inches === 'number') && values.feet && values.sbd && values.waistValue) {
        return false;
      }
    }
    if (currentStep === 4){
      if (values.hdl && values.triglycerides && values.fastingGlucose) {
        return false;
      }
    }
    return true;
  }

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
  return (
    <div className={styles['steps']}>

      <div className={styles['steps__inner']}>
        <div className={`${styles['title-container']} ${styles[`title-container__${classNames[currentStep]}`]}`}>
          <h1>
            Calculate your Vitality score
          </h1>
        </div>
        <div className={`${styles['auto__container']}`}>
          <StepHeaderComponent currentStep={currentStep} steps={steps}/>
          {currentStep === 1 && <WelcomeStep
            body={<>Your Vitality Score indicates your current metabolic health status compared to other adults in the
              US
              population.
              <br/>
              <br/>
              A score of 50 suggests that you have an average risk for developing metabolic health problems in the
              future. A
              higher score indicates better overall metabolic health anda lower risk of developing future disease. The
              good
              news is that healthy lifestyle changes and smart supplementation can improve your Vitality Score over
              time.</>}
            title={"Welcome to the Vitality Score Calculator"}
            finePrint={"Vitality Score is based on algorithms developed by MetsCalc.org. Ranges are based on NHAINES data gathered by CDC"}/>}
          {currentStep === 2 &&
            <PersonalInfoComponent values={{sex: values.sex, ethnicity: values.ethnicity, age: values.age}}
                                   onValuesChanged={(val) => setValues({...values, ...val})}
            />}
          {
            currentStep === 3 &&
            <MeasurementsStepComponent
              age={values.age || 21}
              onValuesChanged={(val) => setValues({...values, ...val})}
              values={{
                feet: values.feet,
                inches: values.inches,
                waistValue: values.waistValue,
                weightValue: values.weightValue,
                weightUnit: values.weightUnit,
                sbd: values.sbd,
                diastolicBP: values.diastolicBP
              }}/>
          }
          {
            currentStep === 4 &&
            <LabStepComponent
              values={{
                hdl: values.hdl,
                triglycerides: values.triglycerides,
                fastingGlucose: values.fastingGlucose,
                ac1: values.ac1
              }}
              onValuesChanged={(val) => setValues({...values, ...val})}
            />
          }
          {
            currentStep === 5 &&
            <ResultsStepComponent values={values} onRetakePressed={resetForm}/>
          }
          <div className={`${styles['btn-container']} ${styles['btn-container__with-gap']}`}>
            {
              currentStep < 5 &&
              <button className={`${styles['btn']} ${styles['btn__continue']}`} disabled={_isDisabled()}
                      onClick={_handleContinue}>Continue
              </button>
            }
            {
              currentStep === 1 &&
              <button className={`${styles['btn']} ${styles['btn__back']} `}
                      disabled={!patient}
                      onClick={_handleGoToHistory}>See Your Vitality Score History
              </button>
            }
            {
              (currentStep > 1 && currentStep < 5) &&
              <button className={`${styles['btn']} ${styles['btn__back']}`} onClick={_handleBack}>Back
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
