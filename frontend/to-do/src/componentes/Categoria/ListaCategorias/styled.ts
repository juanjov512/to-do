import styled from "styled-components";

const Lista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export { Lista, Item };