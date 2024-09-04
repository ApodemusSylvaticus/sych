import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      menuBg: string;
      tabDefault: string;
      tabActive: string;
      error: string;
      tabHover: string;
      errorHover: string;
    };
    fonts: {
      main: string;
    };
  }
}
