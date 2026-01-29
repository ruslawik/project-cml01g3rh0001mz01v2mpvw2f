export const theme = {
  colors: {
    primary: '#4A90E2',
    secondary: '#FFE4E1',
    accent: '#FF6B6B',
    background: '#F8F9FA',
    text: '#333333',
    textLight: '#666666',
    white: '#FFFFFF',
    success: '#4CAF50',
    purple: '#8B5CF6',
    pink: '#EC4899',
    orange: '#F97316',
  },
  fonts: {
    // Using system fonts that work across all platforms
    regular: 'System',
    bold: 'System',
    // Playful font for children's content - uses rounded system font
    playful: 'System',
  },
  fontSizes: {
    small: 14,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 20,
    round: 50,
  },
};

// Named exports for individual theme properties
export const colors = theme.colors;
export const spacing = theme.spacing;
export const borderRadius = theme.borderRadius;
export const fontSize = theme.fontSizes;