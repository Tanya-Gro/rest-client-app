import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Avatar, AvatarFallback } from '@components';

describe('Avatar component', () => {
  it('renders Avatar with default styles', () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <Avatar data-testid="avatar" />
      </NextIntlClientProvider>
    );
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('renders AvatarFallback with default styles', () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <Avatar>
          <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
        </Avatar>
      </NextIntlClientProvider>
    );
    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarFallback).toBeInTheDocument();
  });
});
