import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonStyled } from "./styled";
import { IButtonProps } from "./types";

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled,
  variant,
  icon,
}) => {
  return (
    <ButtonStyled
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
    >
      {icon && <FontAwesomeIcon icon={icon.icon} color={icon.color} />}
      {children}
    </ButtonStyled>
  );
};

export default Button;
