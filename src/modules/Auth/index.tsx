import {FC} from "react";
import {Outlet} from "react-router-dom";


const AuthRoot: FC<any> = (props) => {
  return (
    <Outlet/>
  )
}

export default AuthRoot;
