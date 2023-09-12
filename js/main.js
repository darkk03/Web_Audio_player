// Получаем ссылки на элементы DOM
const seekbar = document.querySelector('.seekbar');
const volumeIcon = document.getElementById('volumeIcon');
let isMuted = false; // Объявляем флаг "mute" и устанавливаем его в false (звук не включен)

// Функция для обновления иконки уровня громкости
function updateVolumeIcon() {
  const seekbarValue = seekbar.value;
  if (isMuted || seekbarValue === 0) {
    volumeIcon.src = 'images/Mute.png'; // Если включен режим "mute" или уровень громкости на нуле
  } else if (seekbarValue <= 50) {
    volumeIcon.src = 'images/Volume Down.png'; // При уровне меньше или равном 50%
  } else {
    volumeIcon.src = 'images/Volume Up.png'; // При уровне больше 50%
  }
}

// Обработчик изменений в ползунке
function handleSeekBar() {
  updateVolumeIcon();
  // Здесь можно добавить другую логику, связанную с ползунком, если необходимо
}

// Обработчик нажатия на иконку уровня громкости
volumeIcon.addEventListener('click', () => {
  isMuted = !isMuted; // Инвертируем флаг "mute"
  if (isMuted) {
    seekbar.value = 0; // Устанавливаем уровень громкости на ноль при включении "mute"
  }
  handleSeekBar(); // Обновляем иконку после изменения состояния звука
});

// Назначаем обработчик изменений в ползунке
seekbar.addEventListener('input', handleSeekBar);

// Инициализируем иконку уровня громкости при загрузке страницы
updateVolumeIcon();
