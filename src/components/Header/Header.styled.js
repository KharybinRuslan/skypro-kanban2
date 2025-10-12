import styled from "styled-components";
import { colors } from "../../styles/themes";

export const HeaderContainer = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${colors.white};
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

export const Logo = styled.div`
  img {
    width: 85px;
  }
`;

export const Navigation = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CreateButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primaryHover};
  }

  a {
    color: ${colors.white};
    text-decoration: none;
  }

  @media screen and (max-width: 495px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
  }
`;

export const UserLink = styled.a`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.primary};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primaryHover};
  }

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid ${colors.primary};
    border-bottom: 1.9px solid ${colors.primary};
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
    transition: border-color 0.3s ease;
  }

  &:hover::after {
    border-left-color: ${colors.primaryHover};
    border-bottom-color: ${colors.primaryHover};
  }
`;

export const UserMenu = styled.div`
  display: none;
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid ${colors.borderGray};
  background: ${colors.white};
  box-shadow: 0px 10px 39px 0px ${colors.shadow};
  padding: 34px;
  text-align: center;
  z-index: 2;

  &.show {
    display: block;
  }
`;

export const UserName = styled.p`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const UserEmail = styled.p`
  color: ${colors.gray};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const ThemeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    color: ${colors.black};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }

  input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 13px;
    border-radius: 100px;
    background: ${colors.lightGray};
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background-color: ${colors.gray};
      transition: 0.5s;
    }

    &:checked::before {
      left: 12px;
    }
  }
`;

export const LogoutButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: ${colors.primary};
  border-radius: 4px;
  border: 1px solid ${colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.primaryHover};
    color: ${colors.white};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
