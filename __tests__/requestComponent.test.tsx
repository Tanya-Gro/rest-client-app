import {  Request } from '@components';
import { render, screen } from '@testing-library/react';

describe('Request render test', () => {
  it('render Request', async () => {
    render(<Request />)

    expect(screen.getByRole('button',{ name: /btn/i  }))
  })
})