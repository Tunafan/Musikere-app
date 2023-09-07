import {endpoint, getOneMusician} from "./app.js";

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

//Clears all fields in the detail dialog
function clearDetailDialog() {
    const detailDialog = document.querySelector("#detail-dialog");
    detailDialog.close();

    /* Image */
    detailDialog.querySelector("#detail-image")
        .innerHTML = "";

    /* Name and Likes */
    detailDialog.querySelector("#detail-name")
        .textContent = "";

    /* General Information */
    detailDialog.querySelector("#detail-generalInformation")
        .textContent = "";
}