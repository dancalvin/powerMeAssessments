import {ISaveObservation} from "./interfaces/saveObservation.interface";
import axios from "axios";


const saveObservation = async (params: ISaveObservation): Promise<any> => {
  const {vitalityScore, date, patientId} = params;
  let bearer: any = localStorage.getItem('lifeomic-mobile-access-token');
  if (!bearer) {
    const temp = JSON.parse(localStorage.getItem('lo-app-tools-auth')||'{}');
    bearer = temp.access_token;
  }
  const body = {
    "resourceType": "Observation",
    "status": "final",
    "code": {
      "coding": [
        {
          "system": "http://pmhclinics.com/fhir/codings",
          "code": "vitality-score",
          "display": "Vitality Score"
        }
      ]
    },
    "subject": {
      "reference": patientId
    },
    "effectiveDateTime": date,
    "valueQuantity": {
      "value": vitalityScore,
      "unit": "Vitality Score",
      "system": "http://pmhclinics.com/fhir/values",
      "code": "vitality-score"
    },
    "meta": {
      "tag": [
        {
          "system": "http://lifeomic.com/fhir/dataset",
          "code": process.env.REACT_APP_LIFEOMIC_UUID_PROJECT
        }
      ]
    }
  }

  const data = await axios.post<any>(`https://fhir.us.lifeomic.com/${process.env.REACT_APP_LIFEOMIC_ACCOUNT}/dstu3/Observation`, body, {
    headers: {
      'Authorization': `Bearer ${bearer}`,
      'LifeOmic-Account': process.env.REACT_APP_LIFEOMIC_ACCOUNT
    }
  });
  console.log(data);
  return data.data
}

export {saveObservation}
