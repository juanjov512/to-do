import { IInputProps } from "./types";
import { InputWrapper, Label, InputStyled } from "./styled";

const Input: React.FC<IInputProps> = ({ label, error, ...props }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputStyled {...props} />
      {error && (
        <span style={{ color: "red", fontSize: "0.8rem" }}>{error}</span>
      )}
    </InputWrapper>
  );
};

export default Input;
