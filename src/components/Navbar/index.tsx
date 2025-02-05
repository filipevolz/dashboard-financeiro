import { NavbarContainer, LogoImage, NavLinkContainer } from './styles'
import Logo from '../../assets/7b30e8e4543f4447b1c470ab25e232cc-free__4_-removebg-preview.png'

import { ChartLine, CreditCard, Gear, House, User } from 'phosphor-react'

export function Navbar(){
  return(
    <NavbarContainer>
      <LogoImage src={Logo} />
      
      <NavLinkContainer to="/">
        <House size={24} />
        Dashboard
      </NavLinkContainer>

      <NavLinkContainer to="/insight">
        <ChartLine size={24} />
        Insight
      </NavLinkContainer>

      <NavLinkContainer to="/transaction">
        <CreditCard size={24} />
        Transaction
      </NavLinkContainer>

      <NavLinkContainer to="/account">
        <User size={24} />
        Account
      </NavLinkContainer>

      <NavLinkContainer to="/settings">
        <Gear size={24} />
        Settings
      </NavLinkContainer>
    </NavbarContainer>
  )
}