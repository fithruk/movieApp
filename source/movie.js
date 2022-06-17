const apiKey = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const popularFilms = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"; 
const topAwaitFilms = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";   
const header = document.querySelector('.header_slider_box');
const sliderBox = document.querySelector('.header_slider_box');
const middleSlider = document.querySelector('.middle_slider_box');
const cover = document.querySelector('.side_cover');
const allFilms = document.querySelectorAll('.title_link');
let request = {};

allFilms.forEach(element => {
    element.addEventListener('click', () => {
        request.req = element.id;
        console.log(request);
        postData (request);
    })
})

let getData = async (url) => {
    const respounce = await fetch(url, {
        headers : {
            "Content-Type" : "application/json",
            "X-API-KEY" : apiKey,
        }
    });

    return await respounce.json();
};

dataHeader.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('slide_item');
    card.innerHTML = `
        <div class="slider_desc">
            <div class="ganre">
                ${item.ganre}
            </div>
            <div class="star_rate">
                <img class="star" src="${item.starSrc}" alt="">
            </div>
            <div class="film_title">
                ${item.filmTitle}
            </div>
            <div class="film_desc">
                ${item.filmDesc}
            </div>
            <div class="slider_button">
                <a class="link" href="#">Watch now</a>
            </div>
        </div>
        <img class="slide_main_img" src="${item.mainImgIsrc}" alt="">
        <div class="cover"></div>
        `
        header.appendChild(card);
});


const cards = document.querySelectorAll('.slide_item');
const time = 5000;
startSlide ();    


getData(popularFilms)
    .then(data => data.films.forEach(({
        filmId,nameEn, nameRu, genres, rating, posterUrlPreview,
    }) => {
        new MovieItem(filmId,nameEn, nameRu, Object.entries(genres[0]).map(genre => genre[1]), rating, posterUrlPreview, ".middle_slider_box").render();
    }
))
.then(() => {
    let step = 0;
    const mdItems = document.querySelectorAll('.md_item');
    const leftArrow = document.getElementById('left');
    const rightArrow = document.getElementById('right');
    const displayed = 5;
    step > 0 ? leftArrow.classList.add('active') : leftArrow.classList.remove('active');
    step >= mdItems.length - displayed  ? rightArrow.classList.remove('active') : rightArrow.classList.add('active');
    checkChanges(".middle_slider_box .md_item");
    leftArrow.addEventListener('click', () => {
        step = step - 1;
        slider (leftArrow, rightArrow, mdItems, step, displayed);
        
    });
    rightArrow.addEventListener('click', () => {
        step = step + 1;
        slider (leftArrow, rightArrow, mdItems, step, displayed);
        
    });
    
})
.catch(() => {
    throw new Error(alert = 'что то пошло не так')
});

getData(topAwaitFilms)
.then(data => {data.films.forEach(({
    filmId,nameEn, nameRu, genres, rating, posterUrlPreview, parent
}) => {
    new MovieItem(filmId,nameEn, nameRu, Object.entries(genres[0]).map(genre => genre[1]), rating, posterUrlPreview, ".low_slider_box").render();
})})
.then(() => {
    let step = 0;
    const lowMdItems = document.querySelectorAll('.low_slider_box .md_item');
    const lowleftArrow = document.getElementById('low_left');
    const lowrightArrow = document.getElementById('low_right');
    const displayed = 3;
    checkChanges(".low_slider_box .md_item");

    step > 0 ? lowleftArrow.classList.add('active') : lowleftArrow.classList.remove('active');
    step >= lowMdItems.length - displayed  ? lowrightArrow.classList.remove('active') : lowrightArrow.classList.add('active');

    lowleftArrow.addEventListener('click', () =>{
        step = step - 1;
        slider (lowleftArrow, lowrightArrow, lowMdItems, step, displayed);
    });

    lowrightArrow.addEventListener('click', () => {
        step = step + 1;
        slider (lowleftArrow, lowrightArrow, lowMdItems, step, displayed);
    });
})

function startSlide () {
    i = 1;
    if ( i < cards.length){
        setInterval(changeCard, time);
    } 

    function changeCard () {
        for ( let card of cards){
            card.style.transform = `translateX(${- 100 * i}%)`;
        }
        i++
        if ( i >= cards.length){
            sliderBox.classList.remove("reload");
            setTimeout(()=>{
                sliderBox.classList.add("reload");
            }, time);
            i = 0;
        }
    }
}


function slider (left, right, collection, step, displayed) {
    for ( let mdItem of collection){
        mdItem.style.transform = `translateX(${ -100 * step}%)`;
    }
    step > 1 ? left.classList.add('active') : left.classList.remove('active');
    step >= collection.length - displayed ? right.classList.remove('active') : right.classList.add('active');
    console.log(step);
}

const postData = (body) => {
    fetch("http://localhost:3000/requests", {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(body)
    })
    .then(data => {
        console.log(data.text());
    })
}

function checkChanges (collection_selector) {
    const movieItems = document.querySelectorAll( collection_selector );
    for ( let miApart of movieItems) {
        let rating = miApart.children[0].children[1].innerHTML;
        let reg = new RegExp(/%/gim);
        let regNull = new RegExp(/null/gim);
        ratingMod = rating.replace(reg, " ");
        ratingVoiceLess = rating.replace(regNull, "Недостаточно голосов 🤷‍♂️");
        miApart.children[0].children[1].innerHTML = ratingMod;
        miApart.children[0].children[1].innerHTML = ratingVoiceLess;
        if ( ratingMod > 10 ) {
            ratingRounded = (Math.floor(ratingMod)) / 10;
            miApart.children[0].children[1].innerHTML = ratingRounded;
        };
        
    }
}