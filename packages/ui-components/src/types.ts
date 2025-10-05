// React Imports
import type { ReactNode } from 'react'

export type Skin = 'default' | 'bordered'

export type Mode = 'system' | 'light' | 'dark'

export type SystemMode = 'light' | 'dark'

export type ChildrenType = {
  children: ReactNode
}

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
