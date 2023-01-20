import {FC, useEffect, useMemo, useState} from "react";
import {LOAuth} from "@lifeomic/app-tools";
import {useNavigate} from "react-router-dom";
//@ts-ignore
import Loading from 'react-fullscreen-loading';

const CallbackPage: FC<any> = () => {

  const navigate = useNavigate();
  const appAuth = useMemo(() => {
    return new LOAuth({
      clientId: '7gp49ppq1p10io8r2jlae9h20n',
      authorizationUri: 'https://lifeomic-prod-us.auth.us-east-2.amazoncognito.com/oauth2/authorize',
      accessTokenUri: 'https://lifeomic-prod-us.auth.us-east-2.amazoncognito.com/oauth2/token',
      redirectUri: 'http://localhost:8080/callback',
      logoutUri: 'https://lifeomic-prod-us.auth.us-east-2.amazoncognito.com/logout',
      logoutRedirectUri: 'http://localhost:8080/logout',
      scopes: ['openid'],
    });
  }, []);

  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (appAuth) {
      appAuth.startAutomaticTokenRefresh().then(() => {
        setAccessToken(appAuth.getAccessToken());
      });
    }
  }, [appAuth]);


  useEffect(() => {
    if (accessToken && navigate) {
      navigate('/')
    }
  }, [accessToken, navigate])

  if (!accessToken) {
    return <Loading loading background={"rgba(238, 238, 238, 0.5)"} loaderColor={'#F2644E'}/>
  }
  return <div><p>Authenticated</p></div>
}

export default CallbackPage;
