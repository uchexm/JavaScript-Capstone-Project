import { movieIDs } from './retrieve movie data.js';

// Add total movie count to navigation item
export default () => { document.querySelector('#all-movies').innerHTML += ` (${movieIDs.length})`; };