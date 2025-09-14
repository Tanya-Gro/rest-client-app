import z from 'zod';

export const VariablesSchema = (t: (arg: string) => string) =>
  z.object({
    variables: z
      .array(
        z.object({
          key: z.string().trim().min(1, t('requiredKey')),
          value: z.string(),
        })
      )
      .superRefine((variables, ctx) => {
        const seen = new Set<string>();

        variables.forEach((variable, index) => {
          const key = variable.key.trim();
          if (seen.has(key)) {
            ctx.addIssue({
              code: 'custom',
              message: t('uniqueKey'),
              path: [index, 'key'],
            });
          }
          seen.add(key);
        });
      }),
  });
