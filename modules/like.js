import { endpoint, getOneMusician } from "./app.js";
import { showToastMessage } from "./toastMessage.js";

export async function addLike(event, likeButton, dislikeButton, musicianObj) {
    event.stopPropagation();
    const musicianID = musicianObj["id"];
    const musician = await getOneMusician(musicianID, endpoint);
    const likesAmount = Number(musician["likes"]) + 1;
    likeButton.disabled = !dislikeButton.disabled;
    dislikeButton.disabled = false;
    await updateLikes(likesAmount, musicianID, endpoint, likeButton, "like");
}

export async function removeLike(event, likeButton, dislikeButton, musicianObj) {
    event.stopPropagation();
    const musicianID = musicianObj["id"];
    const musician = await getOneMusician(musicianID, endpoint);
    const likesAmount = Number(musician["likes"]) - 1;
    dislikeButton.disabled = !likeButton.disabled;
    likeButton.disabled = false;
    await updateLikes(likesAmount, musicianID, endpoint, likeButton, "dislike");
}

/* ========== HTTP PATCH ========== */
//sends patch request with the updated amount of likes
async function updateLikes(likesAmount, musicianID, endpoint, button, likeType) {
    // location is "detailDialog" or "musicianGrid"
    const response = await fetch(`${endpoint}/musicians${musicianID}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            likes: likesAmount,
        }),
    });
    if (response.ok) {
        if(likeType === "like") showToastMessage("musician liked", "success");
        else showToastMessage("musician disliked", "success");
        console.log("musician like added successfully");
        await displayUpdatedLikes(button, musicianID);
    } else {
        if(likeType === "like") showToastMessage("musician like failed", "error");
        else showToastMessage("musician dislike failed", "error");
        console.log("Bad response at updateLikes");
    }
}
async function displayUpdatedLikes(button, musicianID){
    const musicianObj = await getOneMusician(musicianID, endpoint);
    if(button.classList.contains("detailDialog")){
        let likesText;
        if (musicianObj["likes"] > 0) {
            likesText = musicianObj["likes"] + " likes.";
        } else if (musicianObj["likes"] < 0) {
            likesText = Math.abs(musicianObj["likes"]) + " dislikes.";
        } else {
            likesText = "No likes/dislikes.";
        }
        document.querySelector("#detail-likes").textContent = likesText;
    }
    else{
        button.querySelector(".likes").textContent = musicianObj["likes"];
    }
}