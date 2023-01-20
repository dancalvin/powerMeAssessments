import {FC, useEffect, useMemo} from "react";
import {LOAuth} from "@lifeomic/app-tools";

const Auth: FC<any> = (props) => {
  const appAuth = useMemo(() => {
    return new LOAuth({
      clientId: '7gp49ppq1p10io8r2jlae9h20n',
      authorizationUri: 'https://lifeomic-prod-us.auth.us-east-2.amazoncognito.com/oauth2/authorize',
      accessTokenUri: 'https://lifeomic-prod-us.auth.us-east-2.amazoncognito.com/oauth2/token',
      redirectUri: 'http://localhost:8080/callback',
      logoutUri: 'https://lifeomic-prod-us.auth.us-east-2.amazoncognito.com/logout',
      logoutRedirectUri: 'http://localhost:8080/logout',
      scopes: ['openid']
    });
  }, []);

  /*appAuth.startAutomaticTokenRefresh().then(async () => {
    const account = 'doterrademo';
    const resourceType = 'Patient';
    const project = '2a6b7ebd-cb54-4197-be93-6f4167f5a462';
    const url = `https://fhir.us.lifeomic.com/${account}/dstu3/${resourceType}?_tag=http%3A%2F%2Flifeomic.com%2Ffhir%2Fdataset%${project}&pageSize=5`

    console.log('ACCESS TOKEN: ', appAuth.getAccessToken());


    const response = await fetch(url, {method: 'GET'});
    console.log(response);
  });*/

  useEffect(() => {
    if (appAuth) {
      appAuth.startAutomaticTokenRefresh()
        .then(console.log)
    }
  }, [appAuth])

  return (
    <div>

    </div>
  )
}

export default Auth;
