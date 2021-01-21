import { createFavoriteContainer, addToFavorite } from './favorite.js';


export function render() {
   const mainContainer = $("<main class='mainContainer__main'></main>");
   const wrapper = $('<div class="wrapper"></div>');
   mainContainer.append(wrapper);
   $("body").append(mainContainer);
   createFavoriteContainer();
}

export function update(dataSource, type) {
    $(".wrapper").empty();
    for (let data of dataSource) {
        let card = $("<div class='card'></div>");
        switch (type) {
            case "song":
                card = createSongCard(data, card);
                $(".wrapper").append(card);
                break;
            case "musicArtist":
                card = createArtistCard(data, card);
                $(".wrapper").append(card);
                break;
            case "album":
                card = createAlbumCard(data, card);
                $(".wrapper").append(card);
                break;
            case "musicVideo":
                card = createVideoCard(data, card);
                $(".wrapper").append(card);
                break;
            default:
                console.log("no se reconocio el tipo en la busqueda");
        }
    }
    $('.card').on('click', addToFavorite);
}

function createSongCard(data, card) {
    let date = new Date(data.release);
    card.addClass("cardSong__div");
    card.css("background-image", `url(${data.cover})`);
    let songName = $("<p class='songName__p'></p>").text(data.song);
    let infoContainer = $("<div class='infoContainer__div'></div>");
    let artistName = $("<p class='songArtist__p'></p>").text(data.artist);
    let albumName = $("<p class='songAlbum__p'></p>").text(data.album);
    let price = $("<p class='songPrice__p'></p>").text(data.songPrice + "$");
    let releaseDate = $("<p class='songDate__p'></p>").text(
        date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    );
    let songLength = $("<p class='songLength__p'></p>").text(
        Math.floor(data.duration / 1000 / 60) +
            ":" +
            Math.floor((data.duration / 1000) % 60)
    );
    let musicalGenre = $("<p class='songGenre__p'></p>").text(data.genre);
    let link = $(`<a href=${data.url} class='songLink__a'></a>`).text("itunes");
    let preview = $(`<audio src=${data.preview} controls></audio>`);
    const favoriteIcon = $(`<i class="far fa-heart favorite__icon" id=${data.id}></i>`);
    const cardFooter = $('<div class="card__footer"></div>');

    card.append(songName);
    infoContainer.append(artistName);
    infoContainer.append(albumName);
    infoContainer.append(price);
    infoContainer.append(releaseDate);
    infoContainer.append(songLength);
    infoContainer.append(musicalGenre);
    cardFooter.append(link);
    cardFooter.append(favoriteIcon);
    card.append(preview);
    card.append(infoContainer);
    card.append(cardFooter);
    return card;
}

function createVideoCard(data, card) {
    let date = new Date(data.release);
    card.addClass("cardVideo__div");
    card.css("background-image", `url(${data.cover})`);
    let songName = $("<p class='songName__p'></p>").text(data.song);
    let infoContainer = $("<div class='infoContainer__div'></div>");
    let artistName = $("<p class='songArtist__p'></p>").text(data.artist);
    let price = $("<p class='songPrice__p'></p>").text(data.songPrice + "$");
    let releaseDate = $("<p class='songDate__p'></p>").text(
        date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    );
    let songLength = $("<p class='songLength__p'></p>").text(
        Math.floor(data.duration / 1000 / 60) +
            ":" +
            Math.floor((data.duration / 1000) % 60)
    );
    let musicalGenre = $("<p class='songGenre__p'></p>").text(data.genre);
    let link = $(`<a href=${data.url} class='songLink__a'></a>`).text("itunes");
    let preview = $(`<video src=${data.preview} controls></video>`);
    const favoriteIcon = $(`<i class="far fa-heart favorite__icon" id=${data.id}></i>`);
    const cardFooter = $('<div class="card__footer"></div>');

    card.append(songName);
    infoContainer.append(artistName);
    infoContainer.append(price);
    infoContainer.append(releaseDate);
    infoContainer.append(songLength);
    infoContainer.append(musicalGenre);
    cardFooter.append(link);
    cardFooter.append(favoriteIcon);
    card.append(preview);
    card.append(infoContainer);
    card.append(cardFooter);
    return card;
}

function createAlbumCard(data, card) {
    let date = new Date(data.release);
    card.addClass("cardVideo__div");
    card.css("background-image", `url(${data.cover})`);
    let artistName = $("<p class='songArtist__p'></p>").text(data.artist);
    let price = $("<p class='songPrice__p'></p>").text(data.albumPrice + "$");
    let numberOfSongs = $("<p class='albumSongs__p'></p>").text(
        data.trackCount
    );
    let releaseDate = $("<p class='songDate__p'></p>").text(
        date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    );
    let musicalGenre = $("<p class='songGenre__p'></p>").text(data.genre);
    const favoriteIcon = $(`<i class="far fa-heart favorite__icon" id=${data.id}></i>`);
    const cardFooter = $('<div class="card__footer"></div>');

    card.append(artistName);
    card.append(price);
    card.append(numberOfSongs);
    card.append(releaseDate);
    card.append(musicalGenre);
    cardFooter.append(favoriteIcon);
    card.append(cardFooter);
    return card;
}

function createArtistCard(data, card) {
    card.css("background-image", "linear-gradient(180deg, #49008d 0%, #823ec4 100%)");
    let artistName = $("<p class='songArtist__p'></p>").text(data.artist);
    let musicalGenre = $("<p class='songGenre__p'></p>").text(data.genre);
    let link = $(`<a href=${data.url} class='songLink__a'></a>`).text("itunes");
    const favoriteIcon = $(`<i class="far fa-heart favorite__icon" id=${data.id}></i>`);
    const cardFooter = $('<div class="card__footer"></div>');
    card.append(artistName);
    card.append(musicalGenre);
    cardFooter.append(link);
    cardFooter.append(favoriteIcon);
    card.append(cardFooter);
    return card;
}
