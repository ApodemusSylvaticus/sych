import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      error: string;
      menuBg: string;
      tabDefault: string;
      tabActive: string;
      tabHover: string;
    };
    fonts: {
      main: string;
    };
  }
}
