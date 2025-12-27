import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './Styles/Themes/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import { defaultTheme } from './Styles/Themes/default'

export function App() {
  return (
    /* Context providers: ThemeProvider e BrowserRouter */
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>

  )
}
