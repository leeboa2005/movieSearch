export const generateMovieItems = async () => {
  const movies = await fetchMovieData();

  const movieList = document.querySelector("#movie-list");
  movieList.innerHTML = movies
    .map(
      (movie) => `
      <li class="movie-item" id=${movie.id}>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3 class="movie-title">${movie.title}</h3>
          <p>${movie.overview}</p>
          <p>Rating: ${movie.vote_average}</p>
      </li>
      `
    )
    .join(""); // 리스트들이 순회를 할때마다 재할당 되어 join("") 으로 합쳐짐

  movieList.addEventListener("click", handleClickItem);
  // 이벤트 위임: 하위요소에서 발생한 이벤트를 상위요소에서 처리하도록 해줌
  function handleClickItem(event) {
    console.log("event.target:", event.target);
    console.log("event.currentTarget:", event.currentTarget);
    // 카드 외 영역 클릭 시 무시
    if (event.target === movieList) return;

    if (event.target.matches(".move-item")) {
      alert(`영화 id: ${event.target.id}`);
    } else {
      // 카드의 자식 태그 (figure, div, p) 클릭 시 부모의 id로 접근
      alert(`영화 id: ${event.target.parentNode.id}`);
    }
  }
};

async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mzc3N2U5ZWNlNDkzZDQwYjUyNmI2ZWFhMmE4MGJhZCIsInN1YiI6IjY2MmNjZmZjMDNiZjg0MDEyNWVhNGYxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HJb3vcITnB5Sk6KWVrBdBzlQNZ0gF_POid8n56JyJgU",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  ); // await 기다린다음에 차례대로 실행될 수 있도록 해줌
  const data = await response.json();
  return data.results;
}
