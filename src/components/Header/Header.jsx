import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  HeaderContainer,
  HeaderBlock,
  Logo,
  Navigation,
  CreateTaskLink,
  UserButton,
  UserMenu,
  UserName,
  UserEmail,
  ThemeSection,
  LogoutLink,
} from "./Header.styled";

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAuth();

  const userName = user?.name?.trim() || user?.login || "Пользователь";
  const userEmail = user?.login || user?.email || "";

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderBlock>
          <Logo className="_show _light">
            <Link to="/" onClick={closeUserMenu}>
              <img src="/images/logo.png" alt="Логотип Skypro" />
            </Link>
          </Logo>
          <Logo className="_dark">
            <Link to="/" onClick={closeUserMenu}>
              <img
                src="/images/logo_dark.png"
                alt="Логотип Skypro (тёмная тема)"
              />
            </Link>
          </Logo>
          <Navigation>
            <CreateTaskLink
              id="btnMainNew"
              to="/new-card"
              onClick={closeUserMenu}
            >
              Создать новую задачу
            </CreateTaskLink>
            <UserButton
              type="button"
              aria-haspopup="true"
              aria-expanded={isUserMenuOpen}
              onClick={toggleUserMenu}
            >
              {userName}
            </UserButton>
            <UserMenu className={isUserMenuOpen ? "show" : ""}>
              <UserName>{userName}</UserName>
              {userEmail ? <UserEmail>{userEmail}</UserEmail> : null}
              <ThemeSection>
                <p>Темная тема</p>
                <input
                  type="checkbox"
                  className="checkbox"
                  name="checkbox"
                  disabled
                  aria-disabled="true"
                />
              </ThemeSection>
              <LogoutLink to="/exit" onClick={closeUserMenu}>
                Выйти
              </LogoutLink>
            </UserMenu>
          </Navigation>
        </HeaderBlock>
      </div>
    </HeaderContainer>
  );
}

export default Header;
