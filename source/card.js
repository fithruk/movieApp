const bodySliderBox = document.querySelector('.body_slider_box');
const genresUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/filters";
const apiKey = "8c8e1a50-6322-4135-8875-5d40a5420d86";

const getData = async (url) => {
    const respounce = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
        }
    })
    return await respounce.json();
};

headerSlider ();

function headerSlider () {
    const filtersButton = document.querySelector('.show_more_button');
    const filters = document.querySelector('.filtres');
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
    filtersButton.addEventListener('click', () => {
        filtersButton.classList.toggle('active');
        filters.classList.toggle('active');
    });
    function showSlide(n) {
        setTimeout(()=> {
            bodySliderBox.children[n].style.annimationName = "fade";
            bodySliderBox.children[n].style.annimationDuration = 1;
        },50)
        bodySliderBox.children[n].style.display = "block";
    }
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
        throw new Error("Не судьба");
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
                console.log(data);
            })
        } else {
            getData(`https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${selectGenre.value}&order=RATING&type=${selectType.value}&ratingFrom=${selectRating.value}&ratingTo=10&yearFrom=${selectYear.value}&yearTo=3010&page=1`)
            .then(data => {
                console.log(data);
            })
        }
    })

}

