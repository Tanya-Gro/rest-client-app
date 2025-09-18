import { VariablesSchema } from '@entities';
import z from 'zod';

export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export type HistoryPostType = {
  responseCode: number;
  responseStatus: string;
  requestDuration: number;
  method: Method;
  requestSize: number;
  responseSize: number;
  endpoint: string;
  fullUrl: string;
  date: string;
  id?: string;
  errorDetails?: string | null;
};

export type Variables = z.infer<ReturnType<typeof VariablesSchema>>;
