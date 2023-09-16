// main.js
import { initializeAudioPlayer } from './audioPlayer.js';
import { initializeUIElements } from './uiElements.js';

document.addEventListener("DOMContentLoaded", function () {
  initializeAudioPlayer();
  initializeUIElements();
});
