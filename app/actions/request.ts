'use server';

import { Client } from '@entities';
import { buildRequest } from '@helpers';

export async function handleRequest(form: Client) {
  try {
    const date = new Date();
    const requestObject = buildRequest(form);

    const requestSize = requestObject.body
      ? new TextEncoder().encode(requestObject.body).length
      : 0;

    const start = performance.now();
    const result = await fetch(form.url, requestObject);
    const timestamp = Number(performance.now() - start).toFixed(2);

    if (!result.ok) {
      return {
        status: result.status,
        statusText: result.statusText,
      };
    }

    const body = await result.text();

    const responseSize = new TextEncoder().encode(body).length;

    console.log({ date, requestSize, timestamp, responseSize });

    return {
      status: result.status,
      statusText: result.statusText,
      body,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusText: error.message,
      };
    }

    return {
      statusText: 'Unknown Error',
    };
  }
}
