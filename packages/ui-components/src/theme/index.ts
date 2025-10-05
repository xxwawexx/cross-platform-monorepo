// MUI Imports
import { createTheme, type Theme } from '@mui/material/styles'

// Type Imports
import type { SystemMode } from '../types'

// Config Imports
import themeConfig from '../themeConfig'

// Theme Options Imports
import overrides from './overrides'
import colorSchemes from './colorSchemes'
import spacing from './spacing'
import shadows from './shadows'
import customShadows from './customShadows'
import typography from './typography'

const theme = (mode: SystemMode, fontFamily: string): Theme => {
  return createTheme({
    components: overrides(themeConfig.skin),
    colorSchemes: colorSchemes(themeConfig.skin),
    ...spacing,
    shape: {
      borderRadius: 10,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10
      }
    },
    shadows: shadows(mode),
    typography: typography(fontFamily),
    customShadows: customShadows(mode),
    mainColorChannels: {
      light: '38 43 67',
      dark: '234 234 255',
      lightShadow: '38 43 67',
      darkShadow: '16 17 33'
    }
  })
}

export default theme