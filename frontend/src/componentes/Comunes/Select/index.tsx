import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  SelectContainer,
  SelectButton,
  SelectOptions,
  SelectOption,
  SelectOptionIndicator,
} from "./styled";
import type { ISelectComponentProps } from "./types";
import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";

const Select: React.FC<ISelectComponentProps> = React.forwardRef<
  HTMLButtonElement,
  ISelectComponentProps
>(
  (
    {
      options,
      value,
      onChange,
      onClick,
      placeholder,
      id,
      variant,
    }: ISelectComponentProps,
    ref
  ) => {
    return (
      <SelectContainer value={value} onValueChange={onChange}>
        <SelectButton variant={variant} ref={ref} id={id}>
          <SelectPrimitive.Value placeholder={placeholder} />
          {variant !== "ghost" && (
            <FontAwesomeIcon color={"#6B7280"} icon={faChevronDown} />
          )}
        </SelectButton>
        <SelectPrimitive.Portal>
          <SelectOptions position="popper" sideOffset={6}>
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectOption
                  onClick={onClick}
                  key={option.value}
                  value={option.value}
                >
                  {option.prefix && (
                    <FontAwesomeIcon
                      icon={option.prefix.icon}
                      color={option.prefix.color}
                      size={"xs"}
                    />
                  )}
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectOptionIndicator>
                    <FontAwesomeIcon size={"xs"} icon={faCheck} />
                  </SelectOptionIndicator>
                </SelectOption>
              ))}
            </SelectPrimitive.Viewport>
          </SelectOptions>
        </SelectPrimitive.Portal>
      </SelectContainer>
    );
  }
);

Select.displayName = "Select";

export default Select;
