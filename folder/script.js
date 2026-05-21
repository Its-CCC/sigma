const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultsScreen = document.getElementById("resultsScreen");
const settingsScreen = document.getElementById("colorBlindnessSettingsScreen");

const startButton = document.getElementById("startButton");
const mobImage = document.getElementById("mobImage");
const optionButtons = document.querySelectorAll(".option-button");

const currentPoints = document.getElementById("currentPoints");
const finalPoints = document.getElementById("finalPoints");
const playSoundBtn = document.getElementById("playSoundAgainButton");
const colorBlindnessLink = document.getElementById("colorBlindnessLink");
const settingsBackButton = document.getElementById("settingsBackButton");

const API_URL = "https://api.astroworldmc.com/api/v1/mobs";
const soundMap = {
  cow: "https://minecraft.wiki/images/Cow1.ogg",
  pig: "https://minecraft.wiki/images/Pig1.ogg",
  sheep: "https://minecraft.wiki/images/Sheep1.ogg",
  zombie: "https://minecraft.wiki/images/Zombie_say1.ogg",
  creeper: "https://minecraft.wiki/images/Creeper_hiss1.ogg",
  skeleton: "https://minecraft.wiki/images/Skeleton_say1.ogg",
  enderman: "https://minecraft.wiki/images/Enderman_idle1.ogg",
  spider: "https://minecraft.wiki/images/Spider1.ogg"
};

const wikiImageMap = {
  zombie: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Minecraft_Zombie.png/250px-Minecraft_Zombie.png",
  skeleton: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Minecraft_Skeleton.png/250px-Minecraft_Skeleton.png",
  creeper: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Minecraft_Creeper.png/250px-Minecraft_Creeper.png",
  enderman: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Minecraft_Enderman.png/250px-Minecraft_Enderman.png",
  pig: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Minecraft_Pig.png/250px-Minecraft_Pig.png",
  spider: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Minecraft_Spider.png/250px-Minecraft_Spider.png"
};

const fallbackMobs = [
  { id: "cow", name: "Cow" },
  { id: "pig", name: "Pig" },
  { id: "sheep", name: "Sheep" },
  { id: "zombie", name: "Zombie" },
  { id: "creeper", name: "Creeper" },
  { id: "skeleton", name: "Skeleton" },
  { id: "enderman", name: "Enderman" },
  { id: "spider", name: "Spider" }
];

let score = 0;
let currentMob = null;
let audio = null;
let mobs = [];

function getMobImage(id) {
  return wikiImageMap[id] || `https://mc-heads.net/head/${encodeURIComponent(id)}`;
}

function buildMobData(apiMob) {
  return {
    id: apiMob.id,
    name: apiMob.name,
    image: getMobImage(apiMob.id),
    sound: soundMap[apiMob.id]
  };
}

async function fetchMobData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.success && Array.isArray(data.data)) {
      mobs = data.data.filter((mob) => soundMap[mob.id]).map(buildMobData);
    }
  } catch (error) {
    console.warn("Could not load mobs from Astroworld API:", error);
  }
  if (!mobs.length) {
    mobs = fallbackMobs.map(buildMobData);
  }
}

function show(screen) {
  startScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  settingsScreen.classList.add("hidden");
  screen.classList.remove("hidden");
}

function playSound() {
  if (!currentMob || !currentMob.sound) return;
  if (audio) audio.pause();
  audio = new Audio(currentMob.sound);
  audio.play().catch(() => {
    console.warn("Sound playback failed for", currentMob.name);
  });
}

function loadQuestion() {
  if (!mobs.length) {
    finalPoints.textContent = score;
    show(resultsScreen);
    return;
  }
  currentMob = mobs[Math.floor(Math.random() * mobs.length)];
  mobImage.src = currentMob.image;
  mobImage.alt = currentMob.name;
  playSound();
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
playSoundBtn.onclick = playSound;
show(startScreen);