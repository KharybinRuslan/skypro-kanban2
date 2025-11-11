import styled from "styled-components";
import { colors } from "../styles/themes";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.backgroundGray};
`;

export const MainContainer = styled.main`
  width: 100%;
  background-color: ${colors.backgroundGray};
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0 64px;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: ${({ $isEmpty }) => ($isEmpty ? "none" : "flex")};
  gap: 20px;

  @media screen and (max-width: 1200px) {
    display: ${({ $isEmpty }) => ($isEmpty ? "none" : "block")};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  min-height: 220px;
  text-align: center;

  p {
    font-size: 18px;
    color: ${colors.primary};
    font-weight: 500;
    margin: 0;
  }
`;

export const EmptyState = styled.div`
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  margin-bottom: 32px;
  box-shadow: 0px 10px 39px 0px ${colors.shadow};

  p {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 12px;
    color: ${colors.black};
  }

  span {
    font-size: 16px;
    color: ${colors.gray};
  }

  @media screen and (max-width: 768px) {
    padding: 32px 20px;

    p {
      font-size: 20px;
    }

    span {
      font-size: 14px;
    }
  }
`;

export const RetryButton = styled.button`
  padding: 10px 24px;
  border-radius: 6px;
  border: 1px solid ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.white};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primaryHover};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primaryHover};
    outline-offset: 2px;
  }
`;
