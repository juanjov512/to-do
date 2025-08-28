import { IFiltroTareasGruposProps } from "./types";
import {
  FiltroContainer,
  FiltroFila,
  FiltroGrupo,
  FiltroLabel,
} from "./styled";
import Input from "@/componentes/Comunes/Input";
import SelectComponent from "@/componentes/Comunes/Select";
import { useCategorias } from "@/hooks/useCategorias";
import {
  faArrowDownShortWide,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/componentes/Comunes/Button";
import { useState } from "react";
import { PRIORIDADES } from "@/componentes/Tarea/Formulario";

const Grupos: React.FC<IFiltroTareasGruposProps> = ({
  filtros,
  handleFiltroChange,
}) => {
  const { categorias } = useCategorias();
  const [orden, setOrden] = useState(filtros.orden || "desc");

  const handleOrdenar = () => {
    const dir = orden === "asc" ? "desc" : "asc";
    handleFiltroChange("orden", dir);
    setOrden(dir);
  };

  return (
    <FiltroContainer>
      <FiltroGrupo>
        <FiltroFila>
          <FiltroGrupo>
            <FiltroLabel>Ordenar por:</FiltroLabel>
            <SelectComponent
              value={filtros.ordenar_por || "created_at"}
              onChange={(valor) => handleFiltroChange("ordenar_por", valor)}
              options={[
                { value: "created_at", label: "Fecha de creación" },
                { value: "fecha_vencimiento", label: "Fecha de vencimiento" },
                { value: "prioridad", label: "Prioridad" },
                { value: "updated_at", label: "Actualizada" },
              ]}
              placeholder="Ordenar por"
            />
          </FiltroGrupo>
          <Button
            onClick={handleOrdenar}
            variant="ghost"
            icon={{
              icon: orden === "asc" ? faArrowUpShortWide : faArrowDownShortWide,
            }}
          />
        </FiltroFila>

        <FiltroLabel>Estado:</FiltroLabel>
        <SelectComponent
          value={
            filtros.completada === undefined
              ? ""
              : filtros.completada.toString()
          }
          onChange={(valor) =>
            handleFiltroChange(
              "completada",
              valor === "" ? undefined : valor === "true"
            )
          }
          options={[
            { value: "false", label: "Pendientes" },
            { value: "true", label: "Completadas" },
          ]}
          placeholder="Seleccionar estado"
        />
      </FiltroGrupo>

      <FiltroGrupo>
        <FiltroLabel>Prioridad:</FiltroLabel>
        <SelectComponent
          value={filtros.prioridad?.toString() || ""}
          onChange={(valor) =>
            handleFiltroChange(
              "prioridad",
              valor === "" ? undefined : parseInt(valor)
            )
          }
          options={PRIORIDADES}
          placeholder="Seleccionar prioridad"
        />
      </FiltroGrupo>

      <FiltroGrupo>
        <FiltroLabel>Categoría:</FiltroLabel>
        <SelectComponent
          value={filtros.categoria_id?.toString() || ""}
          onChange={(valor) =>
            handleFiltroChange(
              "categoria_id",
              valor === "" ? undefined : Number(valor)
            )
          }
          options={categorias.map((c) => ({
            value: c.id.toString(),
            label: c.nombre,
          }))}
          placeholder="Seleccionar categoría"
        />
      </FiltroGrupo>

      <FiltroFila>
        <FiltroGrupo>
          <FiltroLabel>Vence desde:</FiltroLabel>
          <Input
            label=""
            type="date"
            value={filtros.fecha_vencimiento_desde || ""}
            onChange={(e) =>
              handleFiltroChange("fecha_vencimiento_desde", e.target.value)
            }
          />
        </FiltroGrupo>

        <FiltroGrupo>
          <FiltroLabel>Vence hasta:</FiltroLabel>
          <Input
            label=""
            type="date"
            value={filtros.fecha_vencimiento_hasta || ""}
            onChange={(e) =>
              handleFiltroChange("fecha_vencimiento_hasta", e.target.value)
            }
          />
        </FiltroGrupo>
      </FiltroFila>
    </FiltroContainer>
  );
};

export default Grupos;
