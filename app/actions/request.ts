'use server';

import { Client } from '@entities';
import z from 'zod';

export async function handleRequest(form: z.infer<ReturnType<typeof Client>>) {
  const date = new Date(Date.now());
  const requestObject = bodyBuilder(form);
  const requestSize = new TextEncoder().encode(
    JSON.stringify(requestObject)
  ).length;
  const start = performance.now();
  const promise = fetch(form.url, requestObject);
  const result = await promise;
  const timestamp = ((performance.now() - start) / 1000).toFixed(2);
  if (!result.ok) {
    return {
      status: result.status,
      statusText: result.statusText,
    };
  }
  const responseSize = new TextEncoder().encode(JSON.stringify(result)).length;
  const isJson =
    result.headers.get('content-type')?.includes('application/json') || false;
  if (!isJson) {
    return {
      statusText: 'Response is not in JSON format',
    };
  }
  console.log({
    date,
    requestSize,
    timestamp,
    responseSize,
  });
  const data = await result.json();
  return {
    status: result.status,
    statusText: result.statusText,
    data,
  };
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
