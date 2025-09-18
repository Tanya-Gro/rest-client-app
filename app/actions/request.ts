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
  const requestSize = new TextEncoder().encode(
    JSON.stringify(requestObject)
  ).length;

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
  } catch (e) {
    const timestamp = Number((performance.now() - start).toFixed(2));
    const responseSize = new TextEncoder().encode(e).length;
    const historyPost = {
      responseCode: e.status ? e.status : 500,
      responseStatus: e.code ? e.code : 'Fetch error',
      requestDuration: timestamp,
      responseSize: responseSize,
      requestSize: requestSize,
      date: dateString,
      endpoint: form.url,
      method: form.method,
      fullUrl: fullUrl,
      errorDetails: e.message ? e.message : 'Something went wrong',
    };
    createHistoryPost(historyPost);
    return {
      status: 500,
      statusText: e.code ? e.code : 'Fetch error',
    };
  }
}

type Form = z.infer<ReturnType<typeof Client>>;
