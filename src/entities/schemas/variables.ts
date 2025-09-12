import z from 'zod';

export const VariablesSchema = z.object({
  variables: z
    .array(
      z.object({
        key: z.string().trim().min(1, 'Key is required'),
        value: z.string(),
      })
    )
    .superRefine((variables, ctx) => {
      const seen = new Set<string>();

      variables.forEach((v, index) => {
        const key = v.key.trim();
        if (seen.has(key)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Key must be unique',
            path: [index, 'key'],
          });
        }
        seen.add(key);
      });
    }),
});
