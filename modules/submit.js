import { addMusician, deleteMusician, endpoint, updateMusician } from "./app.js";
import { validatePassword } from "./validation.js";
import { showToastMessage } from "./toastMessage.js";

/* ========== SUBMIT CREATE ========== */
export async function submitCreateForm(event) {
    event.preventDefault();
    const form = event.target;
    const musician = {
        image: form.image.value,
        stageName: form.stageName.value,
        name: form.name.value,
        DOB: form.DOB.value,
        genre: form.genre.value,
        musicLabel: form.musicLabel.value,
        activeSince: form.activeSince.value,
        album: form.album.value,        
        height: form.height.value,
        knownFor: form.knownFor.value,
    };
    await addMusician(musician, endpoint);
    form.parentElement.close();
    form.reset();
}

/* ========== SUBMIT UPDATE ========== */
export async function submitUpdateForm(event) {
    event.preventDefault();
    const form = event.target;
    const musicianID = form.musicianID.value;
    const musician = {
        image: form.image.value,
        stageName: form.stageName.value,
        name: form.name.value,
        DOB: form.DOB.value,
        genre: form.genre.value,
        musicLabel: form.musicLabel.value,
        activeSince: form.activeSince.value,
        album: form.album.value,        
        height: form.height.value,
        knownFor: form.knownFor.value,
    };
    await updateMusician(musician, musicianID, endpoint);
    form.parentElement.close();
    form.reset();
}

/* ========== SUBMIT DELETE ========== */
export async function deleteMusicianClicked(event) {
    event.preventDefault();
    const deleteForm = document.querySelector("#deleteForm");
    const musicianID = deleteForm.querySelector("#delete-musicianID").textContent;

    if (validatePassword(deleteForm["password"].value)) {
        await submitDeleteForm(musicianID);
    } else {
        showToastMessage("NO", "error");
    }
}
async function submitDeleteForm(musicianID) {
    const deleteForm = document.querySelector("#deleteForm");
    deleteForm.removeEventListener("submit", deleteMusicianClicked);
    deleteForm.parentElement.close();
    deleteForm.password.value = "";
    await deleteMusician(musicianID, endpoint);
}