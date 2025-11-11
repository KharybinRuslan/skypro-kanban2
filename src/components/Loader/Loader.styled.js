import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/themes";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid ${colors.lightGray};
  border-top-color: ${colors.primary};
  animation: ${spin} 1s linear infinite;
`;

export const LoaderText = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${colors.primary};
  font-weight: 500;
`;

