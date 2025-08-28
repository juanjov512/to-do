import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ITooltipProps } from "./types";
import { TooltipContent, TooltipArrow } from "./styled";

const TooltipComponent: React.FC<ITooltipProps> = ({
  children,
  content,
  delayDuration = 200,
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={delayDuration}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <TooltipContent sideOffset={5}>
            {content}
            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
