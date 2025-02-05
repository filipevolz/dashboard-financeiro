import styled from 'styled-components'
import { NavLink } from'react-router-dom'

export const NavbarContainer = styled.div`
  background-color: ${(props) => props.theme['gray-700']};
  padding: 0 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const LogoImage = styled.img`
  width: 100%;
`

export const NavLinkContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  text-decoration: none;
  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;
  padding: 1rem 1rem 1rem 2rem;
  border-radius: 25px;
  transition: 0.3s ease-in-out;
    
  &:hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &.active {
    background-color: ${(props) => props.theme['green-500']};
  }
`