import type { theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: typeof theme.borderRadius;
    breakpoints: typeof theme.breakpoints;
    colors: typeof theme.colors;
    fonts: typeof theme.fonts;
    fontSizes: typeof theme.fontSizes;
    spacing: typeof theme.spacing;
  }
}
