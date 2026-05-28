### Project build plan (AI-assisted)

### **Task 1 — Project run & dev setup**
* **Depends on:** nothing
* **Description:** Verify the repository runs locally and document a minimal dev workflow. Confirm `folder/index.html` loads in a browser and that `folder/script.js` has no syntax errors. Add a short run note to `README.md` describing how to open the app and run a local static server.
* **Acceptance criteria:** `folder/index.html` renders the start screen; `node -c folder/script.js` reports no syntax errors; `README.md` contains a "Run locally" section.
* **Status:** `[ ]` not started

### **Task 2 — Mob data fetch & image mapping**
* **Depends on:** Task 1
* **Description:** Harden the mob data import: ensure `fetchMobData()` handles network failures, maintain `fandomImageMap` for canonical images, skip mobs without mapped images, and deduplicate identical images.
* **Acceptance criteria:** When the API is available, `mobs` is populated from API entries that have mapped images; in offline or failure cases the `fallbackMobs` list is used; duplicates are removed and missing mappings are logged.
* **Status:** `[ ]` not started

### **Task 3 — Single-player game loop**
* **Depends on:** Task 2
* **Description:** Finalize the single-player experience: deterministic question selection, answer rendering, keyboard handling, scoring, confetti feedback, and result screen behavior.
* **Acceptance criteria:** Users can play a full single-player session; `1-4` keys correspond to the four answers; correct answers increase score and continue; incorrect answers show the results screen with the final score.
* **Status:** `[ ]` not started

### **Task 4 — Accessibility & responsive UI**
* **Depends on:** Task 3
* **Description:** Ensure ARIA labels, non-revealing captions, keyboard focus order, visible focus outlines, color-blind mode application, and mobile-friendly touch targets. Verify color contrast for body text and interactive controls.
* **Acceptance criteria:** All interactive controls are operable by keyboard, images have appropriate `alt` and captions, color mode persists across reloads, and UI is readable on small viewports.
* **Status:** `[ ]` not started

### **Task 5 — Peer-to-peer multiplayer signaling**
* **Depends on:** Task 2, Task 3
* **Description:** Implement short room-code PeerJS signaling. Handle creating a peer with a 6-character ID, connecting by code, sending/receiving messages (`ready`, `start`, `score`, `end`), and showing connection status.
* **Acceptance criteria:** A player can create a room and another player can join via a 6-character code; messages are exchanged and connection status is shown in the UI.
* **Status:** `[ ]` not started

### **Task 6 — Timed multiplayer rounds & result flow**
* **Depends on:** Task 5, Task 3
* **Description:** Start a 60-second timed round when both players are connected. During the round, incorrect answers do not end the round. At round end, both peers send an `end` message with final score and display a win/lose/tie screen.
* **Acceptance criteria:** Timed 60s rounds start reliably after connection, the timer is visible and accurate, local and remote scores sync during the round, and the multiplayer result screen accurately reflects outcome.
* **Status:** `[ ]` not started

### **Task 7 — Persistent leaderboard backend prototype**
* **Depends on:** Task 1, Task 3
* **Description:** Build a minimal Node + Express service with `POST /scores` and `GET /scores` endpoints that stores scores in a JSON file. Integrate the frontend so players can submit and view top scores.
* **Acceptance criteria:** Backend runs locally, frontend fetches `GET /scores` and displays persisted high scores, and `POST /scores` stores new entries.
* **Status:** `[ ]` not started

### **Task 8 — Testing, documentation, and polish**
* **Depends on:** Tasks 1–7 (some parts parallelizable)
* **Description:** Execute manual testing (responsive/mobile, keyboard, multiplayer across devices), add developer docs, update `spec.md` and `README.md`, fix bugs found, and finalize UX details.
* **Acceptance criteria:** Testing checklist passes manually, docs are updated with run/test instructions, and remaining major bugs are addressed.
* **Status:** `[ ]` not started


