MobGuessr — simple Minecraft mob guessing game
=============================================

MobGuessr is a lightweight browser game that shows Minecraft mob images and asks the player to guess which mob it is. Images are sourced from the Minecraft Fandom (Gamepedia) `Category:Mob_images` pages so the sprites/renders are accurate.

Features
--------
- Uses canonical mob images from Minecraft Fandom.
- Responsive, touch-friendly UI for mobile devices.
- Color-blindness palettes (Normal / Protanopia / Deuteranopia / Tritanopia) with persistence.
- Accessibility improvements: descriptive alt text, captions, focus outlines, and ARIA live regions.
- Multiplayer mode using PeerJS room codes with an explicit Start round button and 60-second timed rounds.
- Confetti celebration on correct answers.

Quick start
-----------
1. Open the game in a browser by opening `folder/index.html` or serve the repo and visit the page:

```bash
# from repo root
python3 -m http.server 8000
# then open http://localhost:8000/folder/index.html
```

Start the optional local scores backend
-------------------------------------
To run the minimal scores server (used by the Submit Score button):

```bash
# install dependencies once
npm install
# start the server (listens on port 3000)
npm start
# open http://localhost:3000/ to view the game served by the backend
```

Project layout
--------------
- `folder/index.html` — game UI
- `folder/styles.css` — styles, responsive rules, and color-blindness variables
- `folder/script.js` — game logic, image mapping, settings persistence

How it works
------------
- `folder/script.js` fetches a mob list from the Astroworld API and maps mob ids to fandom image URLs defined in the `fandomImageMap`.
- Only mobs with a known fandom image are shown; duplicates (same image used by multiple ids) are filtered out.
- Multiplayer uses PeerJS and short room codes; once connected, players press Start round to begin a shared 60-second timed session with live score sync.
- The settings screen exposes a color-mode selector which persists to `localStorage` and applies CSS variable overrides.

Development notes
-----------------
- Editing images/mappings: update `fandomImageMap` in `folder/script.js` to add more mob ids and fandom image URLs.
- Accessibility: image `alt` and caption update per question; `#currentPoints` uses `aria-live="polite"`.
- Styling: `folder/styles.css` uses CSS variables and `.cb-*` classes for color modes.

Testing on mobile
-----------------
- The UI is responsive; use your browser's device emulation or open the served page on a phone on the same network.

Next improvements
-----------------
- Add a small placeholder sprite for missing images.
- Log missing mob ids automatically and provide a tooling page to map them to fandom files.
- Add keyboard shortcuts for answers and improved screen-reader announcements of correct/incorrect answers.

License
-------
- MIT 

Credits
-------
- Mob images are from Minecraft Fandom (Gamepedia). Game logic and code by the project owner.

Enjoy! Send feedback or request more mappings and I can add them.
