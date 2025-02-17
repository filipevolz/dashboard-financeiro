import { Outlet } from 'react-router-dom'

import { LayoutContainer } from './styles'
import { Navbar } from '../../components/Navbar'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Navbar />
      <div style={{flexGrow: 1, paddingRight: '5rem'}}>
        <Header/>
        <Outlet />
      </div>
    </LayoutContainer>
  )
}