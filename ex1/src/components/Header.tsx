import styled from 'styled-components'

const Nav = styled.nav`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f3f4f6;
`

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const Logo = styled.span`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  white-space: nowrap;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f4f6;
  border-radius: 71px;
  padding: 6px 12px;
  min-width: 200px;
`

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  color: #9ca3af;
  width: 100%;

  &::placeholder {
    color: #9ca3af;
  }
`

const SearchIcon = styled.svg`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #9ca3af;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`

const NavLink = styled.a`
  font-family: 'Public Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`

const ConnectButton = styled.button`
  font-family: 'Public Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #f9fafb;
  background: #111827;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #1f2937;
  }
`

export default function Header() {
  return (
    <Nav>
      <LogoArea>
        <Logo>Flawless</Logo>
        <SearchBar>
          <SearchIcon viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SearchIcon>
          <SearchInput type="text" placeholder="Search" />
        </SearchBar>
      </LogoArea>
      <NavLinks>
        <NavLink href="#">Discover</NavLink>
        <NavLink href="#">Collection</NavLink>
        <ConnectButton>Connect wallet</ConnectButton>
      </NavLinks>
    </Nav>
  )
}
