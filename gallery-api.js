const loadBtn = document.getElementById('loadGalleryBtn');
const loader = document.getElementById('galleryLoader');
const errorContainer = document.getElementById('galleryError');
const errorMessage = document.getElementById('galleryErrorMessage');
const galleryContainer = document.getElementById('galleryContainer');
const photoTemplate = document.getElementById('userTemplate');

const API_BASE = 'https://jsonplaceholder.typicode.com';

loadBtn.addEventListener('click', loadPhotos);

//функция загрузки
async function loadPhotos() {
  try {
    showLoader();
    hideError();
    hideGallery();

    // случайный альбом от 1 до 10
    const randomAlbumId = Math.floor(Math.random() * 10) + 1;

    const response = await fetch(
      `${API_BASE}/photos?albumId=${randomAlbumId}&_limit=6`
    );

    if (!response.ok) {
      throw new Error(`http ${response.status}: ${getErrorMessage(response.status)}`);
    }

    const photos = await response.json();

    if (!photos.length) {
      throw new Error('фотографии не найдены');
    }

    renderPhotos(photos);
    showGallery();

  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
}

function renderPhotos(photos) {
  galleryContainer.innerHTML = '';

  photos.forEach(photo => {
    const clone = photoTemplate.content.cloneNode(true);

    const img = clone.querySelector('.user-card__avatar');
    const title = clone.querySelector('.user-card__name');
    const subtitle = clone.querySelector('.user-card__email');

    img.src = photo.thumbnailUrl;
    img.alt = photo.title;
    title.textContent = photo.title;
    subtitle.textContent = `альбом #${photo.albumId}`;

    galleryContainer.appendChild(clone);
  });
}

function handleError(error) {
  console.error('ошибка загрузки данных:', error);
  let message = 'неизвестная ошибка';

  if (error instanceof TypeError) {
    message = 'ошибка сети. проверьте соединение и vpn для jsonplaceholder.';
  } else if (error.message.toLowerCase().includes('http')) {
    message = error.message;
  } else if (error.message.toLowerCase().includes('не найдены')) {
    message = error.message;
  } else {
    message = error.message;
  }

  errorMessage.textContent = 'Error ' + message;
  showError();
}

function getErrorMessage(status) {
  const messages = {
    400: 'неверный запрос',
    404: 'ресурс не найден',
    500: 'внутренняя ошибка сервера',
    503: 'сервис недоступен',
  };
  return messages[status] || 'ошибка сервера';
}

function showLoader() { loader.hidden = false; }
function hideLoader() { loader.hidden = true; }
function showGallery() { galleryContainer.hidden = false; }
function hideGallery() { galleryContainer.hidden = true; }
function showError() { errorContainer.hidden = false; }
function hideError() { errorContainer.hidden = true; }
