'use server';

import { Client } from '@entities';
import z from 'zod';

export async function handleRequest(form: Form) {
  const date = new Date(Date.now());
  const requestObject = bodyBuilder(form);
  const requestSize = new TextEncoder().encode(
    JSON.stringify(requestObject)
  ).length;
  const start = performance.now();
  const promise = fetch(form.url, requestObject);
  const result = await promise;
  const timestamp = Number(performance.now() - start).toFixed(2);
  if (!result.ok) {
    return {
      status: result.status,
      statusText: result.statusText,
    };
  }
  const responseSize = new TextEncoder().encode(JSON.stringify(result)).length;
  console.log({
    date,
    requestSize,
    timestamp,
    responseSize,
  });
  const data = await result.text();
  return {
    status: result.status,
    statusText: result.statusText,
    data,
  };
}

function bodyBuilder(form: Form) {
  const headers =
    form.headers?.length && form.headers[0].header
      ? Object.fromEntries(
          form.headers
            .filter(({ header }) => !/[а-яА-ЯёЁ]/.test(header))
            .map(({ header, value }) => [header, value])
        )
      : undefined;

  const methodsWithBody = ['post', 'put', 'patch'];
  const canHaveBody = methodsWithBody.includes(form.method);

  return {
    method: form.method,
    ...(headers && { headers }),
    ...(canHaveBody && { body: form.body }),
  };
}

type Form = z.infer<ReturnType<typeof Client>>;
