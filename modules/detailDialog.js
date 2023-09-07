import {endpoint, getOneMusician} from "./app.js";
import {addLike, removeLike} from "./like.js";

/* ========== DETAIL DIALOG ========== */
export async function showDetailDialog(musician) {
    const musicianID = musician["id"];
    console.log(musicianID);
    const musicianObj = await getOneMusician(musicianID, endpoint);
    const detailDialog = document.querySelector("#detail-dialog");

    detailDialog.querySelector("#detail-musicianID").textContent = musicianID;
    detailDialog.querySelector("#detail-image").innerHTML = /*html*/ `<img src="${musicianObj["image"]}" alt="">`;
    generateGeneralInfo(musicianObj, detailDialog);

    /* Event listeners */
    addDetailDialogEventListeners(detailDialog, musicianObj);

    /* Show dialog */
    detailDialog.showModal();
}
/* ========== DETAIL DIALOG HELPER FUNCTIONS ========== */
// Detail information generation
function generateHealthAndDietInfo(musicianObj, detailDialog) {
    const dietArr = (musicianObj["diet"].length)? musicianObj["diet"] : [];
    if(dietArr.length){
        for (const food of dietArr) {
            detailDialog
                .querySelector("#detail-diet")
                .insertAdjacentHTML("beforeend", /*html*/ `<li>${food}</li>`);
        }
    }
    const vaccinationsArr = (horseObj["vaccinations"].length)? musicianObj["vaccinations"] : [];
    if(vaccinationsArr.length){
        for (const vaccination of vaccinationsArr) {
            detailDialog
                .querySelector("#detail-vaccinations")
                .insertAdjacentHTML("beforeend", /*html*/ `<li>${vaccination}</li>`);
        }
    }
    detailDialog.querySelector("#detail-hasTapeworm")
        .textContent = horseObj["hasTapeworm"] ? "Has tapeworm.." : "Tapeworm free!";
}
function generateNameAndLikesInfo(detailDialog, horseObj) {
    detailDialog.querySelector("#detail-name").textContent = horseObj["name"];
    let likesText;
    if (horseObj["likes"] > 0) {
        likesText = horseObj["likes"] + " likes.";
    } else if (horseObj["likes"] < 0) {
        likesText = Math.abs(horseObj["likes"]) + " dislikes.";
    } else {
        likesText = "No likes/dislikes.";
    }
    detailDialog.querySelector("#detail-likes").textContent = likesText;
}
function generateGeneralInfo(horseObj, detailDialog) {
    const isMale = horseObj["gender"] === "male";
    const temperament = horseObj["temperament"].toLowerCase();
    const color = horseObj["color"].toLowerCase()||"";
    const race = horseObj["race"].toLowerCase();
    const gender = isMale ? "stallion" : "mare";
    const pronoun = isMale ? "He" : "She";
    const heightDescription = (horseObj["height"])?`is ${horseObj["height"]} hands tall.`:"";
    const topspeedDescription = (horseObj["topspeed"])?`Can run a ${horseObj["topspeed"] >= 40 ? "blistering" : "modest"} ${horseObj["topspeed"]}mph.`:"";
    detailDialog.querySelector("#detail-generalInformation")
        .textContent = `
        ${horseObj["name"]} is a ${horseObj["age"]} year-old, very ${temperament} 
        ${color} ${race} ${gender}.
        ${pronoun} ${heightDescription} ${topspeedDescription}
        `;
}
function generateExperienceAndRegistrationInfo(detailDialog, horseObj) {
    detailDialog.querySelector(
        "#detail-trainingLevel"
    ).textContent = `Level of training: ${horseObj["trainingLevel"]}.`;
    detailDialog.querySelector("#detail-riderExperienceRequired")
        .textContent = horseObj["riderExperienceRequired"]
            ? "Rider experience is required."
            : "Beginner friendly.";
    detailDialog.querySelector("#detail-registered")
        .textContent = horseObj["registered"]
            ? "Registered."
            : "Unregistered.";
}
function generateOwnerInfo(horseObj, detailDialog) {
    const owner = horseObj["owner"];
    for (const key in owner) {
        detailDialog
            .querySelector("#detail-owner")
            .insertAdjacentHTML(
                "beforeend",
                /*html*/ `<li>${key}: ${owner[key]}</li>`
            );
    }
}
/* event listeners for detail dialog */
function addDetailDialogEventListeners(detailDialog, horseObj) {
    /* Event listeners for like/dislike buttons */
    const likeButton = detailDialog.querySelector("#detail-like-btn");
    const dislikeButton = detailDialog.querySelector("#detail-dislike-btn");
    async function like(event) {
        await addLike(event, likeButton, dislikeButton, horseObj);
    }
    async function dislike(event) {
        await removeLike(event, likeButton, dislikeButton, horseObj);
    }
    likeButton.addEventListener("click", like);
    dislikeButton.addEventListener("click", dislike);

    /* event listeners for closing dialog */
    function clearWithEscape(event) {
        if (event.key === "Escape") {
            window.removeEventListener("keydown", clearWithEscape);
            likeButton.removeEventListener("click", like);
            dislikeButton.removeEventListener("click", dislike);
            clearDetailDialog();
        }
    }
    function clearWithButton() {
        detailDialog.querySelector("#detail-cancel-btn").removeEventListener("click", clearWithButton);
        likeButton.removeEventListener("click", like);
        dislikeButton.removeEventListener("click", dislike);
        clearDetailDialog()
    }
    //cancel button
    detailDialog.querySelector("#detail-cancel-btn").addEventListener("click", clearWithButton);
    //Keyboard Escape button
    window.addEventListener("keydown", clearWithEscape);
}
//Clears all fields in the detail dialog
function clearDetailDialog() {
    const detailDialog = document.querySelector("#detail-dialog");
    detailDialog.close();
    detailDialog.querySelector("#detail-like-btn").disabled = false;
    detailDialog.querySelector("#detail-dislike-btn").disabled = false;

    /* Image */
    detailDialog.querySelector("#detail-image")
        .innerHTML = "";

    /* Health And Diet info */
    detailDialog.querySelector("#detail-diet")
        .innerHTML = "";
    detailDialog.querySelector("#detail-vaccinations")
        .innerHTML = "";
    detailDialog.querySelector("#detail-hasTapeworm")
        .textContent = "";

    /* Name and Likes */
    detailDialog.querySelector("#detail-name")
        .textContent = "";
    detailDialog.querySelector("#detail-likes")
        .textContent = "";

    /* General Information */
    detailDialog.querySelector("#detail-generalInformation")
        .textContent = "";

    /* Experience and Registration information */
    detailDialog.querySelector("#detail-trainingLevel")
        .textContent = "";
    detailDialog.querySelector("#detail-riderExperienceRequired")
        .textContent = "";
    detailDialog.querySelector("#detail-registered")
        .textContent = "";

    /* Owner information */
    detailDialog.querySelector("#detail-owner")
        .innerHTML = "";
}