'use server';
import z from 'zod';
import { Client } from '@entities';

export async function bodyBuilder(form: Form) {
  const headers = filterHeaders(form.headers);
  const methodsWithBody = ['POST', 'PUT', 'PATCH'];
  const canHaveBody = methodsWithBody.includes(form.method);

  return {
    method: form.method,
    ...(headers ? { headers } : {}),
    ...(canHaveBody && { body: form.body }),
  };
}

export async function dateToString(date: Date): Promise<string> {
  const year = String(date.getFullYear()).padStart(2, '0');
  const month = String(date.getMonth()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export async function getFullUrl(form: Form): Promise<string> {
  const method = `${form.method}`;
  const url = encodeRequestData(form.url);
  const body = form.body ? encodeRequestData(form.body) : '';
  const headers = filterHeaders(form.headers);

  return `${method}/${url}${body}${headers}`;
}

function filterHeaders(
  headers: { header: string; value: string }[] | undefined
): string[] | undefined {
  const filteredHeaders =
    headers?.length && headers[0].header
      ? headers
          .filter(({ header, value }) => {
            return !/[а-яА-ЯёЁ]/.test(header) && !/[а-яА-ЯёЁ]/.test(value);
          })
          .map(({ header, value }) => [header, value])
      : [];
  return filteredHeaders?.length > 0
    ? Object.fromEntries(filteredHeaders)
    : undefined;
}

function encodeRequestData(data: string): string {
  return btoa(JSON.stringify(data))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

type Form = z.infer<ReturnType<typeof Client>>;
