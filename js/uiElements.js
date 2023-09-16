// uiElements.js
import {
  playPauseButton,
  volumeIcon,
  playerList,
  nextButton,
  prevButton,
  seekbar,
  seekbarr,
  currentTime,
  duration,
  repIcon,
} from './variables.js';

export function initializeUIElements() {

  volumeIcon.addEventListener('click', () => {
  });

  playerList.forEach((playButton, index) => {
    playButton.addEventListener("click", function () {

    });
  });

  nextButton.addEventListener("click", function () {
  });

  prevButton.addEventListener("click", function () {
  });

  seekbar.addEventListener("input", function () {
  });

  seekbarr.addEventListener('input', function () {
  });

  repIcon.addEventListener('click', function () {
  });
}
