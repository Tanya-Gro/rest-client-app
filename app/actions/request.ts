'use server';

import { Client } from '@entities';
import z from 'zod';
import { createHistoryPost } from './history';
import { bodyBuilder, dateToString, getFullUrl } from '@/helpers';

export async function handleRequest(form: Form) {
  const date = new Date(Date.now());
  const dateString = await dateToString(date);
  const requestObject = await bodyBuilder(form);
  const fullUrl = await getFullUrl(form);
  const requestSize = new TextEncoder().encode(
    JSON.stringify(requestObject)
  ).length;

  const start = performance.now();
  const promise = fetch(form.url, requestObject);
  const result = await promise;
  const timestamp = Number((performance.now() - start).toFixed(2));
  const responseSize = new TextEncoder().encode(JSON.stringify(result)).length;
  if (!result.ok) {
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
    createHistoryPost(historyPost);
    return {
      status: result.status,
      statusText: result.statusText,
    };
  }
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
  createHistoryPost(historyPost);
  const data = await result.text();
  return {
    status: result.status,
    statusText: result.statusText,
    data,
  };
}

type Form = z.infer<ReturnType<typeof Client>>;
