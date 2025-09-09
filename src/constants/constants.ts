import { Method } from '@/shared/types';

export const AUTH_API_ERROR = {
  EXISTS: 'exists',
  NO_DATA: 'no-data',
  SERVER_ERROR: 'server-error',
  INVALID: 'invalid',
} as const;

export const STATUS_COLORS = {
  1: 'text-status-1',
  2: 'text-status-2',
  3: 'text-status-3',
  4: 'text-status-4',
  5: 'text-status-5',
  fallback: 'text-status-fallback',
} as const;

export const METHOD_COLORS: Record<Method | 'fallback', string> = {
  GET: 'text-method-GET',
  POST: 'text-method-POST',
  PUT: 'text-method-PUT',
  PATCH: 'text-method-PATCH',
  DELETE: 'text-method-DELETE',
  HEAD: 'text-method-HEAD',
  OPTIONS: 'text-method-OPTIONS',
  fallback: 'text-status-fallback',
};
