import { VariablesSchema } from '@entities';

describe('VariablesSchema - happy path', () => {
  const t = (msg: string) => msg;
  const schema = VariablesSchema(t);

  it('must be validated with correct variables', () => {
    const data = {
      variables: [
        { key: 'API_KEY', value: '123' },
        { key: 'DB_HOST', value: 'localhost' },
      ],
    };

    const result = schema.safeParse(data);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.variables).toHaveLength(2);
      expect(result.data.variables[0].key).toBe('API_KEY');
      expect(result.data.variables[1].value).toBe('localhost');
    }
  });

  it('returns an error on duplicate', () => {
    const data = {
      variables: [
        { key: 'a', value: '' },
        { key: 'b', value: '' },
        { key: 'a', value: '' },
      ],
    };
    const result = schema.safeParse(data);

    expect(result.success).toBe(false);
    if (!result.success) {
      const issues = result.error.issues;

      expect(issues).toHaveLength(1);
      expect(issues.some((i) => i.message === 'uniqueKey')).toBe(true);
      expect(issues[0]).toEqual({
        code: 'custom',
        message: 'uniqueKey',
        path: ['variables', 2, 'key'],
      });
    }
  });
});
