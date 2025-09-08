import { z } from 'zod';

export const Client = z
  .object({
    method: z.enum([
      'get',
      'post',
      'put',
      'patch',
      'delete',
      'head',
      'options',
    ]),
    url: z.url('Enter correct URL'),
    bodyType: z.enum(['json', 'text']),
    body: z.string().optional(),
    headers: z
      .array(
        z.object({
          header: z.string().optional(),
          value: z.string().optional(),
        })
      )
      .optional(),
  })
  .refine(
    (fields) => {
      if (!fields.body) {
        return true;
      }

      if (fields.bodyType === 'json') {
        try {
          JSON.parse(fields.body);
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },
    {
      error: 'Incorrect JSON format',
      path: ['body'],
    }
  );

export type Client = z.infer<typeof Client>;
