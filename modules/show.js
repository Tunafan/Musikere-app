"use strict"
// import {showDeleteDialog} from "../dialogs/deleteDialog.js";
// import {showUpdateDialog} from "../dialogs/updateDialog.js";
// import {showDetailDialog} from "../dialogs/detailDialog.js";
import {getMusicians, endpoint} from "./app.js";
// import {addLike, removeLike} from "../likes/like.js";

/* ========== Musician Array ========== */
export let musicianArr;

/* ========== UPDATE GRID VIEW ========== */
export async function updateGrid() {
    musicianArr = await getMusicians(endpoint); // get posts from rest endpoint and save in global variable
    showMusicians(musicianArr); // show all posts (append to the DOM) with posts as argument
}

/* ========== SHOW ALL Musicians ========== */
export function showMusicians(musicianArr) {
    document.querySelector("#musicianGrid").innerHTML = "";
    for (const musician of musicianArr) {
        showMusician(musician);
    }
}

/* ========== SHOW Musician ========== */
export function showMusician(musicianObj) {
    const musicianGridContainer = document.querySelector("#musicianGrid");
    const myHTML = /*html*/ `
        <article id="grid-item">
            <div>
                <div class="image-div" style="background-image: url(${musicianObj.image})"></div>
                    <h2>${musicianObj.name}</h2>
                    <p>${musicianObj.genre}</p>
                    <p>${musicianObj.albums}</p>
                    <p>${musicianObj.activeSince}</p>
                    <p>${musicianObj.age} years old ${(MusicianObj.gender==="male")?"stallion":"mare"}</p>
                </div>
            <div class="grid-item-btns">
                <span class="hidden musicianID">${musicianObj.id}</span>
                <button class="like-btn">Like(<span class="likes">${musicianObj.likes}</span>)</button>
                <button class="dislike-btn">Dislike</button>
                <button class="delete-btn">Delete</button>
                <button class="edit-btn">Edit</button>
            </div>
        </article>`;

        musicianGridContainer.insertAdjacentHTML("beforeend", myHTML);
        const currentMusicianArticle = musicianGridContainer.querySelector("article:last-child");

    addShowMusicianEventListeners(currentMusicianArticle, musicianObj);

    //tooltip for showDetailDialog
        addToolTip(currentMusicianArticle);
}

function addShowMusicianEventListeners(currentMusicianArticle, musicianObj) {
    //detail dialog event listener
    currentMusicianArticle.addEventListener("click", () => showDetailDialog(musicianObj));

    //like button event listener
    const likeButton = currentMusicianArticle.querySelector(".like-btn");
    likeButton.addEventListener("click", (event) => addLike(event, likeButton, dislikeButton, musicianObj));

    //dislike button event listener
    const dislikeButton = currentMusicianArticle.querySelector(".dislike-btn");
    dislikeButton.addEventListener("click", (event) => removeLike(event, likeButton, dislikeButton, musicianObj));

    //update button event listener
    const updateButton = currentMusicianArticle.querySelector(".edit-btn");
    updateButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showUpdateDialog(musicianObj);
    });

    //delete button event listener
    const deleteButton = currentMusicianArticle.querySelector(".delete-btn");
    deleteButton.addEventListener("click", showDeleteDialog);
}

/* ========== TOOLTIP FOR DETAIL DIALOG ========== */
function addToolTip(musicianArticleElement) {
    const tooltip = document.querySelector("#detail-tooltip");

    function updateTooltipPos(event){
        tooltip.style.top = event.clientY - 10 + "px";
        tooltip.style.left = event.clientX + 10 + "px";
    }

    musicianArticleElement.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
        musicianArticleElement.addEventListener("mousemove", updateTooltipPos);
    });
    musicianArticleElement.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
        musicianArticleElement.removeEventListener("mousemove", updateTooltipPos);
    });
    window.addEventListener("scroll", updateTooltipPos);
}

/* ========== FILTER BY MALE/FEMALE ========== */
export async function filterByFav(event){
    const filterSelect = event.target;
    await updateGrid();
    if(filterSelect.value !== "none"){
        musicianArr = musicianArr.filter(musician => musician["fav"] === filterSelect.value);
        showMusicians(musicianArr);
    }
    else{
        await updateGrid();
    }
}