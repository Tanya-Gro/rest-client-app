'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui';
import { Textarea } from '../ui';

const languages = [
  'curl',
  'Fetch',
  'XHR',
  'NodeJS',
  'Python',
  'Java',
  'C#',
  'Go',
];

const placeholderCode: Record<string, string> = {
  curl: 'curl code',
  Fetch: 'fetch code',
  XHR: 'xhr code',
  NodeJS: 'nodejs code',
  Python: 'python code',
  Java: 'java code',
  'C#': 'c# code',
  Go: 'go code',
};

export const GeneratedCode = () => {
  const [lang, setLang] = useState<string>('curl');

  return (
    <Tabs value={lang} onValueChange={setLang}>
      <TabsList>
        {languages.map((lang) => (
          <TabsTrigger key={lang} value={lang}>
            {lang}
          </TabsTrigger>
        ))}
      </TabsList>

      {languages.map((lang) => (
        <TabsContent key={lang} value={lang}>
          <Textarea
            value={placeholderCode[lang]}
            readOnly
            className="font-mono"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
