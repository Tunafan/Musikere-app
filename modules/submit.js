import { addMusician, deleteMusician, endpoint, updateMusician } from "./app.js";
import { validatePassword } from "./validation.js";
import { showToastMessage } from "./toastMessage.js";

/* ========== SUBMIT CREATE ========== */
export async function submitCreateForm(event) {
    event.preventDefault();
    const form = event.target;
    const musician = {
        image: form.image.value,
        name: form.horseName.value,
        race: form.horseRace.value,
        likes: 0,
        height: form.height.value,
        gender: form.gender.value,
        hasTapeworm: form.hasTapeworm.checked,
        age: form.age.value,
        color: form.horseColor.value,
        temperament: form.temperament.value,
        riderExperienceRequired: form.riderExperienceRequired.checked,
        registered: form.registered.checked,
        vaccinations: form.vaccinations.value.replaceAll(" ", "").split(","),
        diet: form.diet.value.replaceAll(" ","").split(","),
        trainingLevel: form.trainingLevel.value,
        owner: {
            name: form.ownerName.value,
            email: form.ownerEmail.value,
            phone: form.ownerPhone.value,
        },
        topspeed: Number(form.topspeed.value),
    };
    await addHorse(musician, endpoint);
    form.parentElement.close();
    form.reset();
}

/* ========== SUBMIT UPDATE ========== */
export async function submitUpdateForm(event) {
    event.preventDefault();
    const form = event.target;
    const horseID = form.musicianID.value;
    const horse = {
        image: form.image.value,
        name: form.musicianName.value,
        race: form.horseRace.value,
        likes: form.likes.value,
        height: form.height.value,
        gender: form.gender.value,
        hasTapeworm: form.hasTapeworm.checked,
        age: form.age.value,
        color: form.horseColor.value,
        temperament: form.temperament.value,
        riderExperienceRequired: form.riderExperienceRequired.checked,
        registered: form.registered.checked,
        vaccinations: form.vaccinations.value.replaceAll(" ", "").split(","),
        diet: form.diet.value.replaceAll(" ","").split(","),
        trainingLevel: form.trainingLevel.value,
        owner: {
            name: form.ownerName.value,
            email: form.ownerEmail.value,
            phone: form.ownerPhone.value,
        },
        topspeed: Number(form.topspeed.value),
    };
    await updateMusician(musician, musicianID, endpoint);
    form.parentElement.close();
    form.reset();
}

/* ========== SUBMIT DELETE ========== */
export async function deleteMusicianClicked(event) {
    event.preventDefault();
    const deleteForm = document.querySelector("#deleteForm");
    const horseID = deleteForm.querySelector("#delete-musicianID").textContent;

    if (validatePassword(deleteForm["password"].value)) {
        await submitDeleteForm(horseID);
    } else {
        showToastMessage("Wrong password", "error");
    }
}
async function submitDeleteForm(musicianID) {
    const deleteForm = document.querySelector("#deleteForm");
    deleteForm.removeEventListener("submit", deleteMusicianClicked);
    deleteForm.parentElement.close();
    deleteForm.password.value = "";
    await deleteHorse(musicianID, endpoint);
}