"use client";

import styled from "styled-components";

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.gray[800]};
  }

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary[500]};

    &.completed {
      background-color: ${({ theme }) => theme.colors.semantic.success};
    }

    &.pending {
      background-color: ${({ theme }) => theme.colors.semantic.warning};
    }

    &.overdue {
      background-color: ${({ theme }) => theme.colors.semantic.error};
    }
  }

  .stat-content {
    flex: 1;

    h3 {
      margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
      font-size: ${({ theme }) => theme.fontSizes.sm};
      color: ${({ theme }) => theme.colors.gray[600]};
      font-weight: 500;
    }

    .stat-number {
      margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray[800]};
    }

    .stat-percentage {
      margin: 0;
      font-size: ${({ theme }) => theme.fontSizes.sm};
      color: ${({ theme }) => theme.colors.semantic.success};
      font-weight: 600;
    }
  }
`;

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .categories-chart {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.sm} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

    &:last-child {
      border-bottom: none;
    }
  }

  .category-name {
    min-width: 120px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  .category-bar {
    flex: 1;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.gray[200]};
    border-radius: 4px;
    overflow: hidden;
  }

  .category-fill {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary[500]};
    transition: width 0.3s ease;
  }

  .category-count {
    min-width: 40px;
    text-align: right;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

export { DashboardContainer, StatsGrid, StatCard, ChartContainer };
