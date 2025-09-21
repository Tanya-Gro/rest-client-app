import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { RequestSkeleton } from '@/components/loaders';

describe('requestSkeleton ', () => {
  it('requestSkeleton render', () => {
    const { container } = render(<RequestSkeleton />);
    const skeletons = container.querySelectorAll('.h-\\[32px\\]');
    expect(skeletons.length).toBeGreaterThan(3);
  });
});
