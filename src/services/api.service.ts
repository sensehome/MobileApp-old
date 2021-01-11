import axios, { AxiosResponse } from "axios";
import { LoginDto, TokenDto } from "../models/LoginDto";

const API_ENDPOINT = "http://api.sensehome.online/api";

const APIService = {
  login: (data: LoginDto): Promise<AxiosResponse<TokenDto>> => {
    let endpoint = `${API_ENDPOINT}/auth/login`;
    let body = JSON.stringify(data);
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(endpoint, body, config);
  },
};

export default APIService