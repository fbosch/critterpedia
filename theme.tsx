export type ThemeType = {
  bodyBackground: string
  orangeAccent: string
  grayAccent: string
  darkGrayAccent: string
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

export const getFontFamily = ({ theme: ThemeType }) => theme.fontFamily
export const getBodyBackground = ({ theme: ThemeType }) => theme.bodyBackground

const theme: ThemeType = {
  bodyBackground: '#EFE9BC',
  orangeAccent: '#F8CC63',
  grayAccent: '#7d756f',
  darkGrayAccent: '#757261',
  lightYellow: '#F7F6E1',
  borderColor: '#D9D1A1',
  fontFamily: 'Humming, Calibri, arial',
  detailBorderRadius: '22% 22% 22% 22% / 40% 40% 40% 40%',
  timingFunction,
}

export default theme
