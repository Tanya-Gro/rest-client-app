'use server';

import { Client } from '@entities';
import { buildRequest, constructUrl, dateToString } from '@helpers';
import { createHistoryPost } from './history';

export async function handleRequest(form: Client) {
  const date = new Date();
  const dateString = dateToString(date);

  const requestObject = buildRequest(form);
  const fullUrl = constructUrl(form);

  const requestSize = requestObject.body
    ? new TextEncoder().encode(requestObject.body).length
    : 0;

  const start = performance.now();

  try {
    const result = await fetch(form.url, requestObject);
    const timestamp = Number((performance.now() - start).toFixed(2));
    const responseText = await result.text();
    const responseSize = new TextEncoder().encode(responseText).length;

    const historyPost = {
      responseCode: result.status,
      responseStatus: result.statusText,
      requestDuration: timestamp,
      responseSize,
      requestSize,
      date: dateString,
      endpoint: form.url,
      method: form.method,
      fullUrl,
    };

    createHistoryPost(historyPost);

    if (!result.ok) {
      return {
        status: result.status,
        statusText: result.statusText,
      };
    }

    return {
      status: result.status,
      statusText: result.statusText,
      body: responseText,
    };
  } catch (e: unknown) {
    const err = e as Error;
    const timestamp = Number((performance.now() - start).toFixed(2));

    const historyPost = {
      responseCode: 504,
      responseStatus: err.name ?? 'Fetch error',
      requestDuration: timestamp,
      responseSize: 0,
      requestSize,
      date: dateString,
      endpoint: form.url,
      method: form.method,
      fullUrl,
      errorDetails: err.message ?? 'Something went wrong',
    };

    createHistoryPost(historyPost);

    return {
      statusText: err.message ?? 'Fetch error',
    };
  }
}
