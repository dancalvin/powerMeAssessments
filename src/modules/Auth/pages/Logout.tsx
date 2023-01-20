import {FC, useEffect, useMemo} from "react";
import {LOAuth} from "@lifeomic/app-tools";

const Logout: FC<any> = (props) => {
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

  useEffect(() => {
    if (appAuth) {
      appAuth.logout();
    }
  }, [appAuth])

  return (
    <div>
      <p>Login you out!.....</p>
    </div>
  )
}

export default Logout;
