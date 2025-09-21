import { fillVariables } from '@helpers';
import type { Variables } from '@types';

describe('fillVariables', () => {
  const email = 'test@example.com';
  const incomingData = `
    POST https://api.example.com/users/{{ userId }}/orders/{{ orderId }}
    Authorization: Bearer {{ token }}
    Content-Type: application/json

    {
      "customer": "{{ userName }}",
      "email": "{{ email }}",
      "amount": "{{ amount }}"
    }
  `;

  const mockStored: Variables = {
    variables: [
      { key: 'userId', value: '1' },
      { key: 'orderId', value: '123123' },
      { key: 'token', value: 'secret-token-123' },
      { key: 'userName', value: 'Ivan' },
      { key: 'email', value: 'ivan@example.com' },
      { key: 'amount', value: '199.99' },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('replaces placeholders with stored values', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(
      JSON.stringify(mockStored)
    );

    const result = fillVariables(email, incomingData);

    expect(result).toContain('https://api.example.com/users/1/orders/123123');
    expect(result).toContain('Authorization: Bearer secret-token-123');
    expect(result).toContain('"customer": "Ivan"');
    expect(result).toContain('"email": "ivan@example.com"');
    expect(result).toContain('"amount": "199.99"');
  });

  it('returns incomingData unchanged if no placeholders', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(
      JSON.stringify(mockStored)
    );

    const noPlaceholders = 'https://api.example.com/users/1/orders/123123';

    const result = fillVariables(email, noPlaceholders);

    expect(result).toBe(noPlaceholders);
  });

  it('returns incomingData unchanged if variables field is missing', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(
      JSON.stringify({})
    );

    const result = fillVariables(email, incomingData);
    expect(result).toBe(incomingData);
  });

  it('returns incomingData unchanged if variables is not an array', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(
      JSON.stringify({ variables: 'no-an-array' })
    );

    const result = fillVariables(email, incomingData);
    expect(result).toBe(incomingData);
  });

  it('returns incomingData unchanged if JSON.parse throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return 'INVALID_JSON';
    });

    const result = fillVariables(email, incomingData);
    expect(result).toBe(incomingData);
  });
});
