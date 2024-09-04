import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      menuBg: string;
      tabDefault: string;
      tabActive: string;
      tabHover: string;
      error: string;
      errorHover: string;
    };
    fonts: {
      main: string;
    };
  }
}
