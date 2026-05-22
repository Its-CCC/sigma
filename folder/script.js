const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultsScreen = document.getElementById("resultsScreen");
const settingsScreen = document.getElementById("colorBlindnessSettingsScreen");

const startButton = document.getElementById("startButton");
const mobImage = document.getElementById("mobImage");
const mobImageCaption = document.getElementById("mobImageCaption");
const confettiContainer = document.getElementById("confettiContainer");
const optionButtons = document.querySelectorAll(".option-button");

const currentPoints = document.getElementById("currentPoints");
const finalPoints = document.getElementById("finalPoints");
const colorBlindnessLink = document.getElementById("colorBlindnessLink");
const settingsBackButton = document.getElementById("settingsBackButton");
const colorModeSelect = document.getElementById("colorModeSelect");

const API_URL = "https://api.astroworldmc.com/api/v1/mobs";
// Mapping of mob id -> canonical Minecraft Fandom image URL
// These were selected from the 'Category:Mob_images' pages as actual mob sprites/renders.
const fandomImageMap = {
  cow: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5e/Cow_JE5_BE2.png/revision/latest?cb=20240729214026",
  pig: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/1a/Pig_JE3_BE2.png/revision/latest?cb=20251004183015",
  sheep: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e2/White_Sheep_JE3_BE6.png/revision/latest?cb=20190809163123",
  zombie: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/87/Zombie_JE3_BE2.png/revision/latest?cb=20191227070025",
  creeper: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/5b/Creeper_JE2_BE1.png/revision/latest?cb=20191229172043",
  skeleton: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/47/Skeleton_JE6_BE4.png/revision/latest?cb=20210227130136",
  enderman: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/28/Enderman.png/revision/latest?cb=20240729214332",
  spider: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/1f/Spider_JE4_BE3.png/revision/latest?cb=20240729213340",
  blaze: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/d0/Blaze_JE2.png/revision/latest?cb=20190511085904",
  pufferfish: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b2/Pufferfish_medium_BE.png/revision/latest?cb=20200723053807",
  chicken: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2c/Chicken_JE2_BE2.png/revision/latest?cb=20240729214013",
  wolf: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c4/Wolf_JE2_BE2.png/revision/latest?cb=20240729213411",
  ghast: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3b/Ghast_JE2_BE2.png/revision/latest?cb=20201110230444",
  slime: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/dd/Slime_JE3_BE2.png/revision/latest?cb=20191230025505",
  magma_cube: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ed/Magma_Cube.png/revision/latest?cb=20190805151823",
  guardian: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2d/Guardian_JE1_BE1.png/revision/latest?cb=20250311205844",
  shulker: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/06/Shulker.png/revision/latest?cb=20200107095352",
  witch: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e6/Witch.png/revision/latest?cb=20220611062944",
  piglin: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6c/Piglin.png/revision/latest?cb=20220610025226",
  phantom: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/7e/Phantom_JE2_BE1.png/revision/latest?cb=20180410201331",
  silverfish: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b8/Silverfish_JE1_BE1.png/revision/latest?cb=20191229153243"
};

const fallbackMobs = [
  { id: "cow", name: "Cow" },
  { id: "pig", name: "Pig" },
  { id: "sheep", name: "Sheep" },
  { id: "chicken", name: "Chicken" },
  { id: "wolf", name: "Wolf" },
  { id: "horse", name: "Horse" },
  { id: "zombie", name: "Zombie" },
  { id: "creeper", name: "Creeper" },
  { id: "skeleton", name: "Skeleton" },
  { id: "enderman", name: "Enderman" },
  { id: "spider", name: "Spider" },
  { id: "blaze", name: "Blaze" },
  { id: "pufferfish", name: "Pufferfish" },
  { id: "ghast", name: "Ghast" },
  { id: "slime", name: "Slime" },
  { id: "magma_cube", name: "Magma Cube" },
  { id: "guardian", name: "Guardian" },
  { id: "shulker", name: "Shulker" },
  { id: "witch", name: "Witch" },
  { id: "piglin", name: "Piglin" },
  { id: "phantom", name: "Phantom" },
  { id: "silverfish", name: "Silverfish" }
];

let score = 0;
let currentMob = null;
let mobs = [];

function getMobImage(id) {
  // Prefer canonical fandom images; do not use mc-heads (mob heads) which are not accurate
  if (fandomImageMap[id]) return fandomImageMap[id];
  // If we don't have a fandom image for this mob id, return an empty string to avoid head images
  return "";
}

function buildMobData(apiMob) {
  return {
    id: apiMob.id,
    name: apiMob.name,
    image: getMobImage(apiMob.id)
  };
}

async function fetchMobData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.success && Array.isArray(data.data)) {
      // build list and keep only entries with fandom images
      mobs = data.data.map(buildMobData).filter((m) => m.image);
      // remove duplicate images (some files appear more than once under different ids)
      const seen = new Set();
      mobs = mobs.filter((m) => {
        if (!m.image) return false;
        if (seen.has(m.image)) return false;
        seen.add(m.image);
        return true;
      });
    }
  } catch (error) {
    console.warn("Could not load mobs from Astroworld API:", error);
  }
    if (!mobs.length) {
      // Use only fallback mobs that have a fandom image available and remove duplicates
      mobs = fallbackMobs.map(buildMobData).filter((m) => m.image);
      const seen2 = new Set();
      mobs = mobs.filter((m) => {
        if (seen2.has(m.image)) return false;
        seen2.add(m.image);
        return true;
      });
    }
}

function show(screen) {
  startScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  settingsScreen.classList.add("hidden");
  screen.classList.remove("hidden");
}

function launchConfetti() {
  if (!confettiContainer) return;
  const colors = ['#f7d976', '#ff5a5f', '#6dbc7a', '#3c7d86', '#e06f66'];
  for (let i = 0; i < 20; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.animationDuration = `${1 + Math.random() * 0.6}s`;
    confettiContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 1800);
  }
}

function applyColorMode(mode) {
  const classes = ['cb-normal','cb-protanopia','cb-deuteranopia','cb-tritanopia'];
  document.body.classList.remove(...classes);
  const cls = mode === 'normal' ? 'cb-normal' : 'cb-' + mode;
  document.body.classList.add(cls);
  try { localStorage.setItem('colorMode', mode); } catch(e){}
}

function loadQuestion() {
  if (!mobs.length) {
    finalPoints.textContent = score;
    show(resultsScreen);
    return;
  }
  currentMob = mobs[Math.floor(Math.random() * mobs.length)];
  mobImage.src = currentMob.image;
  mobImage.alt = `Minecraft mob image of ${currentMob.name}`;
  if (mobImageCaption) {
    mobImageCaption.textContent = `Image showing a Minecraft ${currentMob.name}. Use the question text to make your guess.`;
  }
  const answers = [currentMob.name];
  while (answers.length < 4) {
    const pick = mobs[Math.floor(Math.random() * mobs.length)].name;
    if (!answers.includes(pick)) answers.push(pick);
  }
  answers.sort(() => Math.random() - 0.5);
  optionButtons.forEach((btn, i) => {
    btn.textContent = answers[i];
    btn.onclick = () => {
      if (btn.textContent === currentMob.name) {
        score++;
        currentPoints.textContent = "Current points: " + score;
        launchConfetti();
        loadQuestion();
      } else {
        finalPoints.textContent = score;
        show(resultsScreen);
      }
    };
  });
}

startButton.onclick = async () => {
  if (!mobs.length) {
    startButton.disabled = true;
    startButton.textContent = "Loading mobs...";
    await fetchMobData();
    startButton.disabled = false;
    startButton.textContent = "Start Game";
  }
  score = 0;
  currentPoints.textContent = "Current points: 0";
  show(gameScreen);
  loadQuestion();
};

colorBlindnessLink.onclick = (event) => {
  event.preventDefault();
  show(settingsScreen);
};

settingsBackButton.onclick = () => show(startScreen);
show(startScreen);

// Initialize color mode selector and apply saved preference
(function(){
  if (!colorModeSelect) return;
  const saved = (function(){ try{ return localStorage.getItem('colorMode') }catch(e){return null} })() || 'normal';
  colorModeSelect.value = saved;
  applyColorMode(saved);
  colorModeSelect.onchange = (e) => applyColorMode(e.target.value);
})();