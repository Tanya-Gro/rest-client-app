import { Client } from '@entities';
import { buildRequest } from './buildRequest';

export const encodeBase64 = (data: string) => {
  return btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodeBase64 = (data: string) => {
  return atob(data.replace(/-/g, '+').replace(/_/g, '/'));
};

export const constructUrl = (formData: Client) => {
  const requestObject = buildRequest(formData);
  const searchParams = new URLSearchParams();

  const method = requestObject.method;
  const url = encodeBase64(formData.url);
  const body = requestObject.body ? encodeBase64(requestObject.body) : '';

  if (requestObject.headers) {
    Object.entries(requestObject.headers).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
  }

  const searchParamsString = searchParams.toString();

  return `/rest-client/${method}/${url}/${body}${searchParamsString ? `?${searchParamsString}` : ''}`;
};

export const dateToString = (date: Date) => {
  const year = String(date.getFullYear()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
};
