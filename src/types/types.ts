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

export type Variables = z.infer<typeof VariablesSchema>;
