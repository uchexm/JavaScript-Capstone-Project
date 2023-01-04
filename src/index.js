import './style.css';
import { retrieveMovieData } from './modules/retrieve movie data.js';
import postLike from './modules/postLike.js';

retrieveMovieData();

document.querySelector('#movie-container').addEventListener('click', (event) => {
  if (event.target.nodeName === 'svg') {
    postLike(event.target.parentElement.parentElement.parentElement.id);
  }
});