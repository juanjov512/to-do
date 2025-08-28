import styled from "styled-components";

const Form = styled.form`
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-direction: column;
`;

export { Form };
