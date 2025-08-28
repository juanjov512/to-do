import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.red[700]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const DialogContent = styled(Dialog.Content)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  max-width: 250px;
  background-color: ${({ theme }) => theme.colors.red[50]};
  border: 1px solid ${({ theme }) => theme.colors.red[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

export { ErrorContainer, DialogContent };
