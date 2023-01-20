import axios from "axios";
import {LoginResponseInterface} from "./interfaces";

export const ApplicationAuth = async (): Promise<LoginResponseInterface> => {
  const url = `${process.env.REACT_APP_DO_TERRA_API_URL}/${process.env.REACT_APP_DO_TERRA_API_LOGIN}`
  const response = await axios.post<LoginResponseInterface>(url, {
    applicationId: process.env.REACT_APP_DO_TERRA_APP_ID,
    applicationToken: process.env.REACT_APP_DO_TERRA_APP_TOKEN
  });
  if (!response || !response.data) {
    throw new Error('Error while authenticating against Do Terra API')
  }

  return response.data;
}
