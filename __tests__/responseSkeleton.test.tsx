import { render } from '@testing-library/react';
import { ResponseSkeleton } from '@/components/loaders';

describe('responseSkeleton ', () => {
  it('responseSkeleton render', () => {
    const { container } = render(<ResponseSkeleton />);
    const skeletons = container.querySelectorAll('div[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(2);
  });
});
