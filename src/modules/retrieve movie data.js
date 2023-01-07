// API movie IDs from movieDB API
export const movieIDs = ['76600', '661374', '877269', '436270', '899112', '744594', '19995', '361743', '668482', '555604', '674324', '593643', '505642', '315162', '804095', '791177', '545611', '414906', '715931', '546554'];

// Function to retrieve API data and append it to DOM
export const retrieveMovieData = async () => {
  // Define movie container element
  const movieContainer = document.querySelector('#movie-container');

  // Defining variable to store likes data
  let likes;

  // Fetching likes data
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zzwfsFxqWArAT5ak4r3D/likes/')
    .then((response) => response.json())
    .then((json) => {
      likes = json;
    });

  // Function to retrieve movie data
  const loadData = async (movieID, index) => {
    // Creating movie item element
    const item = document.createElement('div');
    item.id = movieID;

    // Creating div element for movie data
    const itemData = document.createElement('div');
    itemData.className = 'item-data';

    // Retrieve image data from API
    await fetch(`https://api.themoviedb.org/3/movie/${movieID}/images?api_key=31ecb28000e35ff5c8ed82886f5861ad&language=en`, {})
      .then((response) => response.json())
      .then((json) => {
        const itemImg = document.createElement('div');
        const imageObjectURL = `https://www.themoviedb.org/t/p/w220_and_h330_face${json.posters[1].file_path}`;
        const image = new Image();
        image.src = imageObjectURL;
        itemImg.appendChild(image);
        item.appendChild(itemImg);
      });

    // Retrieve title data from API
    await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=31ecb28000e35ff5c8ed82886f5861ad&language=en-US`, {})
      .then((response) => response.json())
      .then((json) => {
        const itemTitle = document.createElement('span');
        itemTitle.className = 'movie-title';
        itemTitle.innerHTML = json.original_title;
        itemData.appendChild(itemTitle);
      });

    // Create empty div for like data
    const likesContainer = document.createElement('div');
    likesContainer.className = 'likes';
    likesContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>`;

    // Add likes data to it's container
    const likesData = document.createElement('div');

    // Adding likes data to movie item in DOM
    try {
      const movieLikes = likes.find((arr) => arr.item_id === index.toString()).likes;
      likesData.innerHTML += `<span class="likes-count">${movieLikes}</span> <span> Likes</span>`;
    } catch { likesData.innerHTML += '<span class="likes-count">0</span> <span> Likes</span>'; }

    likesContainer.appendChild(likesData);

    // Append div with likes data to body
    itemData.appendChild(likesContainer);

    // Append div with movie data to body
    item.appendChild(itemData);

    // Create comment button and append to body
    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Comments';
    item.appendChild(commentBtn);
    commentBtn.classList.add('show-modal');

    // Append movie item to body
    movieContainer.appendChild(item);
  };

  // Iterate through arr of movie IDs to retrieve their data via movieDB API
  movieIDs.forEach((movie) => loadData(movie, movieIDs.indexOf(movie)));
};