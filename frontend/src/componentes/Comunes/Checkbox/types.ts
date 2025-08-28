import type { CheckedState } from '@radix-ui/react-checkbox';

interface ICheckboxProps {
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
  disabled?: boolean;
  className?: string;
}

export type { ICheckboxProps };

