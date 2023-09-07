"use strict"
import {showDeleteDialog} from "./deleteDialog.js";
import {showUpdateDialog} from "./updateDialog.js";
import {showDetailDialog} from "./detailDialog.js";
import {getMusicians, endpoint} from "./app.js";

/* ========== Musician Array ========== */
export let musicianArr;

/* ========== UPDATE GRID VIEW ========== */
export async function updateGrid() {
    musicianArr = await getMusicians(endpoint); // get posts from rest endpoint and save in global variable
    showMusicians(musicianArr); // show all posts with posts as argument
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
    console.log(musicianObj);
    const musicianGridContainer = document.querySelector("#musicianGrid");
    const myHTML = /*html*/ `
        <article id="grid-item">
            <div>
                    <h2>${musicianObj.stageName}</h2>
                    <img src=${musicianObj.image} id="musicianImage">
                    <p>Fulde navn - ${musicianObj.fullName}</p>
                    <p>Genrer - ${musicianObj.genre}</p>
                    <p id="releasedAlbums">Plader - ${musicianObj.album}</p>
                    <p>Har lavet musik siden ${musicianObj.activeSince}</p>
                    <p>Født ${musicianObj.dateOfBirth}</p>
                    <p>Højde - ${musicianObj.height} cm</p>
                    <p>Pladeselskab - ${musicianObj.musicLabel}</p>
                </div>
            <div class="grid-item-btns">
                <span hidden class="hidden musicianID">${musicianObj.id}</span>
                <button class="like-btn">Like(<span class="likes">${musicianObj.likes}</span>)</button>
                <button class="dislike-btn">Dislike</button>
                <button class="delete-btn">Delete</button>
                <button class="edit-btn">Edit</button>
            </div>
        </article>`;

        musicianGridContainer.insertAdjacentHTML("beforeend", myHTML);
        const currentMusicianArticle = musicianGridContainer.querySelector("article:last-child");

    addShowMusicianEventListeners(currentMusicianArticle, musicianObj);
}
function addShowMusicianEventListeners(currentMusicianArticle, musicianObj) {
    //detail dialog event listener
    currentMusicianArticle.addEventListener("click", () => showDetailDialog(musicianObj));

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
function addToolTip(musicianArticleElement){
    console.log("hey");
}

/* ========== FILTER BY FAV ========== */
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