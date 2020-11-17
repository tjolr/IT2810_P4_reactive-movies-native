export interface IThemeObject {
  colors: IColors;
}

interface IColors {
  primary?: string;
  primaryDark?: string;
  secondary?: string;
  white?: string;
  black?: string;
  grey0?: string;
  grey1?: string;
  grey2?: string;
  grey3?: string;
  grey4?: string;
  grey5?: string;
}

export const theme: IThemeObject = {
  colors: {
    primary: '#3b94dd',
    primaryDark: '#18578B',
    secondary: '#e5a42d',
    grey0: '#232323',
    grey1: '#282828',
    grey2: '#2d2d2d',
    grey3: '#323232',
    grey4: '#464646',
    grey5: '#5a5a5a',
  },
};
