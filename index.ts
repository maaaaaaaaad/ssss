// getting set up api instance to axios
import axios, { AxiosError, AxiosInstance as AxiosInstanceType } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

class AxiosInstance {
  private instance: AxiosInstanceType;

  constructor() {
    this.instance = axios.create({
      baseURL: `${Config.USER_URL}`,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(async (config) => {
      //...req interceptor middleware
    });

    this.instance.interceptors.response.use(
      (response) => {
        //... res interceptor middleware
      },
      async (error) => {
        //... error interceptor middleware
      },
    );
  }

  public setBaseURL(newBaseURL: string) {
    this.instance.defaults.baseURL = newBaseURL;
  }

  get getInstance() {
    return this.instance;
  }
}

const axiosInstance = new AxiosInstance();
export default axiosInstance.getInstance();


// example API with interceptor setup
import api, { METHOD } from '../config/axios.instance';
import { AxiosResponse } from 'axios';

type FindIdType = Pick<UserType, 'phone'>;
type FindIdResponseType = BaseResponseType<Pick<UserType, 'accountId'>>;

class UserService {
  async findId({ phone }: FindIdType): Promise<AxiosResponse<FindIdResponseType>> {
    return api({
      method: METHOD.POST,
      url: 'users/',
      data: { phone },
    });
  }

  setBaseURL(newBaseURL: string) {
    api.setBaseURL(newBaseURL);
  }
}

export default new UserService();

