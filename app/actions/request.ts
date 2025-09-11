'use server';

import { Client } from '@entities';
import z from 'zod';

export async function builder(form: z.infer<ReturnType<typeof Client>>) {
  const requestObject = bodyBuilder(form);
  const promise = fetch(form.url, requestObject);
  const result = await promise;
  if (!result.ok) {
    return {
      status: result.status,
      statusText: result.statusText,
    };
  }
  const data = await result.json();
  return data;
}

function bodyBuilder(form: z.infer<ReturnType<typeof Client>>) {
  let headers;
  if (form.headers?.length && form.headers?.[0].header) {
    headers = Object.fromEntries(
      form.headers.map((item) => [item.header, item.value])
    );
  }
  let requestObject: RequestObject;
  if (
    (form.method === 'post' && headers) ||
    (form.method === 'put' && headers)
  ) {
    requestObject = { method: form.method, headers: headers, body: form.body };
  } else if (form.method === 'post' || form.method === 'put') {
    requestObject = { method: form.method, body: form.body };
  } else if (headers) {
    requestObject = { method: form.method, headers: headers };
  } else {
    requestObject = { method: form.method };
  }
  return requestObject;
}

type RequestObject = {
  method: string;
  headers?: Record<string, string>;
  body?: string | undefined;
};
