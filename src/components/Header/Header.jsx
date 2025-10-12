import { useState } from "react";
import {
  HeaderContainer,
  HeaderBlock,
  Logo,
  Navigation,
  CreateButton,
  UserLink,
  UserMenu,
  UserName,
  UserEmail,
  ThemeSection,
  LogoutButton,
} from "./Header.styled";

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderBlock>
          <Logo className="_show _light">
            <a href="" target="_self">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </Logo>
          <Logo className="_dark">
            <a href="" target="_self">
              <img src="/images/logo_dark.png" alt="logo" />
            </a>
          </Logo>
          <Navigation>
            <CreateButton id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </CreateButton>
            <UserLink href="#user-set-target" onClick={handleUserClick}>
              Ivan Ivanov
            </UserLink>
            <UserMenu
              className={isUserMenuOpen ? "show" : ""}
              id="user-set-target"
            >
              <UserName>Ivan Ivanov</UserName>
              <UserEmail>ivan.ivanov@gmail.com</UserEmail>
              <ThemeSection>
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
              </ThemeSection>
              <LogoutButton type="button">
                <a href="#popExit">Выйти</a>
              </LogoutButton>
            </UserMenu>
          </Navigation>
        </HeaderBlock>
      </div>
    </HeaderContainer>
  );
}

export default Header;
