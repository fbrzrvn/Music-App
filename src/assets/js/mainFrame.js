export function render() {
    const mainContainer = $("<main class='mainContainer__main'></main>");
    $("body").append(mainContainer);
}

export function update(dataSource, type) {
    console.log(dataSource);
    console.log(type);
    $("main").empty();
    for (let data of dataSource) {
        let card = $("<div class='card'></div>");
        switch (type) {
            case "song":
                card = createSongCard(data, card);
                $(".mainContainer__main").append(card);
                break;
            case "musicArtist":
                card = createArtistCard(data, card);
                $(".mainContainer__main").append(card);
                break;
            case "album":
                card = createAlbumCard(data, card);
                $(".mainContainer__main").append(card);
                break;
            case "musicVideo":
                card = createVideoCard(data, card);
                $(".mainContainer__main").append(card);
                break;
            default:
                console.log("no se reconocio el tipo en la busqueda");
        }
    }
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
    card.append(songName);
    infoContainer.append(artistName);
    infoContainer.append(albumName);
    infoContainer.append(price);
    infoContainer.append(releaseDate);
    infoContainer.append(songLength);
    infoContainer.append(musicalGenre);
    infoContainer.append(link);
    card.append(preview);
    card.append(infoContainer);
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
    card.append(songName);
    infoContainer.append(artistName);
    infoContainer.append(price);
    infoContainer.append(releaseDate);
    infoContainer.append(songLength);
    infoContainer.append(musicalGenre);
    infoContainer.append(link);
    card.append(preview);
    card.append(infoContainer);
    return card;
}

function createAlbumCard(data, card) {
    let date = new Date(data.release);
    card.addClass("cardVideo__div");
    card.css("background-image", `url(${data.cover})`);
    let artistName = $("<p class='songArtist__p'></p>").text(data.artist);
    let price = $("<p class='songPrice__p'></p>").text(data.albumPrice + "$");
    let numberOfSongs = $("<p class='albumSongs__p'></p>").text(
        data.tracksCount
    );
    let releaseDate = $("<p class='songDate__p'></p>").text(
        date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
    );
    let musicalGenre = $("<p class='songGenre__p'></p>").text(data.genre);
    card.append(artistName);
    card.append(price);
    card.append(numberOfSongs);
    card.append(releaseDate);
    card.append(musicalGenre);
    return card;
}

function createArtistCard(data, card) {
    let artistName = $("<p class='songArtist__p'></p>").text(data.artist);
    let musicalGenre = $("<p class='songGenre__p'></p>").text(data.genre);
    let link = $(`<a href=${data.url} class='songLink__a'></a>`).text("itunes");
    card.append(artistName);
    card.append(musicalGenre);
    card.append(link);
    return card;
}
