/*************************************************************
 * script.js
 * Loads .mp3 filenames from soundsMap.json, picks random ones,
 * and switches from static_image.png to the appropriate GIF.
 *************************************************************/

// DOM elements
const chuchaBtn = document.getElementById("chucha-btn");
const jubaBtn = document.getElementById("juba-btn");
const displayGif = document.getElementById("display-gif");
const audioElement = document.getElementById("audio");

// We'll fetch and store the arrays of mp3 filenames here
let chuchaSounds = [];
let jubaSounds = [];

/**
 * Fetches the JSON file that contains our static arrays of
 * mp3 filenames for "chucha" and "juba".
 */
async function loadSoundsMap() {
  try {
    const response = await fetch("resources/soundsMap.json");
    if (!response.ok) {
      throw new Error("Failed to load soundsMap.json");
    }
    const data = await response.json();
    // data should have structure { chucha: [...], juba: [...] }
    chuchaSounds = data.chucha.map((file) => `resources/sounds/chucha/${file}`);
    jubaSounds = data.juba.map((file) => `resources/sounds/juba/${file}`);
  } catch (err) {
    console.error(err);
  }
}

/** Random selection helper */
function getRandomItem(array) {
  if (!array.length) return null;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/** Plays the given sound file in the hidden <audio> element */
function playSound(soundPath) {
  if (!soundPath) return;
  audioElement.src = soundPath;
  audioElement.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
}

// Attach button listeners
function setupListeners() {
  chuchaBtn.addEventListener("click", () => {
    // Switch GIF to chuchot_opt1
    displayGif.src = "resources/animation/chuchot_opt1.gif";
    // Random chucha sound
    const chosenSound = getRandomItem(chuchaSounds);
    playSound(chosenSound);
  });

  jubaBtn.addEventListener("click", () => {
    // Switch GIF to jubot_opt1
    displayGif.src = "resources/animation/jubot_opt1.gif";
    // Random juba sound
    const chosenSound = getRandomItem(jubaSounds);
    playSound(chosenSound);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadSoundsMap(); // load the .mp3 file arrays from the JSON
  setupListeners();
});
