import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

export interface ITheme extends Theme {}

const generateTheme = (mode: string) => {
  return createTheme({
    spacing: 5,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: { mode },
    components: {},
  } as unknown as ThemeOptions);
};

export default generateTheme;
