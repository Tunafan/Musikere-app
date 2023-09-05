import {deleteMusicianClicked} from "./submit.js";

/* ========== DELETE DIALOG ========== */
export function showDeleteDialog(event) {
    event.stopPropagation();
    const deleteForm = document.querySelector("#deleteForm");

    //get id from the musician article where delete was clicked
    const deleteButton = event.target; //musician article delete button
    const musicianIDElement = deleteButton.parentElement.querySelector(".musicianID");
    console.log(musicianIDElement.textContent);
    deleteForm.querySelector("#delete-musicianID")
        .textContent = musicianIDElement.textContent;

    deleteForm.addEventListener("submit", deleteMusicianClicked);
    deleteForm.parentElement.showModal();
}
export function closeDeleteDialog() {
    const deleteForm = document.querySelector("#deleteForm");
    deleteForm.parentElement.close();
    deleteForm.reset();
    deleteForm.querySelector("#delete-horseID")
        .textContent = "";
    deleteForm.querySelector("#delete-password-input")
        .value = "";
}