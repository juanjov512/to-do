import styled, { css } from "styled-components";
import * as SelectPrimitive from '@radix-ui/react-select';
import type { TVariant } from "./types";


const getVariantStyles = (variant: TVariant) => {
    switch (variant) {
        case "primary":
            return css`
                background-color: ${({ theme }) => theme.colors.white};
                border: 1px solid ${({ theme }) => theme.colors.white};
                
                &:hover {
                  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
                  background-color: ${({ theme }) => theme.colors.gray[200]};
                }

                &:focus {
                  outline: none;
                  border: 1px solid ${({ theme }) => theme.colors.primary[300]};
                }
            `;

        case "ghost":
            return css`
                background-color: transparent;
                color: ${({ theme }) => theme.colors.gray[700]};
                
                &:hover {
                  background-color: ${({ theme }) => theme.colors.gray[200]};
                  color: ${({ theme }) => theme.colors.gray[900]};
                }
                
                &:focus {
                  outline: none;
                }
            `;

        default:
            return css``;
    }
}

const SelectContainer = styled(SelectPrimitive.Root)`
  width: 100%;
`;

const SelectButton = styled(SelectPrimitive.Trigger)<{ variant?: TVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  border: none;
  gap: ${({ theme }) => theme.spacing.md};
  transition: all 0.2s ease;

  ${({ variant = 'primary' }) => getVariantStyles(variant)}
`;

const SelectOptions = styled(SelectPrimitive.Content)`
  z-index: 50;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-height: 200px;
  overflow-y: auto;
`;

const SelectOption = styled(SelectPrimitive.Item)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  outline: none;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const SelectOptionIndicator = styled(SelectPrimitive.ItemIndicator)`
  color: ${({ theme }) => theme.colors.primary[300]};
`;

export { 
    SelectContainer, 
    SelectButton, 
    SelectOptions, 
    SelectOption,
    SelectOptionIndicator,
};