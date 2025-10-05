// Type Imports
import type { Skin } from './types' 

export type ThemeConfig = {
  skin: Skin
  disableRipple: boolean
}

const themeConfig: ThemeConfig = {
  
  skin: 'default',
  
  disableRipple: false
}

export default themeConfig