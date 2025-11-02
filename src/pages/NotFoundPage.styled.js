import styled from "styled-components";
import { colors } from "../styles/themes";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: ${colors.backgroundGray};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 50px 20px;
`;

export const Title = styled.div`
  h1 {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
    color: ${colors.primary};
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      font-size: 80px;
    }
  }
`;

export const Message = styled.div`
  p {
    font-size: 24px;
    font-weight: 500;
    color: ${colors.black};
    margin-bottom: 30px;

    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
`;

export const Button = styled.button`
  width: 200px;
  height: 40px;
  background-color: ${colors.primary};
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: ${colors.white};
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: ${colors.primaryHover};
  }
`;
