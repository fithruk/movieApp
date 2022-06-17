const apiKey = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const popularFilms = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const topAwaitFilms = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const filmById = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const staffById = "https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=";
const nameStaffbyId = "https://kinopoiskapiunofficial.tech/api/v1/staff/";
const searchByName = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const paginationBox = document.querySelector('.pagination_box');
let filmBox = document.querySelector('.film_box');
const cardModal = document.querySelector('.card_wrapper');

const getData = async (url) => {
    const respounce = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
        }
    })
    return await respounce.json();
}

// хедер

const bodySliderBox = document.querySelector('.body_slider_box');
const genresUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/filters";
let mainTitle = document.querySelector('.main_title');

headerSlider ();

function headerSlider () {
    const formHeader = document.querySelector('.form_header');
    const mainSearch = document.getElementById('main_search');
    const filtersButton = document.querySelector('.show_more_button');
    const filters = document.querySelector('.filtres');
    formHeader.addEventListener("submit", (event) => {
        event.preventDefault();
        if (mainSearch.value) {
            getData(`${searchByName}${mainSearch.value}`)
            .then(data => {
                filmBox.innerHTML = "";
                paginationBox.innerHTML = "";
                mainTitle.innerHTML = "Результаты поиска:"
                mainSearch.value = "";
                scrollToElement (filmBox, top);
                showMovies(data);
                createPagination(data);
            })
            .then(() => {
                checkChanges(".film_box .md_item");
            })
        }
    });
    bodyHeader.forEach(slide => {
        const bodySliderCard = document.createElement('div');
        bodySliderCard.classList.add('body_slider_card');
        bodySliderCard.innerHTML = `
        <div class="body_card_description">
            <div class="card_title">
                ${slide.nameRu}
            </div>
            <div class="card_description">
                ${slide.description}
            </div>
            <div class="card_button_box">
                <a class="card_link" href="#">какая-то кнопка</a>
            </div>
            </div>
        <img class="body_card_background" src="${slide.mainImgIsrc}" alt="">
        `
        bodySliderBox.appendChild(bodySliderCard);
    });
    const sliderList = document.querySelector('.slider_list');
    let n = 1;
    sliderList.children[n - 1].style.listStyleType = "disc";
    showSlide(n);
    
    const liNav = document.querySelectorAll('.slider_num');
    const cards = document.querySelectorAll('.body_slider_card');
    for ( let li of liNav ) {
        li.addEventListener('click', () => {
            n = li.innerHTML;
            liNav.forEach(li => {
                li.style.listStyleType = "none";
            })
            sliderList.children[n - 1].style.listStyleType = "disc";
            cards.forEach(card => {
                card.style.display = "none";
            })
            showSlide(n);
        })
    };
    
    createFilters ();
    filtersButton.addEventListener('click', toggleFilters);

    function toggleFilters () {
        filtersButton.classList.toggle('active');
        filters.classList.toggle('active');
    }
    function showSlide(n) {
        setTimeout(()=> {
            bodySliderBox.children[n].style.annimationName = "fade";
            bodySliderBox.children[n].style.annimationDuration = 1;
        },50)
        bodySliderBox.children[n].style.display = "block";
    }

    function createFilters () {
        const selectGenre = document.getElementById('choice_ganre');
        const selectType = document.getElementById('choice_type');
        const selectRating = document.getElementById('choice_rating');
        const selectYear = document.getElementById('choice_year');
        const searchMarc = document.getElementById('filter_search');
        const currentYear = new Date();
        const fullYear = currentYear.getFullYear();
    
        getData(genresUrl)
        .then(genres => {
            genres.genres.forEach(genre => {
                const option = document.createElement('option');
                option.innerHTML = genre.genre;
                option.value = genre.id;
                selectGenre.appendChild(option);
            })
        })
        .catch(() => {
            throw new Error(alert("Не судьба"));
        })
    
        for ( let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.innerHTML = i;
            option.value = i;
            selectRating.appendChild(option);
        }
    
        for ( let i = 1940; i <= fullYear; i++) {
            const option = document.createElement('option');
            option.innerHTML = i;
            option.value = i;
            selectYear.appendChild(option);
        }
        
        const submitButton = document.querySelector('.filters_button');
        submitButton.addEventListener('click', () => {
            if ( searchMarc.value ) {
                getData(`https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${selectGenre.value}&order=RATING&type=${selectType.value}&ratingFrom=${selectRating.value}&ratingTo=10&yearFrom=${selectYear.value}&yearTo=3010&keyword=${searchMarc.value}&page=1`)
                .then(data => {
                    filmBox.innerHTML = "";
                    paginationBox.innerHTML = "";
                    mainTitle.innerHTML = "Результаты поиска:"
                    searchMarc.value = "";
                    scrollToElement (filmBox, top);
                    toggleFilters ();
                    showMovies(modificate (data));
                    createPagination(modificate (data), `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${selectGenre.value}&order=RATING&type=${selectType.value}&ratingFrom=${selectRating.value}&ratingTo=10&yearFrom=${selectYear.value}&yearTo=3010&page=`);
                })
                .then(() => {
                    checkChanges(".film_box .md_item");
                })
            } else {
                getData(`https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${selectGenre.value}&order=RATING&type=${selectType.value}&ratingFrom=${selectRating.value}&ratingTo=10&yearFrom=${selectYear.value}&yearTo=3010&page=1`)
                .then(data => {
                    filmBox.innerHTML = "";
                    paginationBox.innerHTML = "";
                    mainTitle.innerHTML = "Результаты поиска:"
                    scrollToElement (filmBox, top);
                    toggleFilters ();
                    showMovies(modificate (data));
                    createPagination(modificate (data), `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${selectGenre.value}&order=RATING&type=${selectType.value}&ratingFrom=${selectRating.value}&ratingTo=10&yearFrom=${selectYear.value}&yearTo=3010&page=`);
                })
                .then(() => {
                    checkChanges(".film_box .md_item");
                })
            }
        })
    
    }
    
}












// рендер популярных фильмов


// const replaceRequest = () => {
//     fetch("http://localhost:3000/requests/1", {
//         method: "DELETE",
//     })
// }

// const getRequest = async () => {
//     const respounse = await fetch("http://localhost:3000/requests");
//     return await respounse.json();
// }


getData(popularFilms)
        .then(data => {
            showMovies(data);
            createPagination(data, popularFilms);
        })
        .then(() => {
            checkChanges(".film_box .md_item");
        })


function showMovies(data) {
    data.films.forEach(({
        filmId,
        nameEn,
        nameRu,
        genres,
        rating,
        posterUrlPreview,
    }) => {
        new MovieItem(
            filmId,
            nameEn,
            nameRu,
            Object.entries(genres[0]).map(genre => genre[1]),
            rating,
            posterUrlPreview,
            '.film_box').render()
    });
    const allMovies = document.querySelectorAll('.film_box .md_item');
    allMovies.forEach(movie => {
        movie.addEventListener('click', () => {
            getinfoAbout(movie.children[2].innerHTML);
        })
    })
}

function checkChanges(collection_selector) {
    const movieItems = document.querySelectorAll(collection_selector);
    for (let miApart of movieItems) {
        let rating = miApart.children[0].children[1].innerHTML;
        let reg = new RegExp(/%/gim);
        let regNull = new RegExp(/null/gim);
        ratingMod = rating.replace(reg, " ");
        ratingVoiceLess = rating.replace(regNull, "Недостаточно голосов 🤷‍♂️");
        miApart.children[0].children[1].innerHTML = ratingMod;
        miApart.children[0].children[1].innerHTML = ratingVoiceLess;
        if (ratingMod > 10) {
            ratingRounded = (Math.floor(ratingMod)) / 10;
            miApart.children[0].children[1].innerHTML = ratingRounded;
        };

    }
}

function createPagination(data, currentURL) {
    let pageNumber = 0;
    for (i = 1; i <= data.pagesCount; i++) {
        const paginationItem = document.createElement('div');
        paginationItem.classList.add('pagination_item');
        paginationItem.innerHTML = i;
        paginationBox.appendChild(paginationItem);
    }
    const pagItems = document.querySelectorAll('.pagination_item');
    pagItems[0].classList.add('active');
    for (let pagItemApart of pagItems) {
        pagItemApart.addEventListener('click', () => {
            pageNumber = pagItemApart.innerHTML;
            pagItems.forEach(item => {
                item.classList.remove("active");
            });
            pagItemApart.classList.add('active');
            filmBox.innerHTML = "";
            getData(`${currentURL}${pageNumber}`)
                .then(data => {
                    if ( data.items ) {
                        showMovies(modificate (data));
                    } else {
                        showMovies(data);
                    }
                    
                })
                .then(() => {
                    checkChanges(".film_box .md_item");
                })
        })
    }
}

// рендер кинокартчек по клику



function getinfoAbout(filmID) {
    const topFilmsArr = [];
    const directors = [];
    const producers = [];
    const actors = [];
    const operators = [];
    const compositors = [];
    const painters = [];
    const editors = [];
    const writters = [];
    getData(`${staffById}${filmID}`)
        .then(dataStuff => {
            const dataStuffClon = JSON.parse(JSON.stringify(dataStuff));
            dataStuffClon.forEach(stuff => {
                if (stuff.professionKey == "DIRECTOR") {
                    directors.push(stuff);
                }
                if (stuff.professionKey == "PRODUCER") {
                    producers.push(stuff);
                }
                if (stuff.professionKey == "ACTOR") {
                    actors.push(stuff);
                }
                if (stuff.professionKey == "OPERATOR") {
                    operators.push(stuff);
                }
                if (stuff.professionKey == "COMPOSER") {
                    compositors.push(stuff);
                }
                if (stuff.professionKey == "DESIGN") {
                    painters.push(stuff);
                }
                if (stuff.professionKey == "EDITOR") {
                    editors.push(stuff);
                }
                if (stuff.professionKey == "WRITER") {
                    writters.push(stuff);
                }
            })
        })

    getData(`${filmById}${filmID}`)
        .then(dataInfo => {
            const { nameRu,
                nameOriginal,
                posterUrl,
                posterUrlPreview,
                ratingKinopoisk,
                ratingKinopoiskVoteCount,
                year,
                filmLength,
                slogan,
                description,
                countries,
                genres,
            } = dataInfo;


            const cardWrapper = document.querySelector('.card_wrapper');
            cardWrapper.innerHTML = `
            <div class="close_box">
                <span class="layer"></span>
                <span class="layer"></span>
            </div>
            <div class="card_container">
            <div class="img_box">
                <img class="card_main_img" src="${posterUrl}" alt="">
            </div>
            <div class="main_box">
                <div class="card_title">
                    ${nameRu}
                </div>
                <div class="card_originall_title">
                    ${nameOriginal}
                </div>
                <div class="card_title_about">
                    О фильме
                </div>
                <div class="main_stuff_box">
                    <div class="grid_item">Год производства</div>
                    <div class="grid_item">${year}</div>
                    <div class="grid_item">Страна</div>
                    <div class="grid_item">${countries.map(country => `${country.country}`)}</div>
                    <div class="grid_item">Жанр</div>
                    <div class="grid_item">${genres.map(genre => `${genre.genre}`)}</div>
                    <div class="grid_item">Слоган</div>
                    <div class="grid_item">${slogan}</div>
                    <div class="grid_item">Режиссер</div>
                    <div class="grid_item">${directors.map(director => `${director.nameRu}`)}</div>
                    <div class="grid_item">Сценарий</div>
                    <div class="grid_item">${writters.map(writter => `${writter.nameRu}`)}</div>
                    <div class="grid_item">Продюсер</div>
                    <div class="grid_item">${producers.map(producer => `${producer.nameRu}`)}</div>
                    <div class="grid_item">Оператор</div>
                    <div class="grid_item">${operators.map(operator => `${operator.nameRu}`)}</div>
                    <div class="grid_item">Композитор</div>
                    <div class="grid_item">${compositors.map(compositor => `${compositor.nameRu}`)}</div>
                    <div class="grid_item">Художник</div>
                    <div class="grid_item">${painters.map(painter => `${painter.nameRu}`)}</div>
                    <div class="grid_item">Монтаж</div>
                    <div class="grid_item">${editors.map(editor => `${editor.nameRu}`)}</div>
                    <div class="grid_item">Продолжительность</div>
                    <div class="grid_item">${filmLength} мин</div>
                </div>
            </div>
            <div class="cast_box">
                <div class="rounded_rate">
                    ${ratingKinopoisk}
                </div>
                <div class="votes_number">
                    ${ratingKinopoiskVoteCount} оценок
                </div>
                <div class="main_actors">
                    <ul class="main_list"> В главных ролях
                        
                    </ul>
                </div>
                <div class="main_actors">
                    Всего ${actors.length} актеров
                </div>
            </div>
        </div>
        <div class="film_description">
            ${description}
        </div>
        <div class="stuff_box_slider">
            <div class="arrows_box">
                <img class="arrow" id="stuff_left" src="img/Chevron-Left.png" alt="">
                <img class="arrow" id="stuff_right" src="img/Chevron-Right.png" alt="">
            </div>
        </div>    
       `

        })
        .then(() => {
            const actorsList = document.querySelector('.main_list');
            actors.forEach(actor => {
                let mainActor = document.createElement('li');
                mainActor.classList.add('main_list_item');
                mainActor.innerHTML = `${actor.nameRu}`
                actorsList.append(mainActor);
            })
        })
        .then(() => {
            const stuffSliderBox = document.querySelector('.stuff_box_slider');
            const left = document.getElementById('stuff_left');
            const right = document.getElementById('stuff_right');
            actors.forEach(cardActor => {
                const slide_item = document.createElement('div');
                slide_item.classList.add('slider_card');
                slide_item.innerHTML = `
                <div class="about_stuff"></div>
                <div class="actor_id">${cardActor.staffId}</div>
                <img class="sl_card_img" src="${cardActor.posterUrl}" alt="">
                `
                stuffSliderBox.appendChild(slide_item);
            })
            const items = document.querySelectorAll('.slider_card');
            items.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    let stuffId = item.children[1].innerHTML;
                    getData(`${nameStaffbyId}${stuffId}`)
                        .then(({
                            posterUrl,
                            profession,
                            films,
                            personId,
                            nameEn,
                            nameRu,
                            sex,
                            birthday, }) => {
                            const hoverCard = item.children[0];

                            function topFilms(films) {
                                if (topFilmsArr.length === 0) {
                                    films.forEach(film => {
                                        if (film.rating > 8) {
                                            topFilmsArr.push(film);
                                        }
                                    })
                                }
                            }

                            topFilms(films);
                            //hoverCard.classList.add('about_stuff');
                            hoverCard.innerHTML = `
                                        
                                        <div class="name">
                                            ${nameRu}
                                        </div>
                                        <div class="original_name">
                                            ${nameEn}
                                        </div>
                                        <div class="title_sl_card">
                                            О персоне
                                        </div>
                                        <div class="proffession">
                                            Карьера: <span class="info_string">${profession}</span>
                                        </div>
                                        <div class="birthday">
                                           Дата рождения: ${birthday} (${countAge(birthday)})
                                        </div>
                                        <div class="best_films">Топ лучших картин:
                                            <ul class="best_films_list">
                                                
                                            </ul>
                                        </div>
                                    
                                    `
                            function countAge(birthday) {
                                let birth = new Date(birthday);
                                let realTime = new Date();
                                let currentAge = realTime.getFullYear(Date.parse(realTime)) - birth.getFullYear(Date.parse(birth));
                                return currentAge
                            }
                            item.appendChild(hoverCard)
                            
                            topFilmsArr.forEach(film => {

                                const bestFilms = item.children[2].children[5];
                                const liName = document.createElement('li');
                                liName.classList.add('best_films_item');
                                liName.innerHTML = `${film.nameRu}`;
                                bestFilms.appendChild(liName);
                            })

                        })
                })
                item.addEventListener('mouseleave', () => {
                    topFilmsArr.length = 0;
                    const hoverCard = item.children[0];
                    const bestFilmsList = item.children[2].children[5];
                    //bestFilmsList.innerHTML = "";
                    hoverCard.innerHTML = "";

                })
            })

            const collection = document.querySelectorAll('.slider_card');
            let step = 0;

            left.addEventListener('click', () => {
                step = step - 1;
                slider(left, right, collection, step, 5);
            })

            right.addEventListener('click', () => {
                step = step + 1;
                slider(left, right, collection, step, 5);
            })

        })
        .then(() => {
            toggleClass();
            const closeCard = document.querySelector('.close_box');
            closeCard.addEventListener('click', () => {
                setTimeout(toggleClass, 50);
                cardModal.innerHTML = "";
            });
        })
}

function toggleClass() {
    const scrollPos = window.scrollY;
    const block = document.querySelector('.cover_block');
    cardModal.style.top = scrollPos + 15 + "px";
    cardModal.classList.toggle('active');
    block.classList.toggle('blocked');
}

function slider(left, right, collection, step, displayed) {
    // step > 1 ? left.classList.add('active') : left.classList.remove('active');
    // step >= collection.length - displayed ? right.classList.remove('active') : right.classList.add('active');
    if (step < 0) {
        step = 1
    } else if (step > collection.length) {
        step = 1
    }
    for (let mdItem of collection) {
        mdItem.style.transform = `translateX(${-100 * step}%)`;
    }
    console.log(step);
}


function modificate (data) {
    let dataMod = JSON.parse(JSON.stringify(data));
    dataMod.films = dataMod.items;
    dataMod.pagesCount = dataMod.totalPages;
    dataMod.films.map(film => `${ film.filmId = film.kinopoiskId}`);
    dataMod.films.map(film => `${ film.rating = film.ratingImdb}`);
    dataMod.films.forEach(film => { film.nameRu === null ? film.nameRu = film.nameOriginal : film.nameRu = film.nameRu});
    return dataMod
}

function scrollToElement (selector, top) {
    selector.scrollIntoView({
        behavior: "smooth",
        block: "end",
    })
}