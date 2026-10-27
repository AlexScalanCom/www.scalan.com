---
title: Knights game
description: Knights game
date: 2026-11-27
author: AlexS
tags: ["product", "javascript"]
icon-image: image.jpg
---

# Knights — The Last Move (https://alexscalancom.github.io/knights.app)**

A quiet, single-player strategy game you play against the computer. It runs entirely in
your browser: no account, no sign-in, no server, no ads, no tracking.

**How to win:** both players draw one shared path across the board. The player who makes
the last legal move wins.


Link: 👉 **[Use now](https://alexscalancom.github.io/knights.app)**

# Screenshots

{% carousel ["./1_screen.jpg"], "Knights app screenshots..." %}

---

## The idea in one paragraph

Knights is not chess. There are no pieces to capture and no board to defend. White and
Black take turns placing knights onto **one single path**. Every cell you use is used
forever — it becomes blocked for both players. Because the path can never branch and can
never be reused, the game always ends: whoever has a legal move left at the very end is
the winner. It is a short, purely logical puzzle — usually 2–10 minutes per game, and
always with a clear result.

---

## The rules

1. **White always moves first.** Before a game starts you choose whether you play White
   (you place the first knight) or Black (the computer does).
2. **Your first move may be placed on any empty playable cell.** There is no knight
   restriction on the opening move.
3. **Every later move must be a knight move** — the chess "L" jump of two cells in one
   direction and one cell in the other — measured from the **last cell placed on the
   path**, no matter which player placed it.
4. **A cell can never be visited twice.** Visited cells stay blocked for the rest of the
   game and are drawn as filled squares.
5. **Knights jump over everything.** Walls, visited cells and cells outside the board
   shape may sit between the two cells; only the destination has to be valid.
6. **No legal move means you lose.** After each move the remaining legal moves are
   recalculated; the player who just moved wins when nothing is left.

There is no draw and no timeout. A game always produces exactly one winner.

---

## What the board shows

| What you see | Meaning |
|---|---|
| ♘ / ♞ | the two most recent moves — which player placed them |
| filled square | an older cell already used by the path |
| highlighted cell or dot | a legal destination for your next move |
| dark stone / wall | a blocked cell: visible, but never a legal destination |
| blank, transparent area | outside the board shape: not part of the board |

Legal destinations are highlighted while it is your turn, so you always know your options.

---

## Two ways to play

### Classic

Open, fully playable square boards against the computer:

| Board | Cells |
|---|---|
| 8 × 8 | 64 |
| 10 × 10 | 100 |
| 16 × 16 | 256 |

Pick the board size, your colour, and the strength of the opponent. Your choices are
remembered for the next visit.

### Challenge levels

**50 fixed levels**, grouped from easy to hard:

| Group | What to expect |
|---|---|
| Training | open boards for learning the rules |
| Patterns | geometric boards with unusual shapes |
| Obstacles | boards interrupted by walls and stones |
| Tricky | maze-like and irregular boards |
| Masters | large, complex boards for experienced players |

Ten board shape types are used: rectangle, square, circle, ellipse, diamond, ring, cross,
walls, maze, and random irregular boards. Levels are identical for every player and never
change, so a level you solved once is the same level your friend sees. Each level shows
its size, its own difficulty rating, how many times you played it, and a *completed*
badge once you have won it.

---

## Three computer opponents

| Strength | How it plays |
|---|---|
| **Easy** | picks a random legal move and answers immediately — good for learning |
| **Medium** | looks ahead, takes winning moves and avoids giving you an instant win; up to 0.2 s per move |
| **Hard** | searches the position and can prove a forced finish in the endgame; up to 1 s per move |


---

## During a game

The game screen keeps everything you need in one place: whose turn it is, the move number,
the elapsed time, the current board and opponent, and these controls:

- **Pause / Resume** — the clock stops and the computer waits for you.
- **Undo** — steps back to the position where it is your turn again.
- **Resign** — ends the game and records it as abandoned.
- **New game** — starts over with the same or a different setup.

The timer counts only real playing time. Paused time, closed tabs, and idle time are not
counted, so the recorded duration of a game is honest even if you left in the middle.

### An unfinished game is never lost

The game is saved after every move. If you close the tab, lose connection, or reload the
page, the app offers to **resume** the game: the board, the move history, whose turn it
is, the elapsed time, and the settings are all restored. If the computer was thinking when
the page closed, it simply starts thinking again from the restored position.

---

## Statistics, history, and medals

Everything is available from the **Stats**, **History**, and **Medals** screens.

**Statistics** (separate views for all games, Classic, and Challenge):

- games played, wins, losses, win rate, abandoned games
- best winning streak
- average game length, average thinking time, average number of moves
- longest game, total time spent thinking
- breakdowns by board size, by opponent strength, by board shape, and by level

**History** keeps the last 30 completed games per mode, with filters by mode and result,
showing the board or level played, the opponent strength, the result, the number of moves,
the duration, and how long you spent thinking. Older entries are dropped automatically —
your lifetime totals, medals, and level progress are never affected.

**Medals** unlock automatically as you play. 23 of them exist today:

| Medal | How to earn it |
|---|---|
| First Steps / Getting Started / Regular / Dedicated | finish 1 / 10 / 50 / 100 games |
| First Victory / Five In Line / Skilled Knight / Century | win 1 / 5 / 25 / 100 games |
| One After Another / Unstoppable | win 3 or 10 games in a row |
| Classic Victory / Ten By Ten / Giant Board / All Sizes | win a classic game, a 10×10, a 16×16, and every classic size |
| Tuned In / Giant Slayer / Hard Mode Specialist | beat Medium 5 times, beat Hard once, beat Hard 10 times |
| Challenger / Pathfinder / Explorer / Master of All Boards | win a level, then 10, 25, and all 50 levels |
| Shape Shifter / Tricky Business | win on 5 different shapes / win 5 hard levels |

The Medals screen shows what you have unlocked, when, and how far you are from the next
one. Newly unlocked medals are announced on the result screen.

---

## Your data stays on your device

Games, statistics, medals, level progress, and settings are stored **only in this browser**
(offline local storage). Nothing is uploaded, nothing is synced, and there is no account to
create.

From **Settings** you can:

- **Export** — download everything as a single JSON file you can keep or move to another
  device.
- **Import** — restore such a file.
- **Delete all data** — erase every game, statistic, and medal on this device, after a
  confirmation.

Clearing your browser data or uninstalling the app removes your progress, so export it
first if you want to keep it.

---

## Install it and play offline

Knights is an installable app (a Progressive Web App). After the first visit it works with
no connection at all — on a plane, in a tunnel, or with the Wi‑Fi off.

- **Android / Chrome:** open the site, then *Add to home screen* or *Install app*.
- **iPhone / iPad / Safari:** tap *Share*, then *Add to Home Screen*.
- **Desktop Chrome or Edge:** use the install icon in the address bar.

Installing gives the game its own icon, its own window, and full offline play. Updates are
applied automatically the next time you are online.

---

## Settings

- **Theme:** light, dark, or follow your device.
- **Sound effects** and **animations:** on or off.
- **Defaults:** classic board size, opponent strength, and your colour, so the next game
  starts the way you like it.
- **Your data:** export, import, delete.

---

## A few tips for your first games

- The board is not the resource — the **move count** is. You win by being the last one who
  can still move, not by covering the board.
- Early moves decide the shape of the whole path. Try to leave yourself exactly one good
  reply rather than many tempting ones.
- Corners and narrow shapes are strong: a knight in a corner has very few exits, and a
  path that ends in a corner usually ends the game in your favour.
- Playing **Black** is not a handicap. Moving second means you see the opening and answer
  it — on many levels it is the stronger seat.
- If you lose a level, play it again. The layout never changes, so every attempt teaches
  you something real about it.

---

## Requirements

- Any current desktop or mobile browser (Chrome, Edge, Firefox, Safari).
- A mouse, a keyboard, or a touch screen — the board is played by tapping cells.
- JavaScript must be enabled.
- No internet connection is needed after the first visit.
- The layout adapts to phones, tablets, and desktops, including the 16 × 16 board.

---

## About this repository

This repository contains the **built, ready-to-serve application**: the HTML page, the
compiled scripts and styles, the level data, and the offline service worker. You can host
these files on any static web host or open them from a subdirectory — no backend, no
database server, and no build step are required to run the game.

The game itself is a Progressive Web App built with Svelte 5, TypeScript, and Vite. The
level definitions in `levels/levels.json` are fixed data, so the 50 challenge levels are
the same for every player.

Your progress lives in your browser, so a new device always starts from zero games and
zero medals.

