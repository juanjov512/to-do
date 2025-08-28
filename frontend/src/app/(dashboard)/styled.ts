"use client";

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
`;
