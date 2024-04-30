import { generateMovieItems } from "./movie.js"; //1. 영화 데이터를 가져와서 화면에 나타내기 //movie.js
import { handleSearch } from "./search.js"; //2. 영화 검색 //search.js

generateMovieItems();

const searchInput = document.querySelector("#search-input");
searchInput.focus(); //

// form에 전송될때마다 이벤트 핸들러를 발동 시킴
const form = document.querySelector("#search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(searchInput.value);
});
