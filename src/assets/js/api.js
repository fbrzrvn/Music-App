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
    dataType: "jsonp",
    method: "GET",
    success: function(result) {
      let data;
      let allData = [];
      if (url.includes('song')) {
        result.results.forEach(result => {
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
        result.results.forEach(result => {
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
        result.results.forEach(result => {
          let allData = [];
          data = {
            artist: result.artistName,
            genre: result.primaryGenreName,
            url: result.artistLinkUrl,
          }
          allData.push(data);
          console.log(allData);
        })
        console.log(result.results);
      } else if (url.includes('musicVideo')) {
        result.results.forEach(result => {
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
      console.log(allData);
      return allData;
    },
    error: function(err) {
      console.log(err);
    }
  }

  $.ajax(settings);

}



export { getData };