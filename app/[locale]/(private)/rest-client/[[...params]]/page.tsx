'use client';

import { ResponseData } from '@/types/types';
import { Request } from '@components';
import { Response } from '@components';
import { useState } from 'react';

export default function RestClient() {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const handleResponse = (data: ResponseData) => {
    setResponseData(data);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1">
        <Request onResponse={handleResponse} />
      </div>
      <div>
        <Response responseData={responseData} />
      </div>
    </div>
  );
}
