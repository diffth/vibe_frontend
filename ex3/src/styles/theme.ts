const theme = {
  primary: '#f37339',
  dark: '#003355',
  headerHeight: '90px',
  maxWidth: '1280px',
  black: '#333333',
  textDark: '#373131',
}

export type ThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

export default theme
