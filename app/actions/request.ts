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
  const result = await fetch(form.url, requestObject);
  const timestamp = Number((performance.now() - start).toFixed(2));
  const responseText = await result.text();
  const responseSize = new TextEncoder().encode(responseText).length;
  console.log(responseSize);
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
  const data = responseText;
  return {
    status: result.status,
    statusText: result.statusText,
    data,
  };
}

type Form = z.infer<ReturnType<typeof Client>>;
