import React, { PropsWithChildren } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

interface ThemeInterface extends DefaultTheme {
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

const theme: ThemeInterface = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    accent: '#dfd0fc',
    error: '#CF6679',
    menuBg: '#121212',
    dialogs: '#1E1E1E',
  },
  fonts: {
    main: 'Arial, sans-serif',
  },
};

export const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
