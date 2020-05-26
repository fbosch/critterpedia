export type Theme = {
  bodyBackground: string
  orangeAccent: string
  grayAccent: string
  darkGrayAccent: string
  yellowGreen: string
  greenHighlight: string
  greenText: string
  grayText: string
  redHighlight: string
  lightYellow: string
  borderColor: string
  fontFamily: string
  detailBorderRadius: string
  timingFunction: string
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}

export const ios = `@supports (-webkit-touch-callout: none)`
export const isChrome = `@media screen and (-webkit-min-device-pixel-ratio:0) and (min-resolution:.001dpcm)`
export const standalone = `@media all and (display-mode: standalone)`
export const timingFunction = `cubic-bezier(0,.5,.5,1)`

export const getFontFamily = ({ theme }): string => theme.fontFamily
export const getBodyBackground = ({ theme }): string => theme.bodyBackground

const theme: Theme = {
  bodyBackground: '#EFE9BC',
  orangeAccent: '#F8CC63',
  grayAccent: '#7d756f',
  darkGrayAccent: '#757261',
  greenHighlight: '#ddd992',
  greenText: '#415303',
  grayText: '#525236',
  redHighlight: '#D25233',
  lightYellow: '#F7F6E1',
  yellowGreen: '#CBBB0E',
  borderColor: '#D9D1A1',
  fontFamily: 'Humming, "Helvetica Neue", Calibri, arial',
  detailBorderRadius: '22% 22% 22% 22% / 40% 40% 40% 40%',
  timingFunction,
}

export default theme
