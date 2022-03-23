import React, { createContext, useMemo, useState } from 'react';
import {
  ThemeProvider,
  ThemeProvider as CoreThemeProvider,
} from '@mui/material/styles';
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material';
import generateTheme from '../theme';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = generateTheme(mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CoreThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </CoreThemeProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp
