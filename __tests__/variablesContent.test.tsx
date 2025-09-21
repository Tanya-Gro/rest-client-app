import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VariablesContent } from '@components';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => '');
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('VariablesContent render test', () => {
  it('render VariablesContent', async () => {
    render(<VariablesContent userEmail={'12345@gmail.com'} />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('title')
  })
})
describe('VariablesContent form.watch effect', () => {
  it('writes to localStorage ', async () => {
    render(<VariablesContent userEmail="test@example.com" />);

    const keyInputs = screen.getAllByRole('textbox');
    const keyInput = keyInputs[0];

    fireEvent.change(keyInput, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'test@example.com',
        JSON.stringify({ variables: [{ key: 'Test', value: '' }] })
      );
    });
  });

  it('filters out duplicate keys', async () => {
    render(<VariablesContent userEmail="test@example.com" />);

    const keyInputs = screen.getAllByRole('textbox');

    fireEvent.change(keyInputs[0], { target: { value: 'Test' } });
    fireEvent.change(keyInputs[1], { target: { value: 'Test' } });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'test@example.com',
        JSON.stringify({ variables: [{ key: 'Test', value: '' }] })
      );
    });
  });
});