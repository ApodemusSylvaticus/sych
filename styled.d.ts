import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      error: string;
      menuBg: string;
      dialogs: string;
    };
    fonts: {
      main: string;
    };
  }
}
