import styled from "styled-components";
import Link from "next/link";

export const SidebarContainer = styled.nav`
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: ${({ theme }) => theme.spacing.md} 0;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const SidebarTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray[700]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary[500]};
  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
`;

export const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[700]};
  text-decoration: none;
  border-radius: 0;
  transition: all 0.2s ease;
  font-size: 0.9375rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
    color: ${({ theme }) => theme.colors.primary[700]};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[700]};
    border-right: 3px solid ${({ theme }) => theme.colors.primary[500]};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const SidebarDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.red[600]};
  cursor: pointer;
  font-size: 0.9375rem;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.red[50]};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
