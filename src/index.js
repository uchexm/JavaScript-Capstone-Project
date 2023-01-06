/* eslint-disable func-names */
import "./style.css";
import { retrieveMovieData } from "./modules/retrieve movie data.js";
import postLike from "./modules/postLike.js";
import getComment from "./modules/getComment.js";
import addComment from "./modules/commentApi.js";

document.querySelector("DOMContentLoaded", retrieveMovieData());

document
  .querySelector("#movie-container")
  .addEventListener("click", (event) => {
    if (event.target.nodeName === "svg") {
      postLike(event.target.parentElement.parentElement.parentElement.id);
    }
  });

/* eslint-disable import/prefer-default-export */
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

document
  .querySelector("#movie-container")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("show-modal")) {
      openModal();
      const userId = event.target.parentElement.id;
      getComment(userId);
      document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        const userName = document.querySelector("#name").value;
        const userComment = document.querySelector("#comment").value;
        addComment(userId, userName, userComment);
        getComment(userId);
      });
    }
  });

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
