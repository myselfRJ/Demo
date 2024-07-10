/** @format */

const API_URL = 'https://api.spoonacular.com';
const DEFAULT_TIMEOUT = 300000;

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export enum HttpStatus {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  MaintenanceCode = 423,
}

interface IProps {
  endpoint: string;
  method: HTTP_METHOD;
  body?: any;
}

export const fetchAPI = async ({
  endpoint,
  method,
  body,
}: IProps): Promise<{status: number; data: any}> => {
  try {
    let headers: Record<string, string> = {
      'x-api-key': '818dee8e77b0418da06e9c26487d01b2',
    };

    const options: RequestInit = {
      method,
      headers,
      body: JSON.stringify(body),
    };

    const response = await fetch(`${API_URL}/${endpoint}`, options);
    const status = response.status;
    let data;

    if (status !== HttpStatus.NoContent) {
      data = await response.json();
    }
    console.log('status ===>', status, data);
    return {status, data};
  } catch (err: unknown) {
    console.log(err, 'error occured');
    throw err;
  }
};
