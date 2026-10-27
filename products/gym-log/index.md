---
title: Personal workout tracker
description: Personal workout tracker — log your exercises, track progress, and never miss a training session.
date: 2026-07-26
author: AlexS
tags: ["product", "javascript"]
icon-image: image.png
---

# **[Gym Log 🏋️](https://alexscalancom.github.io/gym-log.app)**

Personal workout tracker — log your exercises, track progress, and never miss a training session.

{% image "./image.png", "Logo image..." %}

Link: 👉 **[Use now](https://alexscalancom.github.io/gym-log.app)**

# Screenshots

{% carousel ["./1_dashboard.jpg", "./2_workout.jpg", "./3_progress.jpg", "./4_personal.jpg", "./5_exercises.jpg", "./6_history.jpg", "./7_reminders.jpg"], "Gym-Log app screenshots..." %}

## Features

### 📊 Dashboard

Overview of your last workout and overall statistics: total workouts, sets, volume, and number of exercises.

### 🏋️ Workout Logger

- Select an exercise from your list
- View your previous workout for the same exercise with a **Repeat** button
- Add sets with weight and reps
- Optional comments per workout
- See calculated volume for each session

### 📈 Progress & Statistics

- Line chart visualizing your performance over time
- Multiple metrics: **Volume**, **Max Weight**, **Estimated 1RM**, **Total Reps**, **Average Weight**, **Sets**
- Detailed stats card: last workout, best workout, average, totals

### 🏅 Personal Records

- Per exercise: Max Weight lifted, Best Volume, Best Estimated 1RM
- Time-since-last-PR indicator for each record

### 💪 Exercise Management

- Add and remove exercises
- Choose from **16 gym-themed icons** when creating an exercise (💪🦵🏋️🔥⚡...)
- Icons display everywhere in the app for quick recognition

### 📅 History

- Calendar view with workout days highlighted
- Click any day to filter workouts
- Export all history as a `.json` backup file
- Delete individual workouts

### ⏰ Reminders (Android PWA)

- Create reminders with a custom name
- Select days of the week (Mon–Sun)
- Pick multiple times per day (8:00–20:00)
- Enable push notifications to receive alerts on your phone even when the app is closed
- Example: "Workday Workout" → Mon, Tue, Wed, Thu, Fri at 7:00 and 18:00

## How to Use

### Installation (Android)

1. Open the app URL in **Chrome** on your Android device
2. Tap **⋮ Menu** → **Install App** (or "Add to Home Screen")
3. Launch from your home screen — it runs like a native app

### Enabling Notifications

1. Navigate to the **Remind** tab (⏰)
2. Tap **Enable Notifications** and allow in the browser prompt
3. Create a reminder: enter a name, select days and times
4. Press **Add Reminder** — you'll receive alerts at the scheduled times

### First Time Setup

1. Go to **Exercises** (💪) and add your exercises with icons
2. Go to **Workout** (🏋️), pick an exercise, enter weight & reps, press **+ Add** for each set
3. Press **Save Workout** when done

### Backup Your Data

- All data is stored in your browser's **localStorage**
- Go to **History** (📅) → tap **Export All History** to download a `.json` backup

## URL Routes

The app supports deep linking via hash routes:

| Route         | Page               |
| ------------- | ------------------ |
| `/#dashboard` | Home / Dashboard   |
| `/#workout`   | New Workout        |
| `/#progress`  | Progress Charts    |
| `/#personal`  | Personal Records   |
| `/#exercises` | Exercise List      |
| `/#history`   | History & Calendar |
| `/#reminders` | Reminders          |

## Tech Stack

- **Svelte 5** (Runes)
- **Vite** for building
- **Tailwind CSS 4** for styling
- **Chart.js** for progress charts
- **PWA** with service worker for offline support and push notifications

---

_Built with 💪 — Log your gains!_
