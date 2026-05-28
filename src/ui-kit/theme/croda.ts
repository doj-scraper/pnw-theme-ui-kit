import { themes } from './tokens';

export const crodaTheme = {
  name: 'croda' as const,
  label: 'CRODA Foundry',
  light: {
    bg: '#f5f5f5',
    surface: '#ffffff',
    text: '#1a1a1a',
    primary: '#10b981',
    muted: '#6b7280',
    fontHeader: '"Barlow Condensed", sans-serif',
    fontBody: '"DM Sans", sans-serif',
  },
  dark: {
    bg: '#030704',
    surface: 'rgba(7, 12, 9, 0.94)',
    text: '#edf7f1',
    primary: '#10b981',
    muted: '#7aa88c',
    fontHeader: '"Barlow Condensed", sans-serif',
    fontBody: '"DM Sans", sans-serif',
  },
};

export const themesWithCroda = {
  ...themes,
  croda: crodaTheme,
};
