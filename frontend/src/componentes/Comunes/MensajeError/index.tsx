"use client";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { DialogContent, ErrorContainer } from "./styled";

interface IMensajeErrorProps {
  mensaje: string;
}

const MensajeError: React.FC<IMensajeErrorProps> = ({ mensaje }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <DialogContent>
          <Dialog.Title style={{ display: "none" }} />
          <Dialog.Description style={{ display: "none" }} />
          <ErrorContainer>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            {mensaje}
          </ErrorContainer>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MensajeError;
