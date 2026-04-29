# CascadX — Project Guide

## Tech Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Fonts via `next/font/google`: Inter (display + logo), Instrument Sans (body), JetBrains Mono (mono)
- No external animation libraries — all animations are CSS keyframes or inline SVG `animate`/`animateMotion`
- Dark mode by default — deep dark canvas with golden yellow accent

## Logo
- Text: "CascadX" — capital C, capital X, no space
- Font: Inter, weight 800 (ExtraBold), letter-spacing -0.035em, color var(--ink) (near-white on dark)
- Trailing dot: ~6px circle, color #f5b800 (golden yellow), 3px margin-left, baseline-aligned
- Component: `components/ui/Logo.tsx`

## Design Tokens (Dark Theme)

### Base colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0d0f0e` | Deep near-black canvas |
| `--bg-alt` | `#1e2423` | Lighter alternating sections (clear banding) |
| `--surface` | `#1e2423` | Primary card surface |
| `--surface-sub` | `#161a19` | Inset/nested elements inside elevated cards |
| `--surface-el` | `#262c2b` | Elevated card surface (chat, dashboard, step cards) |
| `--ink` | `#fafaf7` | Primary text (near-white) |
| `--ink-soft` | `#b8bcb6` | Secondary text |
| `--ink-muted` | `#7a8178` | Tertiary/meta text |
| `--line` | `rgba(255,255,255,0.08)` | Subtle dividers |
| `--line-strong` | `rgba(255,255,255,0.14)` | Visible borders |

### Accent (warm terracotta)
| Token | Value | Usage |
|---|---|---|
| `--accent` | `#d97757` | Warm terracotta primary |
| `--accent-deep` | `#b35a3e` | Deeper burnt orange for hover/emphasis |
| `--accent-glow` | `rgba(217,119,87,0.28)` | Glow/shadow accent |
| `--accent-ice` | `rgba(217,119,87,0.1)` | Soft terracotta wash |

### Alert
| Token | Value |
|---|---|
| `--warn` | `#ff6a3d` |
| `--warn-soft` | `rgba(255,106,61,0.15)` |

### Radii & Max
| Token | Value |
|---|---|
| `--radius-sm/--radius/--radius-lg` | 8px / 14px / 22px |
| `--max` | 1240px |

## Card Surfaces
- Default cards: `bg-surface` (#15191a)
- Elevated cards (chat, dashboard, viz): `bg-surface-el` (#1a1f1e)
- All elevated cards get: `box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, ...` for lifted feel
- Never use `bg-white` — use `bg-white/[0.04]` for subtle overlays

## Buttons
- Primary: `bg-accent text-[#0d0f0e]` with gold glow shadow → hover inverts to `bg-ink text-accent`
- Ghost: `border-line-strong bg-white/[0.04] text-ink` → hover `border-accent`

## Typography

| Role | Font | Tailwind class | Weight |
|---|---|---|---|
| Display / headings (large) | Inter | `font-display` | 800 (ExtraBold) |
| Display / headings (small h3-h5) | Inter | `font-display` | 700 (Bold) |
| Body text | Instrument Sans | `font-sans` | 400-600 |
| Mono / labels / kickers | JetBrains Mono | `font-mono` | 400-500 |

### Heading rules
- `<em>` inside headings: `not-italic font-[800] text-accent-deep` (gold, no italic)

## Message Priority
1. **AI Copilot** (Intelligence Layer)
2. **Signals & Forecasting**
3. **Cascading Engine**
4. **The Network**

## Adding a New Page

1. Create `src/app/<route>/page.tsx`
2. Import `Nav` and `Footer` as wrapper
3. Use dark surfaces: `bg-surface-el` for cards, `bg-bg-alt` for alternate sections
4. Use `Kicker`, `SectionHead`, `Button`, `Eyebrow` primitives
5. End with `<CTA />` before Footer
6. Always use "CascadX" (capital C, capital X)

## File Structure
```
src/
├── app/
│   ├── layout.tsx, globals.css, page.tsx
│   ├── product/, about/, contact/
└── components/
    ├── ui/ (Logo, Button, Eyebrow, SectionHead, Kicker)
    ├── Nav, Hero, NeuralVisual, HowItWorks
    ├── AIChat, SignalsDashboard, CascadeEngine
    ├── IntegrationsNetwork, CTA, Footer
```
