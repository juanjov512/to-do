import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type TVariant = "primary" | "ghost";

interface IPrefixIcon {
    icon: IconDefinition;
    color?: string;
}

interface IOption {
  value: string;
  label: string;
  prefix?: IPrefixIcon;
}

interface ISelectComponentProps {
  value?: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  options: IOption[];
  id?: string;
  prefixIcon?: IPrefixIcon;
  placeholder?: React.ReactNode;
  variant?: TVariant;
}

export type { IOption, ISelectComponentProps, TVariant };
