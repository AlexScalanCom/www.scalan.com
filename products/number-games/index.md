---
title: Number-games
description: A casual number puzzle game for your browser
date: 2026-08-09
author: AlexS
tags: ["product", "javascript"]
icon-image: image.jpg
---

# Number Games 🎮

A casual puzzle game for your browser — no downloads, no ads, just pure gameplay.

Connect numbers on the board. Hit multiples of 10. Beat your record. Repeat.

Link: 👉 **[Play now](https://alexscalancom.github.io/number-games.app)**

---

# Screenshots

{% carousel ["./1.jpg", "./2.jpg", "./3.jpg", "./4.jpg", "./5.jpg"], "Number-games app screenshots..." %}

---

## Game Modes

Number Games offers **two ways** to play — pick your challenge:

| Mode | Description | Best For |
|:---|:---|:---|
| 🕐 **Classic** | No time limit. Play at your own pace until no valid moves remain | Relaxed, strategic play |
| ⏱️ **5-Min Timer** | You have exactly 5 minutes to rack up as many points as possible | Fast-paced, high-score chasing |

Both modes share the same scoring rules and board mechanics — only the pressure differs. Your scores are tracked **separately** for each mode, so you can compete against yourself in both styles.

### Tips by Mode

- **Classic** — take your time, plan multi-chain setups, and hunt for long combos
- **5-Min Timer** — speed matters! grab quick pairs when stuck, don't overthink chains, and watch the clock

---

## How to Play

### The Basics

1. **Drag** your finger (mobile) or mouse across adjacent tiles on the board
2. Connect **2 to 7 tiles** in a chain — only up, down, left, right (no diagonals)
3. When you release, the values of all selected tiles are added together
4. If the sum is **divisible by 10**, the chain is valid — tiles disappear and you score points

### Examples

| Chain | Sum | Result |
|:---|:---:|:---:|
| 3 → 7 | 10 | ✅ Valid |
| 6 → 4 | 10 | ✅ Valid |
| 3 → 7 → 4 → 6 | 20 | ✅ Valid |
| 5 → 5 → 5 → 5 | 20 | ✅ Valid |
| 3 → 5 | 8 | ❌ Invalid |
| 7 → 4 | 11 | ❌ Invalid |

### Scoring

Your score is calculated from four factors:

- **Chain Sum** — the total of all connected tile values
- **Chain Length** — longer chains earn bigger multipliers
- **Special Tiles** — some tiles carry a ×2, ×3, or ×5 bonus; the highest one in your chain is applied
- **Combo Multiplier** — consecutive valid chains stack up a combo

```
Score = Chain Sum × Length Multiplier × Special Multiplier × Combo Multiplier
```

#### Length Multipliers

| Tiles Connected | Multiplier |
|:---:|:---:|
| 2 | ×1 |
| 3 | ×2 |
| 4 | ×3 |
| 5 | ×5 |
| 6 | ×8 |
| 7+ | ×12 → ×15 |

#### Combo System

Your combo grows based on the total chains you've completed — failed chains do **not** reset it. Build longer chains to level up faster:

```
Combo Level = floor((5+chains × 6 + 4-chains × 3 + 3-chains × 2 + 2-chains) / 30)
Combo Multiplier = Combo Level + 1
```

### Board Mechanics

After a valid chain:

- Selected tiles **disappear** with a smooth animation
- Remaining tiles **fall down** to fill empty spaces
- **New tiles** appear at the top — watch for special bonus tiles!
- Your score updates instantly

The game ends when no valid move remains on the board, or you can press **Finish** early to lock in your score.

---

## Features

🎯 **Simple core mechanic** — drag adjacent tiles, sum must be divisible by 10

⚡ **Special bonus tiles** — scattered ×2, ×3, and ×5 multipliers boost your score

🔥 **Combo system** — your combo grows as you complete more chains; never resets on failure

📊 **Chain statistics** — track how many chains of each length you completed per game

⏱️ **Play time** — see how long each session lasted

📜 **Game history** — last 30 scored games per mode saved locally with full breakdown

❓ **In-game rules** — tap the "?" button anytime for a quick refresher

📱 **PWA support** — install on your phone's home screen and play offline

---

## Install as an App

Number Games works as a **Progressive Web App**. After visiting the site:

- **Android Chrome** — tap the address bar → "Install app" or check the address bar icon
- **iOS Safari** — tap Share → "Add to Home Screen"
- **Desktop Chrome/Edge** — look for the install icon in the address bar

The app runs fullscreen without browser chrome and works offline after first visit.

---

## Tips & Strategy

🎯 **Spot pairs first** — 1+9, 2+8, 3+7, 4+6, 5+5 all add to 10 — these are reliable starting moves

🔗 **Chain longer when possible** — a 5-tile chain scores far more than two separate pairs

⭐ **Hunt the special tiles** — bonus multipliers can triple your score on a single chain

📐 **Plan ahead** — watch how tiles fall after each move; some chains set up better future moves

⏱️ **Play to win, not to stall** — pressing Finish early locks in your score before the board runs out of moves

---

## FAQ

**Do I need an account?**  
No. Everything runs in your browser. Your best score and recent games are saved locally on your device.

**Does it work offline?**  
Yes. After your first visit, the app is cached and works without internet.

**Can I play on mobile?**  
Absolutely. Designed for portrait mode with full touch support. Works great on phones and tablets.

**What happens if I finish with zero points?**  
Games scored at 0 are not saved to history — only sessions where you actually made points count.

**How does the 5-Min Timer work?**  
You get exactly 300 seconds on the clock. The timer starts as soon as you begin playing and stops when time runs out or you press Finish. Your game summary appears instantly so you can review your score, play time, and chain breakdown.

---

*Built with Svelte + TypeScript · No ads · No tracking · Just fun.* 🎲