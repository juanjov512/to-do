import React from "react";
import { SpinnerContainer, Spinner } from "./styled";

const Cargando: React.FC = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default Cargando;
