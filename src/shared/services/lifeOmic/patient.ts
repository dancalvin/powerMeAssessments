import axios from "axios";
import {ILifeOmicPatient} from "./interfaces/LifeOmicPatient.interface";


const getPatient = async (): Promise<ILifeOmicPatient> => {
  let bearer: any = localStorage.getItem('lifeomic-mobile-access-token');
  if (!bearer) {
    const temp = JSON.parse(localStorage.getItem('lo-app-tools-auth')||'{}');
    bearer = temp.access_token;
  }
  const data = await axios.get<{ entry: { resource: ILifeOmicPatient }[] }>(`https://fhir.us.lifeomic.com/${process.env.REACT_APP_LIFEOMIC_ACCOUNT}/dstu3/$me`, {
    headers: {
      'Authorization': `Bearer ${bearer}`,
      'LifeOmic-Account': process.env.REACT_APP_LIFEOMIC_ACCOUNT
    }
  });
  if (!data) {
    throw new Error('Error getting the patient')
  }
  return data.data.entry[0].resource
}

export {getPatient}
