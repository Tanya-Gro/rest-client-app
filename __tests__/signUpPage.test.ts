import { render } from '@testing-library/react';
import SignUp from '../app/[locale]/(public)/signup/page';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

describe('SignUp component', () => {
  it('renders header, description and form', async () => {
    const { findByText } = render(await SignUp());

    expect(await findByText('registration.header')).toBeTruthy();
    expect(await findByText('registration.header-description')).toBeTruthy();
  });
});
