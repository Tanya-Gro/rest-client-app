import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { Headers } from '@components';
import userEvent from '@testing-library/user-event';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    switch (key) {
      case 'headersHeader':
        return 'Header';
      case 'value':
        return 'Value';
      default:
        return key;
    }
  },
}));

vi.mock('./ui', () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  FormControl: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  FormField: ({
    render,
    name,
  }: {
    render: (arg: {
      field: { name: string; value: string; onChange: () => void };
    }) => React.ReactNode;
    name: string;
  }) => render({ field: { name, value: '', onChange: vi.fn() } }),
  FormItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Input: ({ placeholder, ...props }: { placeholder: string }) => (
    <input placeholder={placeholder} {...props} />
  ),
}));

const TestWrapper = ({ defaultValues = {} }) => {
  const formMethods = useForm({
    defaultValues: {
      ...defaultValues,
      headers: [{ header: '', value: '' }],
    },
  });

  return (
    <FormProvider {...formMethods}>
      <Headers />
    </FormProvider>
  );
};

describe('Headers', () => {
  it('should add and remove a header field successfully', async () => {
    const user = userEvent.setup();

    render(<TestWrapper />);

    const initialHeaderInputs = screen.getAllByPlaceholderText('Header');
    const initialValueInputs = screen.getAllByPlaceholderText('Value');
    expect(initialHeaderInputs).toHaveLength(1);
    expect(initialValueInputs).toHaveLength(1);

    const addButton = screen.getByRole('button', { name: 'Add' });
    await user.click(addButton);

    const newHeaderInputs = screen.getAllByPlaceholderText('Header');
    const newValueInputs = screen.getAllByPlaceholderText('Value');
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });

    expect(newHeaderInputs).toHaveLength(2);
    expect(newValueInputs).toHaveLength(2);
    expect(removeButtons).toHaveLength(2);

    await user.click(removeButtons[1]);

    const finalHeaderInputs = screen.getAllByPlaceholderText('Header');
    const finalValueInputs = screen.getAllByPlaceholderText('Value');
    const finalRemoveButtons = screen.getAllByRole('button', {
      name: 'Remove',
    });

    expect(finalHeaderInputs).toHaveLength(1);
    expect(finalValueInputs).toHaveLength(1);
    expect(finalRemoveButtons).toHaveLength(1);
  });
});
