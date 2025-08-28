import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "styled-components";

const StyledOverlay = styled(DialogPrimitive.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 50;

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledContent = styled(DialogPrimitive.Content)`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 1.5rem;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 50;
  outline: none;

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const StyledTitle = styled(DialogPrimitive.Title)`
  margin: 0;
  font-weight: 600;
  color: #111827;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const StyledDescription = styled(DialogPrimitive.Description)`
  margin: 0.5rem 0 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const CloseButton = styled(DialogPrimitive.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogContent = StyledContent;
export const DialogHeader = styled.div`
  margin-bottom: 1.5rem;
`;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogOverlay = StyledOverlay;

export function DialogContentWithOverlay({
  children,
  ...props
}: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>
        {children}
        <DialogPrimitive.Close asChild>
          <CloseButton aria-label="Close">
            <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
        </DialogPrimitive.Close>
      </StyledContent>
    </DialogPrimitive.Portal>
  );
}
