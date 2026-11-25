export type ThemeId =
  | "tech-obsidian"
  | "tech-studio"
  | "finance-dark"
  | "finance-paper";

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
};
