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

export type Variables = z.infer<ReturnType<typeof VariablesSchema>>;

export type ResponseData = {
  status?: number;
  statusText: string;
  body?: string;
};
