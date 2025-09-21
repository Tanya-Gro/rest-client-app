import { Footer } from '@components';
import { render, screen } from '@testing-library/react';

const link = 'https://rs.school/courses/reactjs';
describe('Footer render test', () => {
  it('render footer', async () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /RS School/i })).toHaveAttribute(
      'href',
      link
    );
  });
});
