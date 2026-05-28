export type ThemeName = 'canopy' | 'monolith' | 'basalt' | 'blueprint';
export type ThemeMode = 'light' | 'dark';

export interface ThemeTokens {
  bg: string;
  surface: string;
  text: string;
  primary: string;
  muted: string;
  fontHeader: string;
  fontBody: string;
}

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  light: ThemeTokens;
  dark: ThemeTokens;
}
