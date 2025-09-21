import { render } from '@testing-library/react';
import Loading from '../app/[locale]/loading';

describe('Loading page', () => {
  it('Loading rendered', async () => {
    const { container } = render(<Loading />);
    const skeletons = container.querySelectorAll('.h-\\[40px\\]');
    expect(skeletons.length).toBeGreaterThan(3);
  });
});
