import React from "react";
import {
  DashboardContainer,
  StatsGrid,
  StatCard,
  ChartContainer,
} from "./styled";
import { useTareas } from "@/hooks/useTareas";
import { useCategorias } from "@/hooks/useCategorias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faCheckCircle,
  faClock,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard: React.FC = () => {
  const { tareas } = useTareas();
  const { categorias } = useCategorias();

  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter((t) => t.completada).length;
  const tareasPendientes = totalTareas - tareasCompletadas;
  const tareasVencidas = tareas.filter(
    (t) =>
      !t.completada &&
      t.fecha_vencimiento &&
      new Date(t.fecha_vencimiento) < new Date()
  ).length;

  const tasaCompletado =
    totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>

      <StatsGrid>
        <StatCard>
          <div className="stat-icon">
            <FontAwesomeIcon icon={faTasks} />
          </div>
          <div className="stat-content">
            <h3>Total Tareas</h3>
            <p className="stat-number">{totalTareas}</p>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-icon completed">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className="stat-content">
            <h3>Completadas</h3>
            <p className="stat-number">{tareasCompletadas}</p>
            <p className="stat-percentage">{tasaCompletado.toFixed(1)}%</p>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-icon pending">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="stat-content">
            <h3>Pendientes</h3>
            <p className="stat-number">{tareasPendientes}</p>
          </div>
        </StatCard>

        <StatCard>
          <div className="stat-icon overdue">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <div className="stat-content">
            <h3>Vencidas</h3>
            <p className="stat-number">{tareasVencidas}</p>
          </div>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <h2>Distribución por Categorías</h2>
        <div className="categories-chart">
          {categorias.map((categoria) => {
            const tareasEnCategoria = tareas.filter(
              (t) => t.categoria_id === categoria.id
            ).length;
            const porcentaje =
              totalTareas > 0 ? (tareasEnCategoria / totalTareas) * 100 : 0;

            return (
              <div key={categoria.id} className="category-item">
                <div className="category-name">{categoria.nombre}</div>
                <div className="category-bar">
                  <div
                    className="category-fill"
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
                <div className="category-count">{tareasEnCategoria}</div>
              </div>
            );
          })}
        </div>
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
