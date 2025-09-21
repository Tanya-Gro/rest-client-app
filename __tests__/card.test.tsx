import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@components';

describe('Card Components', () => {
  it('should render Card', async () => {
    const MOCK_DATA = {
      title: 'Card Title',
      description: 'This is a card description',
      content: 'Main content of the card',
      footer: 'Card Footer',
      action: 'Action Button',
      customClass: 'custom-card-class',
    };

    render(
      <Card className={MOCK_DATA.customClass} data-testid="card">
        <CardHeader data-testid="card-header">
          <CardTitle data-testid="card-title">{MOCK_DATA.title}</CardTitle>
          <CardDescription data-testid="card-description">
            {MOCK_DATA.description}
          </CardDescription>
          <CardAction data-testid="card-action">
            <button>{MOCK_DATA.action}</button>
          </CardAction>
        </CardHeader>
        <CardContent data-testid="card-content">
          {MOCK_DATA.content}
        </CardContent>
        <CardFooter data-testid="card-footer">{MOCK_DATA.footer}</CardFooter>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-card', MOCK_DATA.customClass);

    const cardHeader = screen.getByTestId('card-header');
    expect(cardHeader).toBeInTheDocument();

    const cardTitle = screen.getByTestId('card-title');
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveTextContent(MOCK_DATA.title);

    const cardDescription = screen.getByTestId('card-description');
    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toHaveTextContent(MOCK_DATA.description);

    const cardAction = screen.getByTestId('card-action');
    expect(cardAction).toBeInTheDocument();
    expect(screen.getByText(MOCK_DATA.action)).toBeInTheDocument();

    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveTextContent(MOCK_DATA.content);

    const cardFooter = screen.getByTestId('card-footer');
    expect(cardFooter).toBeInTheDocument();
    expect(cardFooter).toHaveTextContent(MOCK_DATA.footer);
  });
});
