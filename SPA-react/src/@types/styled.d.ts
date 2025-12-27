import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' { /* Estamos apenas sobrescrevendo o DefaultTheme padrão do Ts */
  export interface DefaultTheme extends ThemeType {}
}
