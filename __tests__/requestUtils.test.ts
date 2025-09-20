import { bodyBuilder, dateToString, getFullUrl } from '@helpers';
import { Method } from '@types';

type Form = {
  method: Method;
  url: string;
  bodyType: 'json' | 'text';
  body?: string;
  headers?: { header: string; value: string }[];
};

describe('bodyBuilder', () => {
  it('should return method + body + headers for POST', async () => {
    const form: Form = {
      method: 'POST',
      url: '',
      bodyType: 'json',
      body: '{"name":"Ivan"}',
      headers: [
        { header: 'Content-Type', value: 'application/json' },
        { header: 'Accept', value: 'application/json' },
      ],
    };

    const result = await bodyBuilder(form);

    expect(result.method).toEqual('POST');
    expect(result.headers).toEqual({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    expect(result.body).toEqual('{"name":"Ivan"}');
  });

  it('should only return the method if there is no body and headers', async () => {
    const form: Form = {
      method: 'GET',
      url: '',
      bodyType: 'json',
    };

    const result = await bodyBuilder(form);

    expect(result).toEqual({ method: 'GET' });
  });
});

describe('dateToString', () => {
  it('should return the date in the format YYYY-MM-DD HH:mm', async () => {
    const date = new Date('2025-09-20T14:05:00Z');
    const result = await dateToString(date);

    expect(result).toMatch(/2025-09-20 \d{2}:05/);
  });
});

describe('getFullUrl', () => {
  it('must assemble the correct URL with method, body and headers', async () => {
    const form: Form = {
      method: 'POST',
      url: 'https://api.com',
      bodyType: 'json',
      body: '{"name":"Ivan"}',
      headers: [{ header: 'Auth', value: 'token123' }],
    };

    const result = await getFullUrl(form);

    expect(result.startsWith('POST/')).toBe(true);

    expect(result).toContain('mh');

    expect(result).toContain('?Auth=token123');
  });

  it('must build a URL without body and headers', async () => {
    const form: Form = {
      method: 'GET',
      url: 'https://swapi.dev/api/people/1',
      bodyType: 'json',
    };

    const result = await getFullUrl(form);

    expect(result.startsWith('GET/')).toBe(true);
    expect(result.includes('?')).toBe(false);
  });
});
