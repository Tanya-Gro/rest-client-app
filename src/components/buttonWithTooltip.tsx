import { ReactNode } from 'react';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@components';

type ButtonWithTooltipProps = {
  handleClick: () => void;
  children: ReactNode;
  tooltip: string;
};

export const ButtonWithTooltip = ({
  handleClick,
  children,
  tooltip,
}: ButtonWithTooltipProps): ReactNode => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          className="cursor-pointer p-1.5 rounded mr-auto"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};
