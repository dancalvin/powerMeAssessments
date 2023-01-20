import {FC, useEffect, useMemo, useState} from "react";
import {LOAuth} from "@lifeomic/app-tools";
import Calculator from "./index";


const LocalAuthCalcPage: FC<any> = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
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
  }, [])

  useEffect(() => {
    if (appAuth) {
      appAuth.startAutomaticTokenRefresh()
        .then(() => {
          setAccessToken(appAuth.getAccessToken());
        });
    }
  }, [appAuth]);

  useEffect(() => {

  }, [accessToken])


  return (
    <Calculator/>
  )
}

export default LocalAuthCalcPage;
