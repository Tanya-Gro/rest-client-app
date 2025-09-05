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

type Props = {
  isReadonly?: boolean;
};

export const Body = ({ isReadonly }: Props) => {
  const [mode, setMode] = useState<'json' | 'text'>('json');

  return (
    <div>
      <div className="flex gap-2">
        {!isReadonly ? (
          <Select
            value={mode}
            onValueChange={(val: 'json' | 'text') => setMode(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>
        ) : null}
        {mode === 'json' && !isReadonly ? <Button>Prettify</Button> : null}
      </div>
      <Textarea
        placeholder={mode === 'json' ? '{ "example": "value" }' : 'Enter text'}
        className="font-mono"
        readOnly={isReadonly}
      />
    </div>
  );
};
