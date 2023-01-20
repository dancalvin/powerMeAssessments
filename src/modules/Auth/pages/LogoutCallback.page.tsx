import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";


const LogoutCallbackPage: FC<any> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate('/');
  }, [navigate]);
  return <div><p>login you out!.....</p></div>
}

export default LogoutCallbackPage;
