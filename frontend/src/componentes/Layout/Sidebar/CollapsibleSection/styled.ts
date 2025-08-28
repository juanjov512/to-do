import styled from "styled-components";

export const SectionContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.colors.gray[700]};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;

export const SectionTitle = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

export const SectionContent = styled.div`
  padding: 0.25rem 0.5rem 0.5rem 3.5rem;
`;
