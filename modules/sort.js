import { showMusicians, musicianArr } from "./show.js";

export async function sortMusicians(event) {
    const select = event.target;
    
    function sortBy(a,b) {
        if (select.value === "likes") {
            return b.likes-a.likes;
        } else if (select.value === "fullName") {
            return a.fullName.localeCompare(b.fullName);
        } else if (select.value === "dateOfBirth") {
            return a.dateOfBirth.localeCompare(b.dateOfBirth);
        }
    }
    musicianArr.sort(sortBy)
    showMusicians(musicianArr);
}