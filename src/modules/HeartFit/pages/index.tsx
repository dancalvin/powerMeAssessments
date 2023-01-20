import {FC, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ILifeOmicPatient} from "../../../shared/services/lifeOmic/interfaces/LifeOmicPatient.interface";
import {getPatient} from "../../../shared/services/lifeOmic/patient";
import {notification} from "antd";
import styles from "../../../shared/styles/index.module.scss";
import StepHeaderComponent from "../../../shared/components/StepHeader";
import {IStepHeader} from "../../../shared/components/StepHeader/interfaces/StepHeader.interface";
import WelcomeStep from "../../../shared/components/WelcomeStep";
import {IHeartFitData} from "../interfaces/heartFitData.interface";
import {HEART_FIT_DEFAULT_VALUES} from "../const/formDefaultValues";
import TellUsAboutYourselfComponent from "../components/TellUsAboutYourselfComponent";


interface IProps {

}

const HeartFit: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<ILifeOmicPatient | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [values, setValues] = useState<IHeartFitData>(HEART_FIT_DEFAULT_VALUES);
  const steps: IStepHeader[] = useMemo(() => {
    return [{title: "Intro", number: 1}, {title: "Tell Us About Yourself", number: 2}, {
      title: "Test Yourself",
      number: 3
    }, {
      title: "Results",
      number: 4
    }, {title: "Goal", number: 5}]
  }, []);
  const classNames: string[] = useMemo(() => {
    return ["first", "second", "third", "fourth", "fifth"];
  }, []);

  const _isDisabled = (): boolean => {
    if (currentStep === 1) {
      return false;
    }
    return true;
  }

  const _handleContinue = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'auto'});
    setCurrentStep(currentStep + 1);
  }

  const _handleBack = () => {
    window.scrollTo({top: 0, behavior: 'auto'});
    setCurrentStep(currentStep - 1);
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
            Calculate your heart-fit score <br/> (Vo2 Max)
          </h1>
        </div>
        <div className={`${styles['auto__container']}`}>
          <StepHeaderComponent currentStep={currentStep} steps={steps}/>
        </div>
      </div>
      <div className={`${styles['auto__container']}`}>
        {currentStep === 1 && <WelcomeStep
          body={<>
            Your Heart-Fit Score or VO2 max, is a basic number describing your
            general cardiovascular health. <br/>
            <br/>
            For a Female between the ages of 40-49 a “Good” score is between
            29.0-32.8. For a Male between the ages of 40-49 a “Good” score is
            slightly different ranging 39.0-43.7. Heart-Fit Score simply refers to
            the maximum amount of oxygen that you can utilize during intense
            exercise.
          </>}
          title={"Welcome to the Heart-Fit Score Calculator"}
        />}
        {
          currentStep === 2 && <TellUsAboutYourselfComponent values={values} onValuesChanged={setValues}/>
        }
        <div className={`${styles['btn-container']} ${styles['btn-container__with-gap']}`}>
          {
            currentStep < 5 &&
            <button className={`${styles['btn']} ${styles['btn__continue']}`} disabled={_isDisabled()}
                    onClick={_handleContinue}>Continue
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default HeartFit;
