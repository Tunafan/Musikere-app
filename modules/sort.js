import { showMusicians, musicianArr } from "./show.js";

export async function sortMusicians(event) {
    const select = event.target;
    
    function sortBy(a,b) {
        if (select.value === "likes") {
            return b.likes-a.likes;
        } else if (select.value === "name") {
            return a.name.localeCompare(b.name);
        } else if (select.value === "DOB") {
            return a.DOB.localeCompare(b.DOB);
        }
    }
    musicianArr.sort(sortBy)
    showMusicians(musicianArr);
}