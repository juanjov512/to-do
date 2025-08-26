import styled from "styled-components";

const ItemContainer = styled.div<{ completada: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ completada, theme }) =>
    completada ? theme.colors.semantic.success : theme.colors.semantic.surface};
  cursor: pointer;
`;

export { ItemContainer };
