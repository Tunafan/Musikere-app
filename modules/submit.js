import { addMusician, deleteMusician, endpoint, updateMusician } from "./app.js";

/* ========== SUBMIT CREATE ========== */
export async function submitCreateForm(event) {
    event.preventDefault();
    const form = event.target;
    const musician = {
        image: form.image.value,
        stageName: form.stageName.value,
        name: form.name.value,
        dateOfBirth: form.dateOfBirth.value,
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
        fullName: form.fullName.value,
        dateOfBirth: form.dateOfBirth.value,
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

   submitDeleteForm(musicianID);
}
async function submitDeleteForm(musicianID) {
    const deleteForm = document.querySelector("#deleteForm");
    deleteForm.removeEventListener("submit", deleteMusicianClicked);
    deleteForm.parentElement.close();
    await deleteMusician(musicianID, endpoint);
}