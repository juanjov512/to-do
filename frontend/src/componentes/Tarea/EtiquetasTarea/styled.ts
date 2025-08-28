import styled from "styled-components";

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TagItem = styled.span`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  button {
    margin-left: ${({ theme }) => theme.spacing.sm};
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1;

    &:hover {
      color: ${({ theme }) => theme.colors.gray[700]};
    }
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export { TagList, TagItem, Container, TagContainer };
