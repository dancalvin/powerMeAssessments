import {FC, useEffect, useMemo, useState} from "react";
import {APIBasedAuth} from "@lifeomic/app-tools";
import {useNavigate, useSearchParams} from "react-router-dom";
import RedeemCustomAppCodeResponse = APIBasedAuth.RedeemCustomAppCodeResponse;
//@ts-ignore
import Loading from 'react-fullscreen-loading';


const MobileCallbackPage: FC<any> = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const appAuth = useMemo(() => {
    return new APIBasedAuth({
      clientId: '7gp49ppq1p10io8r2jlae9h20n'
    });
  }, []);

  useEffect(() => {
    if (appAuth && searchParams?.get('code')) {
      appAuth.redeemCustomAppCode((searchParams.get('code') as string))
        .then((res: RedeemCustomAppCodeResponse) => {
          localStorage.setItem('lifeomic-mobile-access-token', res.accessToken);
          navigate('/');
        })
        .catch(e => {
          console.log(e);
          // navigate('/')
        })
    }
  }, [appAuth, searchParams, navigate]);

  return (
    <div>
      <Loading loading background={"rgba(238, 238, 238, 0.5)"} loaderColor={'#F2644E'} />
    </div>
  )
}

export default MobileCallbackPage;
