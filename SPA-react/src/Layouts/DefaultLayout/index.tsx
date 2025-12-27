import { Header } from '../../Components/Header'
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
    return (
        <LayoutContainer>
            <Header/>  {/* Assim, o header ficará fixo em todas as telas do site, assim como o layout básico do site */}

            <Outlet/>
        </LayoutContainer>
    )
}