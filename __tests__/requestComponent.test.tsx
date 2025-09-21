import { Request } from '@components';
import { render, screen } from '@testing-library/react';

describe('Request render test', () => {
  it('render Request', async () => {
    render(<Request onLoadData={null} onSubmit={(data) => data} />);

    expect(screen.getByRole('button', { name: /btn/i }));
  });
});
