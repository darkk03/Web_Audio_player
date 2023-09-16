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

export function initializeAudioPlayer() {
  let audio = new Audio();
  let isMuted = false;
  let previousVolume = 50;
  let currentTrack = 0;
  let isPlaying = false;

  const audioFiles = ["audio/beat1.mp3", "audio/beat2.mp3", "audio/beat3.mp3", "audio/beat4.mp3"];

  function updateTrackInfo() {
    const trackTitle = document.querySelector(".current-info h1");
    const trackArtist = document.querySelector(".current-info p");
    const trackImage = document.querySelector(".current-keyvisual img");

    const currentTrackInfo = trackInfo[currentTrack];
    const title = currentTrackInfo.title;
    const artist = currentTrackInfo.artist;

    trackTitle.textContent = title;
    trackArtist.textContent = artist;
    trackImage.src = `images/beat${currentTrack + 1}.jpg`;
  }

  const trackInfo = [
    { title: "One Step At A Time", artist: "BEARSON" },
    { title: "Sunset Lover", artist: "PETIT BISCUIT" },
    { title: "Youth", artist: "TROYE SIVAN" },
    { title: "Working Girl", artist: "LITTLE BOOTS" },
  ];

  function handleRepeat() {
    if (audio.loop === true) {
      audio.loop = false;
      repIcon.classList.remove('active');
    } else {
      audio.loop = true;
      repIcon.classList.add('active');
    }
  }

  repIcon.addEventListener('click', handleRepeat);

  function updateSeekBar() {
    seekbar.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  playPauseButton.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      playPauseButton.src = "images/Play.png";
      isPlaying = false;
      playerList[currentTrack].src = "images/Play.png";
    } else {
      audio.play();
      playPauseButton.src = "images/Pause.png";
      isPlaying = true;
      playerList[currentTrack].src = "images/Pause.png";
    }
  });

  nextButton.addEventListener("click", function () {
    currentTrack = (currentTrack + 1) % audioFiles.length;
    audio.src = audioFiles[currentTrack];
    updateTrackInfo();
    audio.play();
    playPauseButton.src = "images/Pause.png";
    isPlaying = true;

    playerList.forEach((button, index) => {
      button.src = index === currentTrack ? "images/Pause.png" : "images/Play.png";
    });
  });

  prevButton.addEventListener("click", function () {
    currentTrack = (currentTrack - 1 + audioFiles.length) % audioFiles.length;
    audio.src = audioFiles[currentTrack];
    updateTrackInfo();
    audio.play();
    playPauseButton.src = "images/Pause.png";
    isPlaying = true;

    playerList.forEach((button, index) => {
      button.src = index === currentTrack ? "images/Pause.png" : "images/Play.png";
    });
  });

  seekbar.addEventListener("input", function () {
    audio.currentTime = (seekbar.value / 100) * audio.duration;
    updateSeekBar();
  });

  function updateVolumeIcon() {
    const seekbarrValue = seekbarr.value;
    if (isMuted || seekbarrValue === '0') {
      volumeIcon.src = 'images/Mute.png';
    } else if (seekbarrValue <= 50) {
      volumeIcon.src = 'images/Volume Down.png';
    } else {
      volumeIcon.src = 'images/Volume Up.png';
    }
  }

  function handleSeekBarr() {
    updateVolumeIcon();
    const volume = seekbarr.value / 100;
    audio.volume = volume;
    if (!isMuted) {
      updateVolumeIcon();
    }
  }

  volumeIcon.addEventListener('click', () => {
    isMuted = !isMuted;
    if (isMuted) {
      previousVolume = seekbarr.value;
      seekbarr.value = '0';
    } else {
      seekbarr.value = previousVolume;
    }
    handleSeekBarr();
  });

  seekbarr.addEventListener('input', handleSeekBarr);

  updateVolumeIcon();

  playerList.forEach((playButton, index) => {
    playButton.addEventListener("click", function () {
      if (currentTrack === index && isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        currentTrack = index;
        audio.src = audioFiles[currentTrack];
        updateTrackInfo();
        audio.play();
        isPlaying = true;
      }

      playerList.forEach((button, i) => {
        button.src = i === currentTrack && isPlaying ? "images/Pause.png" : "images/Play.png";
      });
    });
  });

  updateTrackInfo();

  audio.src = audioFiles[currentTrack];
  audio.volume = 1;

  audio.addEventListener("timeupdate", updateSeekBar);

  audio.addEventListener("ended", function () {
    nextButton.click();
  });
}
