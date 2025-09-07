'use client';

import { useTranslations } from 'next-intl';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui';
import { useState } from 'react';

const headers = [
  'Accept',
  'Accept-Encoding',
  'Accept-Language',
  'Authorization',
  'Cache-Control',
  'Content-Type',
  'Cookie',
  'Origin',
  'Referer',
  'User-Agent',
  'X-Requested-With',
];

type Header = {
  id: number;
  header?: string;
  value?: string;
};

export const Headers = () => {
  const [headerRows, setHeaderRows] = useState<Header[]>([{ id: 1 }]);
  const t = useTranslations('restful-client');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setHeaderRows([...headerRows, { id: headerRows.length + 1 }])
          }
        >
          +
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={headerRows.length === 1}
          onClick={() => setHeaderRows(() => headerRows.slice(0, -1))}
        >
          –
        </Button>
      </div>

      {headerRows.map((row) => (
        <div key={row.id} className="flex gap-2 items-center">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={t('headersHeader')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {headers.map((header) => (
                  <SelectItem
                    key={header.toLowerCase()}
                    value={header.toLowerCase()}
                  >
                    {header}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder={t('value')} />
        </div>
      ))}
    </div>
  );
};
