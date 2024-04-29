
const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mzc3N2U5ZWNlNDkzZDQwYjUyNmI2ZWFhMmE4MGJhZCIsInN1YiI6IjY2MmNjZmZjMDNiZjg0MDEyNWVhNGYxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HJb3vcITnB5Sk6KWVrBdBzlQNZ0gF_POid8n56JyJgU'
  }
};

fetch(url, options)
  .then(response => response.json())
  .then(data => { 

    // 1. 영화 데이터들을 화면에 출력시키기 
    let rows = data['results'];

    const movieList = document.querySelector('.movie-list');
    movieList.innerHTML = '';

    rows.forEach((e) => {
      let title = e['title'];
      let overview = e['overview'];
      let poster_path = e['poster_path'];
      let vote_average = e['vote_average'];
      let id = e['id'];

      let temp_html = `
            <li class="movie-item" data-id="${id}">
              <figure class="movie-image-box">
                  <img class="movie-image" src="https://image.tmdb.org/t/p/w500${poster_path}"
                      alt="">
                  <figcaption class="movie-image-title">${title}</figcaption>
              </figure>
              <div class="movie-text">
              <p>${overview}</p><br />
              <p>Rating: ${vote_average}</p>
              </div>
          </li>
          `;
      movieList.insertAdjacentHTML('beforeend', temp_html);

    });


    // 2. 입력값에 따라서 타이틀과 내용 포함 여부 확인하기 
    const showList = (val = '') => {
      movieList.innerHTML = '';

      rows.forEach((e) => {
        let title = e['title'];
        let overview = e['overview'];
        let poster_path = e['poster_path'];
        let vote_average = e['vote_average'];
        let id = e['id'];

        let titleLower = title.toLowerCase();
        let overviewLower = overview.toLowerCase();

        if (titleLower.includes(val) || overviewLower.includes(val)) {
          let temp_html = `
              <li class="movie-item" data-id="${id}">
                <figure class="movie-image-box">
                    <img class="movie-image" src="https://image.tmdb.org/t/p/w500${poster_path}"
                        alt="">
                    <figcaption class="movie-image-title">${title}</figcaption>
                </figure>
                <div class="movie-text">
                <p>${overview}</p><br />
                <p>Rating: ${vote_average}</p>
                </div>
            </li>
            `;
          movieList.insertAdjacentHTML('beforeend', temp_html);
        }

      })
    }

    showList();

    // 3. 검색어를 입력하고 버튼을 클릭하였을때  이벤트 발생시키기
    const SearchInput = document.getElementById('search-input');
    const SearchBtn = document.getElementById('search-btn');
    SearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = SearchInput.value.toLowerCase();
      showList(val);
    })

    // 4. 영화 카드리스트 선택 했을때 이벤트 발생시키기 
    const movieItems = document.querySelectorAll('.movie-item')
    movieItems.forEach(item => {
      item.addEventListener('click', movieClick);
    });

    function movieClick() {
      let movieId = this.getAttribute('data-id')
      alert(`영화 id: ${movieId}`);
    }

  })







