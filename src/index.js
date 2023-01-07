import './style.css';
import { retrieveMovieData } from './modules/retrieve movie data.js';
import postLike from './modules/postLike.js';
import itemCounter from './modules/items counter.js';
import { getComment } from './modules/getComment.js';
import addComment from './modules/commentApi.js';
import { openModal, closeModal, details } from './modules/popup.js';

document.querySelector('DOMContentLoaded', retrieveMovieData());
document.querySelector('DOMContentLoaded', itemCounter());

document.querySelector('#movie-container').addEventListener('click', (event) => {
  if (event.target.nodeName === 'svg') {
    postLike(event.target.parentElement.parentElement.parentElement.id);
  }
});

// open popup window
document.querySelector('#movie-container').addEventListener('click', (event) => {
  if (event.target.classList.contains('show-modal')) {
    const userId = event.target.parentElement.id;
    openModal();
    getComment(userId);
    details(userId);
  }
});

// Post form details
document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();
  document.querySelector('#addCommentForm #submit').disabled = true;
  const userId = document.querySelector('#movie-details').className;
  const userName = document.querySelector('#name').value;
  const userComment = document.querySelector('#comment').value;
  await addComment(userId, userName, userComment);
  await getComment(userId);
  document.querySelector('#addCommentForm #submit').disabled = false;
});

// close popup window
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.overlay').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.querySelector('.modal').classList.contains('hidden')) { closeModal(); }
});
