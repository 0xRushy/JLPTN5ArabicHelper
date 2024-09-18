document.addEventListener('DOMContentLoaded', function () {
  const vocabCard = document.getElementById('vocabCard');
  const kanjiElement = document.getElementById('kanji');
  const furiganaElement = document.getElementById('furigana');
  const meaningElement = document.getElementById('meaning');
  const audioElement = document.getElementById('audio');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const favoriteBtn = document.getElementById('favoriteBtn');
  const viewFavoritesBtn = document.getElementById('viewFavoritesBtn');
  const aboutBtn = document.getElementById('aboutBtn');
  const removeBtn = document.getElementById('removeBtn');
  const favKanjiElement = document.getElementById('favKanji');
  const favFuriganaElement = document.getElementById('favFurigana');
  const favMeaningElement = document.getElementById('favMeaning');
  const favAudioElement = document.getElementById('favAudio');
  const noFavoritesMessage = document.getElementById('noFavorites');

  let currentIndex = 0;
  let favoriteIndex = 0;
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  let showingFavorites = false;
  let showingAbout = false;

  fetch('vocab-list.json')
    .then(response => response.json())
    .then(data => {
      vocabList = data;
      shuffle(vocabList);
      loadVocab(currentIndex);

      if (favorites.length > 0) {
        noFavoritesMessage.style.display = 'none';
      } else {
        noFavoritesMessage.style.display = 'block';
      }
    })
    .catch(error => console.error('Error loading vocabulary data:', error));

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadVocab(index) {
    const vocab = vocabList[index];
    kanjiElement.textContent = vocab.kanji;
    furiganaElement.textContent = vocab.furigana;
    meaningElement.textContent = vocab.meaning;
    meaningElement.style.display = 'none';

    const encodedKanji = encodeURIComponent(vocab.kanji);
    const forvoUrl = `https://forvo.com/word/${encodedKanji}/#ja`;

    audioElement.innerHTML = `<a href="${forvoUrl}" target="_blank">استمع للكلمة على فورفو</a>`;
  }

  function loadFavorite(index) {
    const vocab = favorites[index];
    favKanjiElement.textContent = vocab.kanji;
    favFuriganaElement.textContent = vocab.furigana;
    favMeaningElement.textContent = vocab.meaning;
    favMeaningElement.style.display = 'none';

    const encodedKanji = encodeURIComponent(vocab.kanji);
    const forvoUrl = `https://forvo.com/word/${encodedKanji}/#ja`;

    favAudioElement.innerHTML = `<a href="${forvoUrl}" target="_blank">استمع للكلمة على فورفو</a>`;
  }

  function getRandomIndex() {
    return Math.floor(Math.random() * vocabList.length);
  }

  function addFavorite() {
    const vocab = vocabList[currentIndex];
    if (!favorites.find(fav => fav.kanji === vocab.kanji)) {
      favorites.push(vocab);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert("تمت الإضافة إلى المفضلة!");
    } else {
      alert("الكلمة موجودة بالفعل في المفضلة!");
    }
  }

  function removeFavorite() {
    const vocab = favorites[favoriteIndex];
    const index = favorites.findIndex(fav => fav.kanji === vocab.kanji);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      if (favorites.length > 0) {
        favoriteIndex = favoriteIndex % favorites.length;
        loadFavorite(favoriteIndex);
      } else {
        favoriteIndex = 0;
        favKanjiElement.textContent = "";
        favFuriganaElement.textContent = "";
        favMeaningElement.textContent = "";
        favAudioElement.innerHTML = "";
        noFavoritesMessage.style.display = 'block';
      }
    }
  }

  function toggleFavorites() {
    showingFavorites = !showingFavorites;
    showingAbout = false;
    document.querySelector('.card-about').style.display = 'none';
    if (showingFavorites) {
      vocabCard.classList.add('flip');
      if (favorites.length > 0) {
        loadFavorite(favoriteIndex);
        noFavoritesMessage.style.display = 'none';
      } else {
        noFavoritesMessage.style.display = 'block';
      }
    } else {
      vocabCard.classList.remove('flip');
      noFavoritesMessage.style.display = 'none';
    }
  }

  function toggleAbout() {
    showingAbout = !showingAbout;
    showingFavorites = false;
    noFavoritesMessage.style.display = 'none';
    if (showingAbout) {
      vocabCard.classList.add('flip');
      document.querySelector('.card-about').style.display = 'block';
    } else {
      vocabCard.classList.remove('flip');
      document.querySelector('.card-about').style.display = 'none';
    }
  }

  vocabCard.addEventListener('click', function () {
    if (!showingFavorites && !showingAbout) {
      meaningElement.style.display = meaningElement.style.display === 'none' ? 'block' : 'none';
    } else if (showingFavorites) {
      favMeaningElement.style.display = favMeaningElement.style.display === 'none' ? 'block' : 'none';
    }
  });

  nextBtn.addEventListener('click', function () {
    if (!showingFavorites && !showingAbout) {
      currentIndex = (currentIndex + 1) % vocabList.length;
      loadVocab(currentIndex);
    } else if (showingFavorites && favorites.length > 0) {
      favoriteIndex = (favoriteIndex + 1) % favorites.length;
      loadFavorite(favoriteIndex);
    }
  });

  prevBtn.addEventListener('click', function () {
    if (!showingFavorites && !showingAbout) {
      currentIndex = (currentIndex - 1 + vocabList.length) % vocabList.length;
      loadVocab(currentIndex);
    } else if (showingFavorites && favorites.length > 0) {
      favoriteIndex = (favoriteIndex - 1 + favorites.length) % favorites.length;
      loadFavorite(favoriteIndex);
    }
  });

  favoriteBtn.addEventListener('click', addFavorite);
  viewFavoritesBtn.addEventListener('click', toggleFavorites);
  aboutBtn.addEventListener('click', toggleAbout);
  removeBtn.addEventListener('click', removeFavorite);

  shuffle(vocabList);
  loadVocab(currentIndex);
  if (favorites.length > 0) {
    noFavoritesMessage.style.display = 'none';
  } else {
    noFavoritesMessage.style.display = 'block';
  }
});
