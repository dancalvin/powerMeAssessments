import {FC} from "react";
import Logo from '../../../assets/images/logo.png'
import styles from "../index.module.scss";

interface IProps {

}

const HeaderComponent: FC<IProps> = (props) => {
  return (
    <header className={styles['header']}>
      <div className={styles['header__inner']}>
        <div className={styles['header__inner-logo']}>
          <img src={Logo} alt="logo"/>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent;
