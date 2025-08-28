"use client";

import React, { useCallback, useState } from "react";
import { useCategorias } from "@/hooks/useCategorias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { CategoriaItem, AddButton, CategoryWrapper } from "./styled";
import Modal from "@/componentes/Comunes/Modal";
import FormularioCategoria from "@/componentes/Categoria/FormularioCategoria";

const CategoriesList: React.FC = () => {
  const { categorias, fetchCategorias } = useCategorias();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSuccess = useCallback(() => {
    setIsModalOpen(false);
    fetchCategorias();
  }, [fetchCategorias]);

  return (
    <>
      {categorias.map((categoria) => (
        <CategoryWrapper key={categoria.id}>
          <CategoriaItem>
            <FontAwesomeIcon icon={faTag} />
            <span>{categoria.nombre}</span>
          </CategoriaItem>
        </CategoryWrapper>
      ))}
      <AddButton onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Nueva categoría</span>
      </AddButton>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nueva Categoría"
      >
        <FormularioCategoria onSuccess={handleOnSuccess} />
      </Modal>
    </>
  );
};

export default CategoriesList;
