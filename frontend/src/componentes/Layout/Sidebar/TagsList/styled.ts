import styled from "styled-components";

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.25rem 0;
  border-radius: 0.375rem;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary[500]};
    width: 1rem;
  }
`;

export const TagLink = styled.div`
  text-decoration: none;
  color: inherit;
  display: block;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  svg {
    margin-right: 0.5rem;
    width: 1rem;
  }
`;
