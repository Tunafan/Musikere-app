import {submitUpdateForm} from "./submit.js";

/* ========== UPDATE DIALOG ========== */
export function showUpdateDialog(musicianObj){
    fillUpdateForm(musicianObj);
    const form = document.querySelector("#update-form");
    form.parentElement.showModal();
    form.addEventListener("submit", submitUpdateForm);
    form.querySelector("#update-cancel-btn")
        .addEventListener("click", ()=> {
            form.removeEventListener("submit", submitUpdateForm);
            form.parentElement.close();
            form.reset();
        })
}
/* ========== UPDATE HELPER FUNCTIONS ========== */
// Fills in all the fields in the update form
function fillUpdateForm(musicianObj){
    const form = document.querySelector("#update-form");
    /* id */
    form.musicianID.value
    /* image */
    form.image.value = musicianObj["image"];
    /* General information */
    fillGeneralInformationInputs(form, musicianObj);
}
function fillGeneralInformationInputs(form, musicianObj) {
    form.fullName.value = musicianObj["fullName"];
    form.stageName.value = musicianObj["stageName"];
    form.activeSince.value = musicianObj["activeSince"];
    form.dateOfBirth.value = musicianObj["dateOfBirth"];
    form.height.value = musicianObj["height"];
    form.genre.value = musicianObj["genre"];
    form.album.value = musicianObj["album"];
    form.musicLabel.value = musicianObj["musicLabel"];
    form.knownFor.value = musicianObj["knownFor"];


}