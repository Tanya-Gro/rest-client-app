import { Client } from '@entities';

const methodsWithBody = ['POST', 'PUT', 'PATCH'];

export const buildRequest = (form: Client) => {
  const headers = form.headers?.length
    ? Object.fromEntries(
        form.headers
          .filter(({ header, value }) => header && value)
          .map(({ header, value }) => [header, value])
      )
    : undefined;

  const haveBody = methodsWithBody.includes(form.method);

  return {
    method: form.method,
    ...(headers && { headers }),
    ...(haveBody && form.body && { body: form.body }),
  };
};
