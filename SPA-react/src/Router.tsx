import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { History } from './Pages/History'
import { DefaultLayout } from './Layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<DefaultLayout/>}>
            <Route 
                path="/" /* O usuário acessa sem precisar mudar a URL inicial */
                element={<Home/>} />


            <Route 
                path="/history"
                element={<History/>}/>

    </Route>    

    {/* <Route path='admin' element={<AdminLayout/>}>
        <Route path="/products">
    </Route> 
    Essa seria a maneira de criar um layoute exclusivo para admins */}
    </Routes>

  )
}