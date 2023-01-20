import {FC, ReactElement} from "react";
import styles from "../../styles/index.module.scss";

interface IProps {
  title: string;
  body: ReactElement,
  finePrint?: string;
}

const WelcomeStep: FC<IProps> = (props) => {
  const {title, body, finePrint} = props;
  return (
    <div className={`${styles['step']} ${styles['first']}`}>
      <h2 className={`${styles['h2']}`}>{title}</h2>
      <p>{body}</p>
      <br/>
      {
        finePrint &&
        <span className={styles['finePrint']}>
        {finePrint}
        </span>
      }

    </div>
  )
}

export default WelcomeStep
