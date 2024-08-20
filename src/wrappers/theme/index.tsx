import React, { PropsWithChildren } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

interface ThemeInterface extends DefaultTheme {
  colors: {
    primary: string;
    secondary: string;

    menuBg: string;

    tabDefault: string;
    tabActive: string;
    tabHover: string;
  };
  fonts: {
    main: string;
  };
}

const theme: ThemeInterface = {
  colors: {
    primary: '255, 255, 255',
    secondary: '179, 179, 179',
    menuBg: '18, 18, 18',
    tabActive: '34, 115, 93',
    tabHover: '27, 84, 69',
    tabDefault: '70, 69, 69',
  },
  fonts: {
    main: 'Arial, sans-serif',
  },
};

export const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
