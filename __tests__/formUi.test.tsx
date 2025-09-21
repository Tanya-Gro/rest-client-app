import { FormDescription, FormLabel, FormMessage } from '@/components/ui/form';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactNode } from 'react';

describe('form label', () => {
  it('render form label', () => {
    render(
      <Wrapper>
        <FormLabel data-testid="form-label" />
      </Wrapper>
    );
    const label = screen.getByTestId('form-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('data-slot', 'form-label');
  });
});
describe('form description', () => {
  it('render form description', () => {
    render(
      <Wrapper>
        <FormDescription data-testid="form-description" />
      </Wrapper>
    );
    const label = screen.getByTestId('form-description');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('data-slot', 'form-description');
  });
});

describe('form message', () => {
  it('render form message', () => {
    render(
      <Wrapper>
        <FormMessage data-testid="form-message">Some message</FormMessage>
      </Wrapper>
    );
    const label = screen.getByTestId('form-message');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('data-slot', 'form-message');
  });
});
function Wrapper({ children }: { children: ReactNode }) {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
}
