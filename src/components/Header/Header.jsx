import { useState } from "react";
import { Link } from "react-router-dom";
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
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </Logo>
          <Logo className="_dark">
            <Link to="/">
              <img src="/images/logo_dark.png" alt="logo" />
            </Link>
          </Logo>
          <Navigation>
            <CreateButton id="btnMainNew">
              <Link to="/new-card">Создать новую задачу</Link>
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
                <Link to="/exit">Выйти</Link>
              </LogoutButton>
            </UserMenu>
          </Navigation>
        </HeaderBlock>
      </div>
    </HeaderContainer>
  );
}

export default Header;
