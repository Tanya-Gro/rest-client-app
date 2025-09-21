import {  Request } from '@components';
import { render, screen } from '@testing-library/react';

describe('Footer render test', () => {
  it('render footer', async () => {
    render(<Request />)

    expect(screen.getByRole('button',{ name: /btn/i  }))
  })
})