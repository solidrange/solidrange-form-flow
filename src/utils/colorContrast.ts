/**
 * Color Contrast Utility
 * Computes WCAG contrast ratios and validates accessibility compliance
 */

export interface ContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
  passesAAALarge: boolean;
  level: 'fail' | 'AA-large' | 'AA' | 'AAA';
}

/**
 * Parse HSL string to individual values
 */
export const parseHSL = (hsl: string): { h: number; s: number; l: number } | null => {
  if (!hsl || typeof hsl !== 'string') return null;
  
  const parts = hsl.trim().split(/\s+/);
  if (parts.length < 3) return null;
  
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1].replace('%', ''));
  const l = parseFloat(parts[2].replace('%', ''));
  
  if (isNaN(h) || isNaN(s) || isNaN(l)) return null;
  
  return { h, s, l };
};

/**
 * Convert HSL to RGB
 */
export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
};

/**
 * Calculate relative luminance (WCAG formula)
 */
export const getRelativeLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculate contrast ratio between two colors
 */
export const getContrastRatio = (hsl1: string, hsl2: string): number => {
  const parsed1 = parseHSL(hsl1);
  const parsed2 = parseHSL(hsl2);
  
  if (!parsed1 || !parsed2) return 1;
  
  const rgb1 = hslToRgb(parsed1.h, parsed1.s, parsed1.l);
  const rgb2 = hslToRgb(parsed2.h, parsed2.s, parsed2.l);
  
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Evaluate contrast and return WCAG compliance levels
 */
export const evaluateContrast = (foreground: string, background: string): ContrastResult => {
  const ratio = getContrastRatio(foreground, background);
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
    passesAALarge: ratio >= 3,
    passesAAALarge: ratio >= 4.5,
    level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA-large' : 'fail'
  };
};

/**
 * Clamp lightness to safe ranges for accessibility
 */
export const clampLightnessForAccessibility = (
  hsl: string, 
  minL: number = 30, 
  maxL: number = 55
): string => {
  const parsed = parseHSL(hsl);
  if (!parsed) return hsl;
  
  const clampedL = Math.max(minL, Math.min(maxL, parsed.l));
  return `${parsed.h} ${parsed.s}% ${clampedL}%`;
};

/**
 * Suggest a text color (light or dark) for given background
 */
export const suggestTextColor = (backgroundHsl: string): 'light' | 'dark' => {
  const parsed = parseHSL(backgroundHsl);
  if (!parsed) return 'dark';
  
  const rgb = hslToRgb(parsed.h, parsed.s, parsed.l);
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  
  return luminance > 0.179 ? 'dark' : 'light';
};

/**
 * Default accessible token pairs for validation
 */
export interface TokenPair {
  name: string;
  foreground: string;
  background: string;
  requirement: 'normal' | 'large';
}

/**
 * Validate all token pairs and return results
 */
export const validateTokenPairs = (pairs: TokenPair[]): { pair: TokenPair; result: ContrastResult }[] => {
  return pairs.map(pair => ({
    pair,
    result: evaluateContrast(pair.foreground, pair.background)
  }));
};

/**
 * Get accessible color token defaults
 */
export const getAccessibleDefaults = () => ({
  // Light mode
  light: {
    bgPrimary: '0 0% 100%',
    bgElevated: '0 0% 98%',
    textPrimary: '224 71% 4%',
    textSecondary: '220 9% 35%', // Darkened from 46% for better contrast
    borderSubtle: '220 9% 88%',
    colorPrimary: '208 100% 47%',
    colorPrimarySoft: '208 100% 55%',
    colorPrimaryContrast: '0 0% 100%',
    colorSuccess: '142 76% 36%',
    colorWarning: '38 92% 50%',
    colorDestructive: '0 84% 55%', // Darkened from 60.2% for contrast
    sidebarActive: '208 100% 96%',
  },
  // Dark mode
  dark: {
    bgPrimary: '222 47% 7%',
    bgElevated: '222 30% 12%',
    textPrimary: '0 0% 100%',
    textSecondary: '210 10% 75%',
    borderSubtle: '220 15% 30%',
    colorPrimary: '208 100% 47%',
    colorPrimarySoft: '208 100% 55%',
    colorPrimaryContrast: '0 0% 100%',
    colorSuccess: '142 76% 50%',
    colorWarning: '38 92% 55%',
    colorDestructive: '0 84% 60%',
    sidebarActive: '208 100% 23%',
  }
});
