import { Client } from '@entities';

export const buildRequest = (form: Client) => {
  const headers = form.headers?.length
    ? Object.fromEntries(
        form.headers
          .filter(({ header, value }) => header && value)
          .map(({ header, value }) => [header, value])
      )
    : undefined;

  const methodsWithBody = ['post', 'put', 'patch'];
  const haveBody = methodsWithBody.includes(form.method);

  console.log({
    method: form.method,
    ...(headers && { headers }),
    ...(haveBody && form.body && { body: form.body }),
  });

  return {
    method: form.method,
    ...(headers && { headers }),
    ...(haveBody && form.body && { body: form.body }),
  };
};
