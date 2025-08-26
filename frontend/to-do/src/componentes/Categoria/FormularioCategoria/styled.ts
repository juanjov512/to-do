import styled from "styled-components";

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

export { Form };
