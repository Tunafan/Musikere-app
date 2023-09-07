"use strict"

import { showCreateDialog } from "./createDialog.js";
import { closeDeleteDialog } from "./deleteDialog.js";
import { inputSearchChanged } from "./search.js";
import { filterByFav, updateGrid } from "./show.js";

window.addEventListener("load", main)


// ----------- * globale variabler * -----------
export const endpoint = `http://localhost:1312`


async function main(){

    //  vis artister
await updateGrid();

    // Create dialog
    document.querySelector("#add-musician-dialog-button")
        .addEventListener("click", showCreateDialog);

    // Search event listeners
    const searchBar =  document.querySelector("#searchBar");
    searchBar.addEventListener("search", inputSearchChanged);
    searchBar.addEventListener("keyup", inputSearchChanged);

    // close delete dialog
    document.querySelector("#delete-cancel-btn")
        .addEventListener("click", closeDeleteDialog);


    // filter event listener */
    document.querySelector("#showOnly")
        .addEventListener("change", filterByFav);
}
// ========== CREATE ========== */
 export async function addMusician(musicianObj, endpoint) {
    console.log(endpoint);
    const response = await fetch(`${endpoint}/Musikere/db/`, {
        method: "POST",
        body: JSON.stringify(musicianObj),
    });
    if (response.ok) {
        await updateGrid();
    //     showToastMessage("Musiker tlføjet. Tak!", "success");
    // } else {
    //     showToastMessage(`hov den er gal. ${response.status} ${response.statusText}.`, "error");
    //     console.error(`Bad response at addMusician: ${response.status} ${response.statusText}.`);
    }
}
/* ========== READ ALL========== */
 export async function getMusicians(endpoint) {
    const response = await fetch(`${endpoint}/musikere/db/`);
    if(response.ok){
        const data = await response.json();
        return prepareData(data);
    }
}
/* ========== Data preparation for getMusicians ========== */
export function prepareData(obj) {
    const dataArr = [];
    for (const key in obj) {
        const musician = obj[key];
      
        dataArr.push(musician);
    }
    return dataArr;
}
/* ========== READ ONE ========== */
 export async function getOneMusician(musicianID, endpoint) {
    const response = await fetch(`${endpoint}/musikere/db/${musicianID}.json`);
    if (response.ok) {
        const musician = await response.json();
        
        return musician;
    }
    // else{
    //     showToastMessage(`Oops something went wrong. ${response.status} ${response.statusText}.`, "error");
    //     console.error(`Bad response at getOnemusician: ${response.status} ${response.statusText}.`);
    // }
}
/* ========== UPDATE ========== */
// Sends put request to endpoint with musician object
 export async function updateMusician(musician, musicianID, endpoint) {
    const response = await fetch(`${endpoint}musicians/${musicianID}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(musician),
    });
    if (response.ok) {
        console.log("musician updated successfully!");
        showToastMessage("musician updated successfully!", "success");
    } else {
        showToastMessage(`Oops something went wrong. ${response.status} ${response.statusText}.`, "error");
        console.error(`Bad response at updateMusician: ${response.status} ${response.statusText}.`);
    }
}

/* ========== DELETE ========== */
 export async function deleteMusician(musicianID, endpoint) {
    const response = await fetch(`${endpoint}/musicians/${musicianID}.json`, {
        method: "DELETE",
    });
    if (response.ok) {
        console.log("musician deleted");
        showToastMessage("musician deleted successfully!", "success");
        await updateGrid();
    } else {
        showToastMessage(`Oops something went wrong. ${response.status} ${response.statusText}.`, "error");
        console.error(`Bad response at deletemusician: ${response.status} ${response.statusText}.`);
    }
};