import { render } from '@testing-library/react';
import SignIn from '../app/[locale]/(public)/signin/page';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

describe('SignUp component', () => {
  it('renders header, description and form', async () => {
    const { findByText } = render(await SignIn());

    expect(await findByText('login.header')).toBeTruthy();
    expect(await findByText('login.header-description')).toBeTruthy();
  });
});
