import { StyledCheckbox, StyledIndicator } from "./styled";
import { ICheckboxProps } from "./types";

const Checkbox = ({
  checked,
  onCheckedChange,
  disabled,
  ...props
}: ICheckboxProps) => {
  return (
    <StyledCheckbox
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      {...props}
    >
      <StyledIndicator>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </StyledIndicator>
    </StyledCheckbox>
  );
};

export default Checkbox;
