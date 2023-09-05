import { musicianArr, showMusicians } from "./show.js";
/* ========== SEARCH BY NAME/RACE/COLOR ========== */
export function inputSearchChanged(event) {
    const searchValue = event.target.value;
    const filteredMusicians = searchMusicians(searchValue);
    showMusicians(filteredMusicians);
}
function searchMusicians(searchValue) {
    return musicianArr.filter(
        (musician) =>
            (musician["name"].toLowerCase().includes(searchValue.toLowerCase())
                || musician["race"].toLowerCase().includes(searchValue.toLowerCase())
                || musician["color"].toLowerCase().includes(searchValue.toLowerCase()))
    );
}