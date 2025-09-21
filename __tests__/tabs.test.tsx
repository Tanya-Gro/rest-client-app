import { render, screen, waitFor } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components';
import userEvent from '@testing-library/user-event';

describe('Tabs', () => {
  it('should render tabs, switch between them, and show correct content', async () => {
    const user = userEvent.setup({ delay: null });

    const MOCK_DATA = {
      tab1: { trigger: 'Tab 1', content: 'Content for Tab 1' },
      tab2: { trigger: 'Tab 2', content: 'Content for Tab 2' },
    };

    render(
      <Tabs defaultValue="tab1" data-testid="tabs-root">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1" data-testid="trigger-tab1">
            {MOCK_DATA.tab1.trigger}
          </TabsTrigger>
          <TabsTrigger value="tab2" data-testid="trigger-tab2">
            {MOCK_DATA.tab2.trigger}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="content-tab1">
          {MOCK_DATA.tab1.content}
        </TabsContent>
        <TabsContent value="tab2" data-testid="content-tab2">
          {MOCK_DATA.tab2.content}
        </TabsContent>
      </Tabs>
    );

    const tabsRoot = screen.getByTestId('tabs-root');
    expect(tabsRoot).toBeInTheDocument();
    expect(tabsRoot).toHaveAttribute('data-slot', 'tabs');

    const tabsList = screen.getByTestId('tabs-list');
    expect(tabsList).toBeInTheDocument();
    expect(tabsList).toHaveAttribute('data-slot', 'tabs-list');

    const triggerTab1 = screen.getByTestId('trigger-tab1');
    const triggerTab2 = screen.getByTestId('trigger-tab2');
    expect(triggerTab1).toBeInTheDocument();
    expect(triggerTab1).toHaveAttribute('data-slot', 'tabs-trigger');
    expect(triggerTab1).toHaveAttribute('data-state', 'active');
    expect(triggerTab2).toBeInTheDocument();
    expect(triggerTab2).toHaveAttribute('data-slot', 'tabs-trigger');
    expect(triggerTab2).toHaveAttribute('data-state', 'inactive');

    const contentTab1 = screen.getByTestId('content-tab1');
    const contentTab2 = screen.getByTestId('content-tab2');
    expect(contentTab1).toBeInTheDocument();
    expect(contentTab1).toHaveAttribute('data-slot', 'tabs-content');
    expect(contentTab1).toHaveAttribute('data-state', 'active');
    expect(contentTab1).toHaveTextContent(MOCK_DATA.tab1.content);
    expect(contentTab1).toBeVisible();
    expect(contentTab2).toBeInTheDocument();
    expect(contentTab2).toHaveAttribute('data-state', 'inactive');
    expect(contentTab2).toHaveAttribute('hidden');
    expect(contentTab2).not.toBeVisible();

    await user.click(triggerTab2);

    await waitFor(
      () => {
        expect(triggerTab1).toHaveAttribute('data-state', 'inactive');
        expect(triggerTab2).toHaveAttribute('data-state', 'active');
        expect(screen.getByTestId('content-tab1')).toBeInTheDocument();
        expect(screen.getByTestId('content-tab1')).toHaveAttribute(
          'data-state',
          'inactive'
        );
        expect(screen.getByTestId('content-tab1')).toHaveAttribute('hidden');
        expect(screen.getByTestId('content-tab1')).not.toBeVisible();
        const newContentTab2 = screen.getByTestId('content-tab2');
        expect(newContentTab2).toBeInTheDocument();
        expect(newContentTab2).toHaveAttribute('data-slot', 'tabs-content');
        expect(newContentTab2).toHaveAttribute('data-state', 'active');
        expect(newContentTab2).toHaveTextContent(MOCK_DATA.tab2.content);
        expect(newContentTab2).toBeVisible();
      },
      { timeout: 1000, interval: 100 }
    );
  });
});
