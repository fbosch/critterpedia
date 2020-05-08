
export type ThemeType = {
  bodyBackground: string;
  orangeAccent: string;
  grayAccent: string;
  darkGrayAccent: string;
  lightYellow: string;
  borderColor: string;
  fontFamily: string;
}

export const getFontFamily = ({ theme: ThemeType }) => theme.fontFamily
export const getBodyBackground = ({ theme: ThemeType }) => theme.bodyBackground

const theme: ThemeType = {
  bodyBackground: '#EEEBC7',
  orangeAccent: '#F8CC63',
  grayAccent: '#90837A',
  darkGrayAccent: '#757261',
  lightYellow: '#F7F6E1',
  borderColor: '#D9D1A1',
  fontFamily: 'Humming, Calibri, arial'
}

export default theme