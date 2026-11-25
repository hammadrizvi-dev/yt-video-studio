export type ThemeId =
  | "tech-obsidian"
  | "tech-studio"
  | "finance-dark"
  | "finance-paper"
  | "documentary-noir"
  | "vox-editorial";

export interface ThemeTokens {
  id: ThemeId;
  isLight: boolean;
  bgBase: string;
  bgGlowPrimary: string;
  bgGlowSecondary: string;
  gridColor: string;
  surfaceBg: string;
  surfaceBorder: string;
  primary: string;
  accent: string;
  success: string;
  danger: string;
  info: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  paperTexture?: string;
  darkTexture?: string;
}

export const THEMES: Record<ThemeId, ThemeTokens> = {
  "tech-obsidian": {
    id: "tech-obsidian",
    isLight: false,
    bgBase: "#040710",
    bgGlowPrimary: "#38F2FF",
    bgGlowSecondary: "#FBBF24",
    gridColor: "rgba(56, 242, 255, 0.20)",
    surfaceBg: "rgba(10, 19, 41, 0.82)",
    surfaceBorder: "rgba(56, 242, 255, 0.34)",
    primary: "#38F2FF",
    accent: "#FBBF24",
    success: "#34D399",
    danger: "#FB7185",
    info: "#60A5FA",
    textPrimary: "#F8FAFC",
    textSecondary: "#CBD5E1",
    textMuted: "#94A3B8",
  },
  "tech-studio": {
    id: "tech-studio",
    isLight: true,
    bgBase: "#F8FAFC",
    bgGlowPrimary: "#0284C7",
    bgGlowSecondary: "#D97706",
    gridColor: "rgba(15, 23, 42, 0.06)",
    surfaceBg: "#FFFFFF",
    surfaceBorder: "#CBD5E1",
    primary: "#0284C7",
    accent: "#D97706",
    success: "#059669",
    danger: "#DC2626",
    info: "#2563EB",
    textPrimary: "#0F172A",
    textSecondary: "#334155",
    textMuted: "#64748B",
    paperTexture: "textures/user-paper-white.jpg",
  },
  "finance-dark": {
    id: "finance-dark",
    isLight: false,
    bgBase: "#050A14",
    bgGlowPrimary: "#F59E0B",
    bgGlowSecondary: "#10B981",
    gridColor: "rgba(245, 158, 11, 0.20)",
    surfaceBg: "rgba(12, 18, 34, 0.86)",
    surfaceBorder: "rgba(245, 158, 11, 0.36)",
    primary: "#F59E0B",
    accent: "#10B981",
    success: "#10B981",
    danger: "#EF4444",
    info: "#38BDF8",
    textPrimary: "#FFFFFF",
    textSecondary: "#E2E8F0",
    textMuted: "#94A3B8",
    darkTexture: "textures/user-dotted-dark.jpg",
  },
  "finance-paper": {
    id: "finance-paper",
    isLight: true,
    bgBase: "#F7F2E7",
    bgGlowPrimary: "#B45309",
    bgGlowSecondary: "#047857",
    gridColor: "rgba(24, 24, 27, 0.06)",
    surfaceBg: "#FFFDF7",
    surfaceBorder: "#D6CFC2",
    primary: "#B45309",
    accent: "#047857",
    success: "#059669",
    danger: "#DC2626",
    info: "#0284C7",
    textPrimary: "#18181B",
    textSecondary: "#3F3F46",
    textMuted: "#71717A",
    paperTexture: "textures/user-paper-warm.jpg",
  },
  "documentary-noir": {
    id: "documentary-noir",
    isLight: false,
    bgBase: "#07090E",
    bgGlowPrimary: "#EAB308",
    bgGlowSecondary: "#DC2626",
    gridColor: "rgba(234, 179, 8, 0.14)",
    surfaceBg: "rgba(15, 18, 26, 0.90)",
    surfaceBorder: "rgba(234, 179, 8, 0.30)",
    primary: "#EAB308",
    accent: "#22C55E",
    success: "#22C55E",
    danger: "#EF4444",
    info: "#38BDF8",
    textPrimary: "#F8FAFC",
    textSecondary: "#D4D8E1",
    textMuted: "#8B95A5",
    darkTexture: "textures/user-editorial-dark.jpg",
  },
  "vox-editorial": {
    id: "vox-editorial",
    isLight: true,
    bgBase: "#F5F0E3",
    bgGlowPrimary: "#EAB308",
    bgGlowSecondary: "#1D4ED8",
    gridColor: "rgba(20, 20, 19, 0.07)",
    surfaceBg: "#FFFDF8",
    surfaceBorder: "#D1C9B8",
    primary: "#1D4ED8",
    accent: "#EAB308",
    success: "#047857",
    danger: "#B91C1C",
    info: "#1D4ED8",
    textPrimary: "#141413",
    textSecondary: "#333330",
    textMuted: "#6B6A64",
    paperTexture: "textures/user-paper-warm.jpg",
  },
};
