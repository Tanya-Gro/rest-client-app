'use client';

import { useState } from 'react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from './ui';
import { useTranslations } from 'next-intl';

type Props = {
  isReadonly?: boolean;
};

export const Body = ({ isReadonly }: Props) => {
  const [mode, setMode] = useState<'json' | 'text'>('json');
  const t = useTranslations('restful-client');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {!isReadonly ? (
          <Select
            value={mode}
            onValueChange={(val: 'json' | 'text') => setMode(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('mode')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="text">{t('modeText')}</SelectItem>
            </SelectContent>
          </Select>
        ) : null}
        {mode === 'json' && !isReadonly ? (
          <Button>{t('prettify')}</Button>
        ) : null}
      </div>
      <Textarea
        placeholder={mode === 'json' ? '{ "example": "value" }' : 'Enter text'}
        className="font-mono"
        readOnly={isReadonly}
      />
    </div>
  );
};
