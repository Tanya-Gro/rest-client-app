import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignInForm } from '@auth';

const ROLE_OPTIONS = { name: /login.button/i };

describe('SignInForm', () => {
  it('renders inputs and button', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/login.password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', ROLE_OPTIONS)).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const loginButton = screen.getByRole('button', ROLE_OPTIONS);

    await user.click(loginButton);

    const errorMessages = await screen.findAllByText(/auth-schema\..*/i);
    expect(errorMessages.length).toBe(2);
  });
});
