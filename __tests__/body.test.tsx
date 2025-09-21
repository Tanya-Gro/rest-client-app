import { Body } from '@/components';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

describe('Body component', () => {
  it('render form, bodyType=json and prettify works', async () => {
    const user = userEvent.setup();

    const Wrapper = () => {
      const methods = useForm({
        defaultValues: {
          bodyType: 'json',
          body: '{"a":1}',
        },
      });
      return (
        <FormProvider {...methods}>
          <Body />
        </FormProvider>
      );
    };

    render(<Wrapper />);

    const textarea = screen.getByPlaceholderText(
      '{ "example": "value" }'
    ) as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('{"a":1}');

    const button = screen.getByRole('button', { name: 'prettify' });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(textarea.value).toBe('{\n  "a": 1\n}');
  });
});
