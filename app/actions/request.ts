'use server';

import { Client } from '@entities';
import z from 'zod';
import { createHistoryPost } from './history';
import { bodyBuilder, dateToString, getFullUrl } from '@/helpers';

export async function handleRequest(form: Form) {
  const date = new Date();
  const dateString = await dateToString(date);
  const requestObject = await bodyBuilder(form);
  const fullUrl = await getFullUrl(form);
  const requestSize = form.body
    ? new TextEncoder().encode(JSON.stringify(form.body)).length
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
      responseSize: responseSize,
      requestSize: requestSize,
      date: dateString,
      endpoint: form.url,
      method: form.method,
      fullUrl: fullUrl,
    };
    if (!result.ok) {
      createHistoryPost(historyPost);
      return {
        status: result.status,
        statusText: result.statusText,
      };
    }
    createHistoryPost(historyPost);
    const data = responseText;
    return {
      status: result.status,
      statusText: result.statusText,
      data,
    };
  } catch (e: unknown) {
    const err = e as Error;
    const timestamp = Number((performance.now() - start).toFixed(2));
    const historyPost = {
      responseCode: 504,
      responseStatus: err.name ?? 'Fetch error',
      requestDuration: timestamp,
      responseSize: 0,
      requestSize: requestSize,
      date: dateString,
      endpoint: form.url,
      method: form.method,
      fullUrl: fullUrl,
      errorDetails: err.message ?? 'Something went wrong',
    };
    createHistoryPost(historyPost);
    return {
      status: 504,
      statusText: err.message ?? 'Fetch error',
    };
  }
}

type Form = z.infer<ReturnType<typeof Client>>;
