import { sizeGenerator } from '@helpers';

describe('sizeGenerator (happy path)', () => {
  it('returns bytes for a value less than 1000', () => {
    expect(sizeGenerator(512)).toBe('512.00 B');
  });

  it('returns kilobytes for values greater than 1000', () => {
    expect(sizeGenerator(2048)).toBe('2.05 kB');
  });

  it('correctly formats the value exactly 1000', () => {
    expect(sizeGenerator(1000)).toBe('1000.00 B');
  });
});
