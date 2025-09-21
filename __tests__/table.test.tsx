import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@components';

describe('Table', () => {
  it('render correctly', async () => {
    const mockData = {
      caption: 'Sample Table Caption',
      headers: ['Name', 'Age'],
      rows: [
        { name: 'Ivan', age: '30' },
        { name: 'Alena', age: '25' },
      ],
      footer: 'Total: 2 users',
    };

    render(
      <Table className="custom-table" data-testid="table">
        <TableCaption data-testid="table-caption">
          {mockData.caption}
        </TableCaption>
        <TableHeader data-testid="table-header">
          <TableRow data-testid="table-row">
            {mockData.headers.map((header, index) => (
              <TableHead
                key={index}
                className="custom-th"
                data-testid="table-head"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody data-testid="table-body">
          {mockData.rows.map((row, index) => (
            <TableRow key={index} className="custom-tr" data-testid="table-row">
              <TableCell className="custom-td" data-testid="table-cell">
                {row.name}
              </TableCell>
              <TableCell className="custom-td" data-testid="table-cell">
                {row.age}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter data-testid="table-footer">
          <TableRow>
            <TableCell colSpan={2} data-testid="table-cell">
              {mockData.footer}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const table = screen.getByTestId('table');
    expect(table).toBeInTheDocument();

    const caption = screen.getByTestId('table-caption');
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveTextContent(mockData.caption);

    const header = screen.getByTestId('table-header');
    expect(header).toBeInTheDocument();

    const headerRow = screen.getAllByTestId('table-row')[0];
    expect(headerRow).toBeInTheDocument();

    const headers = screen.getAllByTestId('table-head');
    expect(headers).toHaveLength(mockData.headers.length);
    headers.forEach((th, index) => {
      expect(th).toHaveTextContent(mockData.headers[index]);
    });

    const body = screen.getByTestId('table-body');
    expect(body).toBeInTheDocument();

    const bodyRows = screen.getAllByTestId('table-row').slice(1);
    expect(bodyRows).toHaveLength(mockData.rows.length);
    bodyRows.forEach((row, index) => {
      const cells = row.querySelectorAll('[data-slot="table-cell"]');
      expect(cells).toHaveLength(2);
      expect(cells[0]).toHaveTextContent(mockData.rows[index].name);
      expect(cells[1]).toHaveTextContent(mockData.rows[index].age);
    });

    const footer = screen.getByTestId('table-footer');
    expect(footer).toBeInTheDocument();

    const footerCell = screen.getAllByTestId('table-cell').slice(-1)[0];
    expect(footerCell).toHaveTextContent(mockData.footer);
    expect(footerCell).toHaveAttribute('colSpan', '2');
  });
});
