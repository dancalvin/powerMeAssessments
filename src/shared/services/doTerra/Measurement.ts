import axios from "axios";
import {ICreateMeasurementParams, IGetMeasurementParams} from "./interfaces";
import {IVitalityScoreData} from "../../../modules/Calculator/interfaces/vitalityScoreData.interface";

export const CreateMeasurement = async (params: ICreateMeasurementParams, accessToken: string): Promise<IVitalityScoreData> => {
  const url = `${process.env.REACT_APP_DO_TERRA_API_URL}/${process.env.REACT_APP_DO_TERRA_API_MEASUREMENT}`
  const response = await axios.post<IVitalityScoreData>(url, params, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });
  if (!response || !response.data) {
    throw new Error('Error while saving the measurements in the DoTerra API')
  }

  return response.data;
}

export const GetMeasurements = async (params: IGetMeasurementParams, accessToken: string): Promise<IVitalityScoreData[]> => {
  const url = `${process.env.REACT_APP_DO_TERRA_API_URL}/${process.env.REACT_APP_DO_TERRA_API_MEASUREMENT}`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  }

  const response = await axios.get<IVitalityScoreData[]>(url, {params, headers});
  if (!response || !response.data) {
    throw new Error('Error while getting the measurements from the DoTerra API')
  }

  return response.data;
}
export const DeleteMeasurement = async (id: number | undefined, accessToken: string): Promise<{ message: string }> => {
  const url = `${process.env.REACT_APP_DO_TERRA_API_URL}/${process.env.REACT_APP_DO_TERRA_API_MEASUREMENT}`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  }

  const response = await axios.delete<{ message: string }>(`${url}/${id}`, {headers});
  if (!response || !response.data) {
    throw new Error('Error while deleting the measurements from the DoTerra API')
  }

  return response.data;
}

export const UpdateMeasurement = async (id: number | undefined, body: ICreateMeasurementParams, accessToken: string): Promise<IVitalityScoreData> => {
  const url = `${process.env.REACT_APP_DO_TERRA_API_URL}/${process.env.REACT_APP_DO_TERRA_API_MEASUREMENT}`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  }

  const response = await axios.put<IVitalityScoreData>(`${url}/${id}`, body, {headers});
  if (!response || !response.data) {
    throw new Error('Error while deleting the measurements from the DoTerra API')
  }

  return response.data;
}
