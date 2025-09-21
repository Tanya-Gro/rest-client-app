import {
  dateToString,
  constructUrl,
  encodeBase64,
  decodeBase64,
} from '@helpers';
import { Method } from '@types';

type Form = {
  method: Method;
  url: string;
  bodyType: 'json' | 'text';
  body?: string;
  headers?: { header: string; value: string }[];
};

describe('encodeBase64 / decodeBase64', () => {
  it('should encode and decode correctly', () => {
    const input = 'https://api.com/test?x=1&y=2';
    const encoded = encodeBase64(input);
    const decoded = decodeBase64(encoded);

    expect(encoded).not.toContain('+');
    expect(encoded).not.toContain('/');
    expect(encoded).not.toContain('=');
    expect(decoded).toEqual(input);
  });
});

describe('constructUrl', () => {
  it('must assemble the correct URL with method, body and headers', () => {
    const form: Form = {
      method: 'POST',
      url: 'https://api.com',
      bodyType: 'json',
      body: '{"name":"Ivan"}',
      headers: [{ header: 'Auth', value: 'token123' }],
    };

    const result = constructUrl(form);

    expect(result).toMatch(/^\/rest-client\/POST\//);
    expect(result).toContain(encodeBase64(form.url));
    expect(result).toContain(encodeBase64(form.body!));
    expect(result).toContain('?Auth=token123');
  });
});

describe('dateToString', () => {
  it('should return the date in the format YYYY-MM-DD HH:mm', async () => {
    const date = new Date('2025-09-20T14:05:00Z');
    const result = await dateToString(date);

    expect(result).toMatch(/2025-09-20 \d{2}:05/);
  });
});
