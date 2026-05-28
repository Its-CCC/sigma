## Milestone 1 — Plan and site map

Description of Game:
Guess minecraft mobs by their picture

Problem Statement:

 What if we designed a guessing game where players have to guess what minecraft mob is which based on sound, or visuals
Game Mechanics:
## Milestone 2 — Wireframes
Wireframe: 

# MobGuessr — Project Specification

## Overview
MobGuessr is a lightweight browser game that shows Minecraft mob images and asks players to identify the mob from multiple choice answers. The project prioritizes accessibility, mobile support, and an optional cross-computer multiplayer mode for shared play.

## Goals
- Provide a simple, fast, and accessible single-player experience.
- Allow optional cross-computer multiplayer via short room codes to compare scores in real time.
- Use canonical Minecraft Fandom images (not mob-head proxies) for visual accuracy.
- Keep the UI responsive and keyboard friendly (1-4 keys select answers).

## Technical Stack
- Plain HTML / CSS / JavaScript (no build step required)
- Peer-to-peer connectivity via PeerJS for optional multiplayer
- External mob metadata from: `https://api.astroworldmc.com/api/v1/mobs`

## Repository Layout
- `folder/index.html` — application UI and screens
- `folder/styles.css` — styles, responsive rules, color-blind palettes
- `folder/script.js` — game logic, mob loading, multiplayer sync
- `spec.md` — this specification
- `README.md` — user-facing documentation

## Gameplay (detailed mechanics)
- Each round presents one mob image and four answer options.
- Players may select an answer by clicking a button or pressing `1`/`2`/`3`/`4` on the keyboard.
- Correct answer: +1 point, confetti feedback, next question loads immediately.
- Incorrect answer: game ends and final score is shown; player may restart.
- Questions are drawn from a filtered list of mobs that have canonical Fandom images to avoid empty or misleading assets.

## Multiplayer (cross-computer)
- Mode: optional two-player peer-to-peer session using short 6-character room codes.
- Flow:
	1. Player A taps `Create room` — the client generates a 6-character room code and initializes a PeerJS peer with that ID.
	2. Player A shares the code with Player B (out-of-band). Player B enters the code and taps `Join room` to connect.
	3. When connected, each client sends score updates (`{type: 'score', score: <n>}`) to the peer; both UIs show local and remote scores.
 4. The game experience remains local — each player plays independently — but scores are synchronized for friendly competition.
- Security & reliability notes: PeerJS public brokers are used for signaling in this prototype. For production, host a dedicated signaling server or implement an authenticated relay.

## Accessibility
- Keyboard-first controls (numeric keys + focusable buttons). ARIA labels applied to interactive elements.
- Images include `alt` text and a concise caption describing the stimulus (no revealing answer text in captions).
- Color-blindness presets available and persisted via `localStorage`.
- Focus-visible outlines, large touch targets, and sufficient contrast (target WCAG AA where feasible).

## UI / UX
- Minimal layout: header, nav (Leaderboard / Multiplayer / Settings), game area, and results screen.
- Responsive grid for answer buttons; touch-friendly sizes on mobile.
- Confetti animation provides celebratory feedback for correct guesses without relying on color alone.

## Assets
- All mob images are canonical Fandom assets mapped by mob ID in `script.js`.
- No sounds are included in the current build to keep the app simple and focused on accessibility.

## Testing & Validation
- Manual playthrough on desktop and mobile (responsive checks).
- Keyboard navigation test: `Tab` focus, `Enter`/`Space` activation, `1-4` keys for answers.
- Peer connection test: create/join a room across two devices on different networks (or use local browser tabs for quick checks).

## Roadmap / Enhancements
- Persist high scores to a backend leaderboard (optional) and replace the placeholder table.
- Add more multiplayer modes (simultaneous, head-to-head rounds, time-limited rounds).
- Improve matchmaking and room discovery (server-backed) for larger player counts.

## Success Metrics
- Players can complete a full session without UI or accessibility blockers.
- Multiplayer room connects reliably with short codes in typical network environments.
- No missing images or empty questions in the default mob set.

---
Updated: concise, actionable spec covering gameplay, multiplayer, accessibility, and next steps.
<img width="1016" height="758" alt="image" src="https://github.com/user-attachments/assets/1080c96d-16bc-4b32-a79a-7914871dfce2" />




Wireframe Notes (provide additional context for your agent to create the sitemap based on your wireframe):



## Milestone 3 — Designing for consistency

Describe your site aesthetics, including the color palette 
Very simple, very light green and brown 
## Milestone 4 — Accessibility

### POUR commitment

Perceivable:
Text stands out clearly from the background (no low-contrast color)
Images and stimulus media have alt text or captions that describe them
Important information isn't shown by color alone (don't rely on red = wrong, green = right)

Operable:
Everything works with a keyboard, not just a mouse or touchscreen
Buttons and guess inputs are easy to find, click, or tap
There's enough time to read and respond — nothing disappears too fast

Understandable:
Instructions are in clear, simple language
Navigation works the same way on every screen
Error messages explain what went wrong and how to fix it (in the voice of your twist)
Robust: 
The site loads correctly on phones, tablets, and computers
HTML is clean and valid so screen readers can navigate it
Interactive parts (buttons, inputs) work with assistive technologies
