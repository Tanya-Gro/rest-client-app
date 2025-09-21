import { getStatusColor, getMethodColor } from '@helpers';
import { METHOD_COLORS, STATUS_COLORS } from '@constants';

describe('getStatusColor', () => {
  it('returns the correct color for 200 (success)', () => {
    const result = getStatusColor(200);
    expect(result).toBe(STATUS_COLORS[2]);
  });

  it('returns fallback if the status is unknown', () => {
    const result = getStatusColor(999);
    expect(result).toBe(STATUS_COLORS.fallback);
  });
});

describe('getMethodColor', () => {
  it('returns the correct color for the GET method', () => {
    const result = getMethodColor('GET');
    expect(result).toBe(METHOD_COLORS.GET);
  });

  it('returns fallback if the method is unknown', () => {
    const result = getMethodColor('UNKNOWN');
    expect(result).toBe(METHOD_COLORS.fallback);
  });
});
