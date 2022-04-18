//resp - respounse - ответ
const  apiKey = " 8c8e1a50-6322-4135-8875-5d40a5420d86";
const apiUrlpopular = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";

const apiUrlSearch = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
let currentURL = apiUrlpopular;

getMovies(apiUrlpopular);

async function getMovies(url){
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            'X-API-KEY': apiKey,
        }
    });
    const respData = await resp.json();
    showMovies(respData);
    checkMovie(respData);
    pagination(respData);
    console.log(respData);
}
    

async function getMoviesApart(url){
    const respounse = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            'X-API-KEY': apiKey,
        }
    });
    const filmByname = await respounse.json();
    //checkMovie(filmByname);
    let { films: {
        0: {
            filmId,
            description,
            genres,
            posterUrlPreview,
            rating,
            year,
            nameRu,
        }
    } } = filmByname;
    
    const moviesEl = document.querySelector(".movies");
    moviesEl.innerHTML = `
    <div class="window_box">
    <div class="half_box">
        <div class="img_box">
            <img class="movie_img" src="${posterUrlPreview}" alt="${nameRu}">
        </div>
        <div class="rate"><p class="rate_text">${rating}</p> </div>
    </div>

    <div class="half_box">
        <div class="ganres">
        ${nameRu}
        </div>
        <div class="year">
            ${year}
        </div>
        <div class="description">
            ${description}
        </div>
        <div class="next_info">
        <div class="title_info">
                    Похожие фильмы
                </div>
                <div class="similar_box"></div>
        </div>
    </div>
    
</div>
    `
    rateColor(rating);
    function rateColor(rating){
        let rate = document.querySelector('.rate');
        console.log(rate);
        if ( rating <= 5){
            rate.classList.add("red");
        };
        if (rating > 5){
            rate.classList.add("orange");
        };
        if (rating > 7){
            rate.classList.add("green");
        };
        if (rating === "null"){
            rate.children[0].innerHTML = "2";
            rate.classList.add("red");
        };
    }
    let similarUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
    let film = `${filmId}/similars`
    function urlSimilar(similarUrl, film){
        return adress = `${similarUrl}${film}`;
    }

    urlSimilar(similarUrl,film);
    let getSimilar = async() => {
        const similar = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                'X-API-KEY': apiKey,
            }
        })
        let similarData = await similar.json();
        renderSimilar(similarData)
        console.log(similarData);
    }
    getSimilar(urlSimilar(similarUrl,film));
    function renderSimilar(similarData){
        const similarBox = document.querySelector(".similar_box");
        similarData.films.forEach((item)=>{
            let similarItem = document.createElement('div');
            similarItem.classList.add('similar_item');
            similarItem.innerHTML = `
            <div class="img_box_item">
                            <img class="movie_img" src="${item.posterUrlPreview}" alt="">
                        </div>
                    
                        <div class="name">
                                <p class="name_text">${item.nameRu}</p>
                        </div>
            `
            similarBox.appendChild(similarItem);
        })
    }
}


function checkMovie(filmByname){
    let renderedMovie = document.querySelectorAll('.movie');
    for (let render of renderedMovie){
        render.addEventListener('click', function () {
            console.log(render);
            let request = render.children[1].children[0].innerHTML;
            const searchFor = `${apiUrlSearch}${request}`;
            getMoviesApart(searchFor);
            paginationBox.innerHTML = "";
        
        })
    }

}



function showMovies(respData){
    const moviesEl = document.querySelector(".movies");
    
    moviesEl.innerHTML = "";
    respData.films.forEach(movie => {
        let movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            genre =>`${genre.genre}`)}</div>
        `
        moviesEl.appendChild(movieEl);
    } 
    );
    
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const apiSearchUrl = `${apiUrlSearch}${search.value}`;
    if (search.value){
        getMovies(apiSearchUrl);
    }
    let page = `${search.value}&page=`
    currentURL = makePagination(apiUrlSearch, page);
    
    function makePagination(apiUrlSearch, page){
        let resoultPagination = apiUrlSearch + page;
        return resoultPagination;
    }
    search.value = "";
})




const paginationBox = document.querySelector(".pagination_box");

function pagination(respData) {
    let = { pagesCount, } = respData;
    paginationBox.innerHTML = "";
    for (i = 1; i <= pagesCount; i++) {
        let paginationPage = document.createElement('div');
        paginationPage.classList.add('pagination_page');
        paginationPage.innerHTML = i;
        paginationBox.appendChild(paginationPage);
    }
    dependingPagination(currentURL);
}

function dependingPagination(url) {
    const paginationPages = document.querySelectorAll(".pagination_page");
    for (let paginationPage of paginationPages) {
        paginationPage.addEventListener("click", function () {
            let numOfPaginationPage = +this.innerHTML;
            const numForLink = `${url}${numOfPaginationPage}`;
            getMovies(numForLink);
        })
    }
}