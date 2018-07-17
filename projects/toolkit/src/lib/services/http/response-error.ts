import { RequestOption } from './request-option';

export interface ResponseError {
  code: number;
  error: any;
  message: string;
  request: RequestOption;
  status: number;
}
