import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as historyModule from '../app/actions/history';
import type { Client } from '@entities';
import { handleRequest } from '../app/actions/request';

const mockForm: Client = {
  url: 'https://api.example.com/data',
  method: 'GET',
  body: '',
  bodyType: 'json',
  headers: [{ header: '123', value: '321' }],
};
const mockHistoryResponse = {
  status: 200,
  statusText: 'OK',
};

describe('handleRequest', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns response body and calls createHistoryPost on success', async () => {
    const mockResponseText = 'success';
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValue(mockResponseText),
    } as unknown as Response);

    const createHistoryPostMock = vi
      .spyOn(historyModule, 'createHistoryPost')
      .mockResolvedValue(mockHistoryResponse);

    const result = await handleRequest(mockForm);

    expect(result.status).toBe(200);
    expect(result.statusText).toBe('OK');
    expect(result.body).toBe(mockResponseText);
    expect(createHistoryPostMock).toHaveBeenCalled();
  });

  it('returns status object when fetch fails', async () => {
    const mockResponseText = 'Not Found';
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: vi.fn().mockResolvedValue(mockResponseText),
    } as unknown as Response);

    const createHistoryPostMock = vi
      .spyOn(historyModule, 'createHistoryPost')
      .mockResolvedValue(mockHistoryResponse);

    const result = await handleRequest(mockForm);

    expect(result.status).toBe(404);
    expect(result.statusText).toBe('Not Found');
    expect(createHistoryPostMock).toHaveBeenCalled();
  });

  it('handles network errors', async () => {
    const errorMessage = 'Network error';
    global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));

    const createHistoryPostMock = vi
      .spyOn(historyModule, 'createHistoryPost')
      .mockResolvedValue(mockHistoryResponse);

    const result = await handleRequest(mockForm);

    expect(result.statusText).toBe(errorMessage);
    expect(createHistoryPostMock).toHaveBeenCalled();
  });
});
