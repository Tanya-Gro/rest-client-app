import { Client } from '@entities';

describe('Client schema', () => {
  const t = (key: string) => key;

  const schema = Client(t);

  it('validates a valid request without a body', () => {
    const data = {
      method: 'GET',
      url: 'https://example.com',
      bodyType: 'json',
    };

    const result = schema.safeParse(data);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.method).toBe('GET');
      expect(result.data.url).toBe('https://example.com');
    }
  });

  it('validates a valid request with a JSON body', () => {
    const data = {
      method: 'POST',
      url: 'https://api.test',
      bodyType: 'json',
      body: JSON.stringify({ foo: 'bar' }),
      headers: [{ header: 'Content-Type', value: 'application/json' }],
    };

    const result = schema.safeParse(data);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.body).toBe('{"foo":"bar"}');
      expect(result.data.headers?.[0].header).toBe('Content-Type');
    }
  });

  it('validates a valid request with a text body', () => {
    const data = {
      method: 'PUT',
      url: 'https://myapi.dev',
      bodyType: 'text',
      body: 'plain text body',
    };

    const result = schema.safeParse(data);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bodyType).toBe('text');
      expect(result.data.body).toBe('plain text body');
    }
  });

  it('returns false for invalid JSON (catch)', () => {
    const schema = Client(t);

    const result = schema.safeParse({
      method: 'POST',
      url: 'https://example.com',
      bodyType: 'json',
      body: '{ foo: bar }',
    });

    expect(result.success).toBe(false);
  });
});
