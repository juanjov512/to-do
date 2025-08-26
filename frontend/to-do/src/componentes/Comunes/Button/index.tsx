import { ButtonStyled } from "./styled";
import { IButtonProps } from "./types";

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled,
}) => {
  return (
    <ButtonStyled type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
