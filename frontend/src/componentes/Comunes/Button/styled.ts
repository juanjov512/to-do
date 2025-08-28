import styled, { css } from "styled-components";
import type { TButtonVariant } from "./types";

const getVariantStyles = (variant: TButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.primary[500]};
        color: ${({ theme }) => theme.colors.white};
        
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary[600]};
        }
        
        &:active {
          background-color: ${({ theme }) => theme.colors.primary[700]};
        }
        
        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
        }
        
        &:disabled {
          background-color: ${({ theme }) => theme.colors.gray[300]};
          color: ${({ theme }) => theme.colors.gray[500]};
          cursor: not-allowed;
        }
      `;
      
    case 'secondary':
      return css`
        background-color: ${({ theme }) => theme.colors.gray[100]};
        color: ${({ theme }) => theme.colors.gray[900]};
        
        &:hover {
          background-color: ${({ theme }) => theme.colors.gray[200]};
        }
        
        &:active {
          background-color: ${({ theme }) => theme.colors.gray[300]};
        }
        
        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray[100]};
        }
        
        &:disabled {
          background-color: ${({ theme }) => theme.colors.gray[100]};
          color: ${({ theme }) => theme.colors.gray[400]};
          cursor: not-allowed;
        }
      `;
      
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.gray[700]};
        
        &:hover {
          background-color: ${({ theme }) => theme.colors.gray[100]};
          color: ${({ theme }) => theme.colors.gray[900]};
        }
        
        &:active {
          background-color: ${({ theme }) => theme.colors.gray[200]};
        }
        
        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray[100]};
        }
        
        &:disabled {
          color: ${({ theme }) => theme.colors.gray[400]};
          cursor: not-allowed;
        }
      `;

    default:
      return css``;
  }
};

const ButtonStyled = styled.button<{ disabled?: boolean, variant?: TButtonVariant }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.poppins};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.3s;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;

  ${({ variant = 'primary' }) => getVariantStyles(variant)}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export { ButtonStyled };
