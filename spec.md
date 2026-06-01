MobGuessr — Project Specification

Overview
--------
MobGuessr is a lightweight browser game that shows Minecraft mob images and asks players to identify the mob from multiple-choice answers. The project emphasizes accessibility, responsive UI for phones/tablets/desktops, and an optional peer-to-peer multiplayer mode using short room codes.

Current repository state
------------------------
- Frontend-only: open `folder/index.html` in a browser to run locally (no build step required).
- Key files:
  - `folder/index.html` — UI and screens: Start, Game, Results, Settings, Multiplayer, Leaderboard (placeholder)
  - `folder/styles.css` — CSS variables, responsive rules, color-blind presets, multiplayer & leaderboard styles
  - `folder/script.js` — game logic, mob-image mapping, Astroworld API fetch fallback, PeerJS-based multiplayer
  - `README.md` — user-facing docs and usage notes
  - `AI_CHAT_LOG.md` — saved conversation history and changelog notes
  - `spec.md` — this file

Behavior and features (accurate)
--------------------------------
- Mob data
  - The app attempts to fetch mob metadata from `https://api.astroworldmc.com/api/v1/mobs`.
  - `folder/script.js` contains a `fandomImageMap` mapping mob IDs to canonical Minecraft Fandom image URLs. Entries without a mapped Fandom image are skipped to avoid using inaccurate mob-head proxies.
  - A `fallbackMobs` list exists inside `script.js` to provide a local set when the API is unavailable.

- Single-player gameplay
  - Each round shows one mob image and four answer options.
  - Players select answers by clicking/tapping buttons or pressing keys `1`–`4`.
  - Correct answer: +1 point, confetti animation, immediately loads next question.
  - Incorrect answer: ends the session and shows the results screen with final score.

- Accessibility
  - Buttons are focusable, have ARIA labels, and display visible focus outlines.
  - Images include non-revealing `alt` text and a caption that describes the stimulus without naming the answer.
  - Color-blindness presets (Normal / Protanopia / Deuteranopia / Tritanopia) are implemented and persisted in `localStorage`.
  - Touch-friendly sizing and responsive layout for mobile devices.

- Multiplayer (current implementation)
  - Peer-to-peer via PeerJS (the CDN script is included in `index.html`).
  - The client generates a short 6-character room code (`generateRoomCode()`), then creates a PeerJS peer with that ID. The other player connects using the same code.
  - Once connected, players use an explicit Start round button to begin a shared 60-second timed multiplayer session.
  - Clients exchange lightweight messages such as `{type: 'score', score: <n>}` so each side can display the other's score in near-real time.
  - Gameplay remains local and peer-synced; there is no authoritative server or persistent multiplayer backend yet.
   - A minimal scores backend prototype is included: `GET /scores` and `POST /scores` endpoints store and return persisted leaderboard entries when the optional Node/Express server is running.

Known limitations and cautions
-----------------------------
- PeerJS in this repo relies on public signaling brokers for prototyping. For production, consider hosting a private signaling server or using an authenticated relay to improve reliability and security.
- The leaderboard in the UI is a static placeholder; there is no server-side persistent leaderboard yet.
- External Fandom image URLs may be subject to CORS restrictions or future URL changes. For stability, consider bundling vetted images or using an image proxy/service.
- Peer-to-peer NAT/firewall traversal can fail in some network environments; consider adding a signaling server or TURN relay for reliability.

How to run and test locally
---------------------------
- Quick test (no server): open `folder/index.html` in a browser.
- To simulate multiplayer locally: open two tabs or two browsers, create a room in one, join with the generated code in the other, press Start round, and verify the 60-second timer runs while local/remote scores sync when answering.
- Optional: serve the folder with a simple static server to avoid file:// restrictions:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/folder/
```

Testing checklist
-----------------
- Verify images load for the default mob set by inspecting `fandomImageMap` in `folder/script.js`.
- Keyboard accessibility: use `Tab` to focus answer buttons and `1`–`4` to submit.
- Multiplayer connectivity: Create a room and join from another tab/device; confirm local/remote scores update when answering.

Short-term roadmap
------------------
- Replace placeholder leaderboard with a small backend (Node/Express + JSON or a lightweight database) to persist high scores and show server-sorted leaderboards.
- Add optional synchronized multiplayer modes (round-based or head-to-head) with an authoritative coordinator (either peer-elected or server-backed).
- Harden multiplayer transport (private signaling server, TURN relay) for more consistent cross-network connectivity.
- Add automated image availability checks and graceful fallback UIs when images fail to load.

Document history
----------------
- Last updated: (this commit) — reflects current multiplayer start-button flow, 60-second timed rounds, and updated docs.

---

If you'd like, I can also:
- Create a small server prototype for the leaderboard (Node + Express + JSON file) and wire the frontend to it.
- Add an image availability checker script that warns about missing Fandom URLs.
