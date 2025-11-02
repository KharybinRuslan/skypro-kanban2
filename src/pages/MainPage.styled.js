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
  display: flex;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: ${colors.primary};
  font-weight: 500;
`;
