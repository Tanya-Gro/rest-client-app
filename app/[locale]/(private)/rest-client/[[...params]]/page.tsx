'use client';

import { ResponseData } from '@types';
import { Request } from '@components';
import { Response } from '@components';
import { useState } from 'react';
import { handleRequest } from '../../../../actions/request';
import { toast } from 'sonner';
import { Client } from '@entities';
import { constructUrl, decodeBase64 } from '@helpers';
import { useParams, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRouter } from '@i18n';

export default function RestClient() {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const { params } = useParams();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const router = useRouter();

  const parseOnLoadData = (): Partial<Client> | null => {
    const method = params?.[0] ?? '';
    const url = decodeBase64(params?.[1] ?? '');
    const body = decodeBase64(params?.[2] ?? '');

    const headers: Client['headers'] = [];
    searchParams?.forEach((value, header) => {
      headers.push({ header, value });
    });

    if (!method && !url && !body && headers.length <= 0) {
      return null;
    }

    return {
      method: method as Client['method'],
      url,
      body,
      headers,
    };
  };

  const onLoadData = parseOnLoadData();

  const handleSubmit = async (formData: Client) => {
    try {
      const result = await handleRequest(formData);

      if (!result.status) {
        toast.error(result.statusText);
      }

      setResponseData(result);

      const url = constructUrl(formData);
      const pathname = `/${locale}${url}`;

      window.history.replaceState({}, '', pathname);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1">
        <Request onSubmit={handleSubmit} onLoadData={onLoadData} />
      </div>
      <div>
        <Response responseData={responseData} />
      </div>
    </div>
  );
}
