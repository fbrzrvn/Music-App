const getData = data => {

  let url = 'https://itunes.apple.com/search?term=';

  const searchQuery = data.searchQuery.split(" ").join("+");

  switch(data.type) {
    case "artist":
      url += `${searchQuery}&entity=musicArtist`;
      break;
    case "album":
      url += `${searchQuery}&entity=album`;
      break;
    case "song":
      url += `${searchQuery}&entity=song`;
      break;
    case "video":
      url += `${searchQuery}&entity=musicVideo`;
      break;
  }

  const country = data.country;
  const explicit = data.explicit;
  const limit = data.limit;

  if (country) url += `&country=${country}`;
  if (explicit) url += `&country=${explicit}`;
  if (limit) url += `&limit=${limit}`;

  const settings = {
    url: url,
    contentType: "json",
    method: "GET"
  }
  $.ajax(settings).done(function(result) {
    let dataJson = JSON.parse(result);
    let data;
    let allData = [];
    if (url.includes('song')) {
      dataJson.results.forEach(result => {
        data = {
          cover: result.artworkUrl100,
          song: result.trackName,
          artist: result.artistName,
          album: result.collectionName,
          songPrice: result.trackPrice,
          release: result.releaseDate,
          duration: result.trackTimeMillis,
          genre: result.primaryGenreName,
          url: result.trackViewUrl,
          preview: result.previewUrl
        }
        allData.push(data);
      })
    } else if (url.includes('album')) {
      dataJson.results.forEach(result => {
        data = {
          cover: result.artworkUrl100,
          artist: result.artistName,
          album: result.collectionName,
          albumPrice: result.collectionPrice,
          tracksCount: result.tracksCount,
          release: result.releaseDate,
          genre: result.primaryGenreName,
        }
        allData.push(data);
      })
    } else if (url.includes('musicArtist')) {
      dataJson.results.forEach(result => {
        let allData = [];
        data = {
          artist: result.artistName,
          genre: result.primaryGenreName,
          url: result.artistLinkUrl,
        }
        allData.push(data);
      })
      console.log(result.results);
    } else if (url.includes('musicVideo')) {
      dataJson.results.forEach(result => {
        data = {
          cover: result.artworkUrl100,
          song: result.trackName,
          artist: result.artistName,
          album: result.collectionName,
          songPrice: result.trackPrice,
          release: result.releaseDate,
          duration: result.trackTimeMillis,
          genre: result.primaryGenreName,
          url: result.trackViewUrl,
          preview: result.previewUrl
        }
        allData.push(data);
      })
    }
    if (allData.length === 0) {
      const toastContainer = $('<div class="toast__container"></div>');
      const toastP = $('<p class="toast__p"></p>').text("OPS! The search you typed did not match any result!");
      const toastSmall = $('<small class="toast__small"></small>').text('Please try again with a new search.');
      toastContainer.append(toastP, toastSmall);
      toastContainer.fadeOut(2000);
      $('body').append(toastContainer);
    }
    console.log(allData);
    return allData;
  }).fail(function(xhr) {
    const toastContainer = $('<div class="toast__container"></div>');
    const toastP = $('<p class="toast__p"></p>').text("iTunes is not available for this country.");
    const toastSmall = $('<small class="toast__small"></small>').text('Please choose another country.');
    toastContainer.append(toastP, toastSmall);
    toastContainer.fadeOut(2000);
    $('body').append(toastContainer);
    console.log(xhr.responseText);
  })

}



export { getData };