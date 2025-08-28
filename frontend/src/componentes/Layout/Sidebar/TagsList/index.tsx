"use client";

import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { TagItem, AddButton, TagLink } from "./styled";
import Modal from "@/componentes/Comunes/Modal";
import FormularioEtiqueta from "@/componentes/Etiqueta/FormularioEtiqueta";
import { useEtiquetas } from "@/hooks/useEtiquetas";

const TagsList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { etiquetas, fetchEtiquetas } = useEtiquetas();

  const handleOnSuccess = useCallback(() => {
    setIsModalOpen(false);
    fetchEtiquetas();
  }, [fetchEtiquetas]);

  return (
    <>
      {etiquetas.map((etiqueta) => (
        <TagLink key={etiqueta.id}>
          <TagItem>
            <FontAwesomeIcon icon={faHashtag} />
            <span>{etiqueta.nombre}</span>
          </TagItem>
        </TagLink>
      ))}
      <AddButton onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Nueva etiqueta</span>
      </AddButton>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nueva Etiqueta"
      >
        <FormularioEtiqueta onSuccess={handleOnSuccess} />
      </Modal>
    </>
  );
};

export default TagsList;
