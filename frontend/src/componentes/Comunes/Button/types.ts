import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type TButtonVariant = 'primary' | 'secondary' | 'ghost';

interface IIconProps {
    icon: IconDefinition;
    color?: string;
}

interface IButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    variant?: TButtonVariant;
    icon?: IIconProps;
}

export type { IButtonProps, TButtonVariant };
