import {FC} from "react";
import FooterLogo from '../../../assets/images/footer-logo.png'
import styles from "../index.module.scss";

interface IProps {

}

const FooterComponent: FC<IProps> = (props) => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__inner']}>
        <div className={styles['footer__inner-logo']}>
          <img src={FooterLogo} alt="logo"/>
        </div>
        <div className={styles['footer__inner-created']}>
          Prime Meridian Healthcare 2022
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent;
