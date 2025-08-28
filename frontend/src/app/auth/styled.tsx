import styled from "styled-components";

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.gray[500]} 0%,
    ${({ theme }) => theme.colors.gray[700]} 100%
  );
  padding: ${({ theme }) => theme.spacing.md};
`;

export const LoginCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 400px;
  text-align: center;

  h1 {
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
    color: ${({ theme }) => theme.colors.primary[600]};
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export const LoginTabs = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  background: ${({ $active: active, theme }) =>
    active ? theme.colors.white : "transparent"};
  color: ${({ $active: active, theme }) =>
    active ? theme.colors.primary[600] : theme.colors.gray[600]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-weight: ${({ $active: active }) => (active ? 600 : 400)};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active: active, theme }) =>
      active ? theme.colors.white : theme.colors.gray[200]};
  }
`;

export const TabContent = styled.div`
  min-height: 300px;
`;
