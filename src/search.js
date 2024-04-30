export const handleSearch = (searchKeyword) => {
  const movieItems = document.querySelectorAll(".movie-item");

  movieItems.forEach((item) => {
    const title = item.querySelector(".movie-title").textContent.toLowerCase();
    const searchedValue = searchKeyword.toLowerCase();

    if (title.includes(searchedValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};
