import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from '@auth';

const mockRegisterUser = vi.fn();
vi.mock('../../../app/actions/register', () => ({
  registerUser: (...args: string[]) => mockRegisterUser(...args),
}));

const mockSignIn = vi.fn();
const ROLE_OPTIONS = { name: /registration.button/i };

describe('SignUpForm', () => {
  it('renders form fields and button', () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/registration.password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', ROLE_OPTIONS)).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const loginButton = screen.getByRole('button', ROLE_OPTIONS);

    await user.click(loginButton);

    const errorMessages = await screen.findAllByText(/auth-schema\..*/i);
    expect(errorMessages.length).toBe(2);
  });

  it('shows loading state on submit', async () => {
    const user = userEvent.setup();
    mockRegisterUser.mockResolvedValueOnce({});
    mockSignIn.mockResolvedValueOnce({ ok: false });

    render(<SignUpForm />);
    await user.type(screen.getByLabelText(/Email/i), 'test@test.com');
    await user.type(
      screen.getByLabelText(/registration.password/i),
      'ValidPass123!'
    );

    const submitButton = screen.getByRole('button', ROLE_OPTIONS);
    await user.click(submitButton);

    await waitFor(() =>
      expect(submitButton).toHaveTextContent(/registration.loading/i)
    );
  });
});
