let favoriteList = JSON.parse(localStorage.getItem('favorite')) || [];
const currentSearch = JSON.parse(localStorage.getItem('currentSearch'));

const createFavoriteContainer = () => {
  const favoriteSection = $('<div class="favorite__container"></div>');
  const favoriteHeader = $('<h2 class="favorite__header"></h2>').text('Favorite');
  favoriteSection.append(favoriteHeader);
  $('.mainContainer__main').append(favoriteSection);
  $('.favorite__container').on('click', removeFavorite);
  saveAndRender();
}

const save = () => {
  return localStorage.setItem('favorite', JSON.stringify(favoriteList));
}

const renderFavorite = () => {
  favoriteList.forEach(element => renderItem(element));
}

const renderItem = element => {
  const favoriteCard = $(`<div class=favorite__card id=${element.id}></div>`);
  const favoriteTitle =$('<div class="favorite__title"></div>');
  const favoriteInfo =$('<div class="favorite__info"></div>');
  const favoriteArtist = $('<h3 class="artist"></h3>').text(element.artist);
  const favoriteSong = $('<p class="song"></p>').text(element.song);
  const favoriteAlbum = $('<p class="album"></p>').text(element.album);
  const favoriteIcon = $('<i class="fas fa-heart favorite__icon"></i>');
  favoriteTitle.append(favoriteArtist, favoriteIcon);
  favoriteInfo.append(favoriteSong, favoriteAlbum);
  favoriteCard.append(favoriteTitle, favoriteInfo);
  $('.favorite__container').append(favoriteCard);
}

const saveAndRender = () => {
  save();
  renderFavorite();
}

const removeFavorite = e => {
  if (e.target.tagName.toLowerCase() === 'i') {
    e.target.parentNode.parentNode.remove();
    const targetElement = favoriteList.find(item => item.id == e.target.parentNode.parentNode.id);
    const index = favoriteList.indexOf(targetElement);
    if (index > -1) {
      favoriteList.splice(index, 1);
    }
    // favoriteList = favoriteList.filter(item => item.id !== e.target.parentNode.parentNode.id);
    save();
  }
}

const addToFavorite = e => {
  if (e.target.tagName.toLocaleLowerCase() === 'i') {
    const selectedObj = currentSearch.find(item => item.id == e.target.id);
    if (!selectedObj) {
      return;
    }
    favoriteList.push(selectedObj);
    save();
    renderItem(selectedObj);
  };
}


export { createFavoriteContainer, addToFavorite }