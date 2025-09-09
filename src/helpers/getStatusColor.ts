import { STATUS_COLORS } from '@constants';

export const getStatusColor = (status: number) => {
  const group = Math.floor(status / 100) as keyof typeof STATUS_COLORS;
  return STATUS_COLORS[group] || STATUS_COLORS.fallback;
};
