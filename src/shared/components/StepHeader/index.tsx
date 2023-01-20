import styles from "../../styles/index.module.scss";
import {FC} from "react";
import {IStepHeader} from "./interfaces/StepHeader.interface";

interface IProps {
  currentStep: number;
  steps: IStepHeader[];
}

const StepHeaderComponent: FC<IProps> = (props) => {
  const {currentStep, steps} = props;
  return (
    <div className={styles['steps__line']}>
      {
        steps.map(step => (
          <div className={styles['steps__item']}>
            <div
              className={`${styles['steps__item-circle']} ${(currentStep === step.number ? styles['fill'] : "")}`}>{step.number}</div>
            <p
              className={`${styles['steps__item-title']} ${currentStep === step.number ? styles['active'] : ""}`}>{step.title}</p>
          </div>
        ))
      }
    </div>
  )
}

export default StepHeaderComponent;
