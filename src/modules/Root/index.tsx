import {Outlet} from "react-router-dom";
import {FC} from "react";
import FooterComponent from "./components/footer.component";
import HeaderComponent from "./components/header.component";
import styles from "./index.module.scss";

interface IProps {

}

const Root: FC<IProps> = (props) => {
  return (
    <div className={styles.container}>
      <HeaderComponent/>
      <main className={styles.main}>
        <Outlet/>
      </main>
      <FooterComponent/>
    </div>
  )
}

export default Root;
