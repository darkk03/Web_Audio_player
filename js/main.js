document.addEventListener("DOMContentLoaded", function () {
  // Получаем все необходимые элементы
  const playPauseButton = document.getElementById("playPauseButton");
  const audio = new Audio();
  const seekbar = document.querySelector(".seekbar");
  const seekbarr = document.querySelector(".seekbarr");
  const currentTime = document.querySelector(".current-time");
  const duration = document.querySelector(".duration");
  const volumeIcon = document.getElementById("volumeIcon");
  const playerList = document.querySelectorAll(".list-play img");
  const nextButton = document.querySelector("._next");
  const prevButton = document.querySelector("._previous");
  const repeatButton = document.querySelector("._repeat");
  let isMuted = false; // Объявляем флаг "mute" и устанавливаем его в false (звук не включен)
  let previousVolume = 50; // Сохраняем предыдущее значение уровня громкости
  let isRepeatOn = false; 

  let currentTrack = 0;
  let isPlaying = false;

  // Создаем массив с путями к аудиофайлам
  const audioFiles = ["audio/beat1.mp3", "audio/beat2.mp3", "audio/beat3.mp3", "audio/beat4.mp3"];

  // Функция для обновления информации о треке
  function updateTrackInfo() {
    const trackTitle = document.querySelector(".current-info h1");
    const trackArtist = document.querySelector(".current-info p");
    const trackImage = document.querySelector(".current-keyvisual img");

    // Получаем информацию о текущем треке (название и исполнитель)
    const currentTrackInfo = trackInfo[currentTrack];
    const title = currentTrackInfo.title;
    const artist = currentTrackInfo.artist;

    trackTitle.textContent = title; // Устанавливаем название трека
    trackArtist.textContent = artist; // Устанавливаем имя исполнителя
    trackImage.src = "images/beat" + (currentTrack + 1) + ".jpg";
  }



  

  // Создаем массив с информацией о треках (название и исполнитель)
  const trackInfo = [
    { title: "One Step At A Time", artist: "BEARSON" },
    { title: "Sunset Lover", artist: "PETIT BISCUIT" },
    { title: "Youth", artist: "TROYE SIVAN" },
    { title: "Working Girl", artist: "LITTLE BOOTS" }
  ];

  repeatButton.addEventListener("click", function () {
    isRepeatOn = !isRepeatOn; // Инвертируем состояние повтора
    if (isRepeatOn) {
      // Если повтор включен, изменяем стиль кнопки
      repeatButton.classList.add("active");
    } else {
      // Если повтор выключен, снимаем стиль кнопки
      repeatButton.classList.remove("active");
    }
  });
  
  // Обработчик события для завершения трека (при этом, если повтор включен, трек будет повторяться)
  audio.addEventListener("ended", function () {
    if (isRepeatOn) {
      // Если повтор включен, воспроизводим текущий трек снова
      audio.currentTime = 0; // Сбрасываем позицию трека в начало
      audio.play();
    } else {
      // Если повтор выключен, переключаемся на следующий трек
      nextButton.click();
    }
  });







  // Функция для обновления времени трека
  function updateSeekBar() {
    seekbar.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  }

  // Функция для форматирования времени в формат mm:ss
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  // Обработчик события для кнопки Play/Pause
  playPauseButton.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      playPauseButton.src = "images/Play.png";
      isPlaying = false;

      // Обновляем иконку у текущего трека при паузе
      playerList[currentTrack].src = "images/Play.png";
    } else {
      audio.play();
      playPauseButton.src = "images/Pause.png";
      isPlaying = true;

      // Обновляем иконку у текущего трека при воспроизведении
      playerList[currentTrack].src = "images/Pause.png";
    }
  });

// Обработчик события для кнопки Next
nextButton.addEventListener("click", function () {
  currentTrack = (currentTrack + 1) % audioFiles.length;
  audio.src = audioFiles[currentTrack];
  updateTrackInfo();
  audio.play();
  playPauseButton.src = "images/Pause.png";
  isPlaying = true;

  // Обновляем иконку у треков в списке
  playerList.forEach((button, index) => {
    button.src = index === currentTrack ? "images/Pause.png" : "images/Play.png";
  });
});

// Обработчик события для кнопки Previous
prevButton.addEventListener("click", function () {
  currentTrack = (currentTrack - 1 + audioFiles.length) % audioFiles.length;
  audio.src = audioFiles[currentTrack];
  updateTrackInfo();
  audio.play();
  playPauseButton.src = "images/Pause.png";
  isPlaying = true;

  // Обновляем иконку у треков в списке
  playerList.forEach((button, index) => {
    button.src = index === currentTrack ? "images/Pause.png" : "images/Play.png";
  });
});


  // Обработчик события для ползунка seekbar
  seekbar.addEventListener("input", function () {
    audio.currentTime = (seekbar.value / 100) * audio.duration;
    updateSeekBar();
  });







  // Функция для обновления иконки уровня громкости
  function updateVolumeIcon() {
    const seekbarrValue = seekbarr.value;
    if (isMuted || seekbarrValue === '0') {
      volumeIcon.src = 'images/Mute.png'; // Если включен режим "mute" или уровень громкости на нуле
    } else if (seekbarrValue <= 50) {
      volumeIcon.src = 'images/Volume Down.png'; // При уровне меньше или равном 50%
    } else {
      volumeIcon.src = 'images/Volume Up.png'; // При уровне больше 50%
    }
  }

  // Обработчик изменений в ползунке seekbarr
  function handleSeekBarr() {
    updateVolumeIcon();
    const volume = seekbarr.value / 100; // Преобразуем значение ползунка в диапазоне 0-1
    audio.volume = volume; // Устанавливаем уровень громкости аудиоплеера
    if (!isMuted) {
      updateVolumeIcon(); // Обновляем иконку уровня громкости при изменении громкости
    }
  }

  // Обработчик нажатия на иконку уровня громкости
  volumeIcon.addEventListener('click', () => {
    isMuted = !isMuted; // Инвертируем флаг "mute"
    if (isMuted) {
      previousVolume = seekbarr.value; // Сохраняем текущее значение уровня громкости
      seekbarr.value = '0'; // Устанавливаем уровень громкости на ноль при включении "mute"
    } else {
      seekbarr.value = previousVolume; // Возвращаем предыдущее значение уровня громкости
    }
    handleSeekBarr(); // Обновляем уровень громкости аудиоплеера
  });



  // Назначаем обработчик изменений в ползунке
  seekbarr.addEventListener('input', handleSeekBarr);

  // Инициализируем иконку уровня громкости при загрузке страницы
  updateVolumeIcon();






// Обработчик события для списка треков
playerList.forEach((playButton, index) => {
  playButton.addEventListener("click", function () {
    if (currentTrack === index && isPlaying) {
      // Если нажата иконка плей для текущего трека и трек воспроизводится, то останавливаем его
      audio.pause();
      isPlaying = false;
    } else {
      // Иначе, начинаем воспроизведение нового трека
      currentTrack = index;
      audio.src = audioFiles[currentTrack];
      updateTrackInfo();
      audio.play();
      isPlaying = true;
    }

    // Обновляем иконку у треков в списке
    playerList.forEach((button, i) => {
      button.src = i === currentTrack && isPlaying ? "images/Pause.png" : "images/Play.png";
    });
  });
});




  // Обновляем информацию о текущем треке
  updateTrackInfo();

  // Устанавливаем начальное состояние для аудиоплеера
  audio.src = audioFiles[currentTrack];
  audio.volume = 1;

  // Обновляем положение seekbar и время трека при его проигрывании
  audio.addEventListener("timeupdate", updateSeekBar);

  // Переключаемся на следующий трек при завершении текущего
  audio.addEventListener("ended", function () {
    nextButton.click();
  });
});
