// src/componentes/Comunes/Checkbox/index.tsx
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { styled } from 'styled-components';

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  all: unset;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  transition: all 0.2s ease;
  cursor: pointer;

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.colors.primary[500]};
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[100]};
  }

  &:hover:not([data-state='checked']) {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export { StyledCheckbox, StyledIndicator };
