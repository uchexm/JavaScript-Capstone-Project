const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

export const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

export const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

export const details = async (userId) => {
  const movieDetails = document.querySelector('#movie-details');
  movieDetails.innerHTML = '<h1></h1>';
  movieDetails.className = userId;
  document.querySelector('#modal-img').src = document.getElementById(userId).querySelector('img').src;
  movieDetails.querySelector('h1').innerHTML = document.getElementById(userId).querySelector('.movie-title').innerHTML;
  await fetch(`https://api.themoviedb.org/3/movie/${userId}?api_key=31ecb28000e35ff5c8ed82886f5861ad&language=en-US`, {})
    .then((response) => response.json())
    .then((json) => {
      const subDetails = document.createElement('div');
      subDetails.className = 'sub-details';
      const genre = document.createElement('div');
      genre.innerHTML = '<b>Genre: </b>';
      json.genres.forEach((i) => { genre.innerHTML += ` ${i.name}`; });
      subDetails.appendChild(genre);

      const popularity = document.createElement('div');
      popularity.innerHTML = `<b>Popularity: </b>${json.popularity}`;
      subDetails.appendChild(popularity);

      const lan = document.createElement('div');
      lan.innerHTML = `<b>Original language: </b>${json.original_language}`;
      subDetails.appendChild(lan);

      const budget = document.createElement('div');
      budget.innerHTML = `<b>Budget: </b>$${json.budget}`;
      subDetails.appendChild(budget);

      movieDetails.appendChild(subDetails);

      const overview = document.createElement('div');
      overview.innerHTML = `<h3>Overview</h3>${json.overview}`;
      movieDetails.appendChild(overview);
    });
};
