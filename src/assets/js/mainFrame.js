export function render() {
    const mainContainer = $("<main class='mainContainer__main'></main>");
    $("body").append(mainContainer);
}

export function update(dataSource, type) {
    console.log(dataSource);
    console.log(type);
    for (let data of dataSource) {
        let card = $("<div class='card'></div>");
        switch (type) {
            case "song":
                const date = new Date(data.release);
                card.addClass("cardSong__div");
                card.css("background-image", `url(${data.cover})`);
                const songName = $("<p class='songName__p'></p>").text(
                    data.song
                );
                const infoContainer = $(
                    "<div class='infoContainer__div'></div>"
                );
                const artistName = $("<p class='songArtist__p'></p>").text(
                    data.artist
                );
                const albumName = $("<p class='songAlbum__p'></p>").text(
                    data.album
                );
                const price = $("<p class='songPrice__p'></p>").text(
                    data.songPrice + "$"
                );
                const releaseDate = $("<p class='songDate__p'></p>").text(
                    date.getFullYear() +
                        "/" +
                        date.getMonth() +
                        "/" +
                        date.getDate()
                );
                const songLength = $("<p class='songLength__p'></p>").text(
                    Math.floor(data.duration / 1000 / 60) +
                        ":" +
                        Math.floor((data.duration / 1000) % 60)
                );
                const musicalGenre = $("<p class='songGenre__p'></p>").text(
                    data.genre
                );
                const songLink = $(
                    `<a href=${data.url} class='songLink__a'></a>`
                ).text("itunes");
                const preview = $(
                    `<audio src=${data.preview} controls></audio>`
                );
                card.append(songName);
                infoContainer.append(artistName);
                infoContainer.append(albumName);
                infoContainer.append(price);
                infoContainer.append(releaseDate);
                infoContainer.append(songLength);
                infoContainer.append(musicalGenre);
                infoContainer.append(songLink);
                card.append(preview);
                card.append(infoContainer);
                $(".mainContainer__main").append(card);
                break;
            case "musicArtist":
                break;
            case "album":
                break;
            case "musicVideo":
                break;
            default:
                console.log("no se reconocio el tipo en la busqueda");
        }
    }
}
