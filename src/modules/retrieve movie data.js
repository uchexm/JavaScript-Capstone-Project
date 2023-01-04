export const movieIDs = ['76600', '661374', '877269', '436270', '899112', '744594', '19995', '361743', '668482', '555604', '674324', '593643', '505642', '315162', '804095', '791177', '545611', '414906', '715931', '546554'];

export const retrieveMovieData = async () => {
  const movieContainer = document.querySelector('#movie-container');
  let likes;
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zzwfsFxqWArAT5ak4r3D/likes/')
    .then((response) => response.json())
    .then((json) => {
      likes = json;
    });

  const loadData = async (movieID, index) => {
    const item = document.createElement('div');
    item.id = index;
    const itemData = document.createElement('div');
    itemData.className = 'item-data';

    await fetch(`https://api.themoviedb.org/3/movie/${movieID}/images?api_key=31ecb28000e35ff5c8ed82886f5861ad&language=en-US`, {})
      .then((response) => response.blob())
      .then((imageBlob) => {
        const itemImg = document.createElement('div');
        itemImg.style.background = `url(${imageBlob})`;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        const image = document.createElement('img');
        image.src = imageObjectURL;
        itemImg.appendChild(image);
        item.appendChild(itemImg);
      });

    await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=31ecb28000e35ff5c8ed82886f5861ad&language=en-US`, {})
      .then((response) => response.json())
      .then((json) => {
        const itemTitle = document.createElement('span');
        itemTitle.innerHTML = json.original_title;
        itemData.appendChild(itemTitle);
      });

    const likesContainer = document.createElement('div');
    likesContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
  </svg>`;

    try {
      const likesData = likes.find((arr) => arr.item_id === index.toString()).likes;
      likesContainer.innerHTML += `<span>${likesData} Likes</span>`;
    } catch { likesContainer.innerHTML += '<span>0 Likes</span>'; }

    itemData.appendChild(likesContainer);

    item.appendChild(itemData);

    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Comments';
    item.appendChild(commentBtn);

    movieContainer.appendChild(item);
  };

  movieIDs.forEach((movie) => loadData(movie, movieIDs.indexOf(movie)));
};