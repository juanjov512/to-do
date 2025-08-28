import styled from "styled-components";

export const ItemWrapper = styled.div.attrs({ tabIndex: 0 })`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[200]};
  }

`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const ItemTitle = styled.span<{ $completed: boolean }>`
  font-weight: bold;
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
`;

export const CheckboxIndicator = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
